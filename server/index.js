import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, ".env"), override: true });

const app = express();
const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

const DEFAULT_ORIGINS = ["http://localhost:8443", "http://localhost:5173", "http://127.0.0.1:8443", "http://127.0.0.1:5173"];
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowlist = ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS : DEFAULT_ORIGINS;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowlist.includes(origin)) return callback(null, true);
      return callback(new Error("Origine non autorisée"));
    },
  }),
);
app.use(express.json({ limit: "256kb" }));

const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000;
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 20;
const rateBuckets = new Map();

function rateLimit(req, res, next) {
  const key = req.ip || req.socket?.remoteAddress || "unknown";
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || now - bucket.start >= RATE_LIMIT_WINDOW_MS) {
    rateBuckets.set(key, { start: now, count: 1 });
    return next();
  }
  bucket.count += 1;
  if (bucket.count > RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((bucket.start + RATE_LIMIT_WINDOW_MS - now) / 1000);
    res.setHeader("Retry-After", String(retryAfter));
    return res.status(429).json({ error: "Trop de requêtes. Réessayez dans un instant." });
  }
  return next();
}

setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of rateBuckets) {
    if (now - bucket.start >= RATE_LIMIT_WINDOW_MS) rateBuckets.delete(key);
  }
}, RATE_LIMIT_WINDOW_MS).unref();

app.use("/api/chat", rateLimit);

function buildPayload(body) {
  const { messages, systemPrompt: bodySystemPrompt } = body || {};

  let systemPrompt = typeof bodySystemPrompt === "string" ? bodySystemPrompt : "";
  let chatMessages = Array.isArray(messages) ? messages : [];
  if (
    !systemPrompt &&
    chatMessages.length > 0 &&
    chatMessages[0].role === "user" &&
    typeof chatMessages[0].content === "string" &&
    chatMessages[0].content.startsWith("Tu es l'assistant")
  ) {
    systemPrompt = chatMessages[0].content;
    chatMessages = chatMessages.slice(1);
  }

  const contents = chatMessages
    .filter((message) => typeof message.content === "string" && message.content.trim())
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));

  const payload = { contents };
  if (systemPrompt) {
    payload.systemInstruction = { parts: [{ text: systemPrompt }] };
  }
  return payload;
}

app.post("/api/chat", async (req, res) => {
  try {
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Clé API non configurée côté serveur" });
    }
    if (!req.body || !Array.isArray(req.body.messages)) {
      return res.status(400).json({ error: "Messages requis" });
    }

    const url = `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(req.body)),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "Erreur Gemini" });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/api/chat/stream", async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Clé API non configurée côté serveur" });
  }
  if (!req.body || !Array.isArray(req.body.messages)) {
    return res.status(400).json({ error: "Messages requis" });
  }

  const controller = new AbortController();
  res.on("close", () => {
    if (!res.writableEnded) controller.abort();
  });

  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  try {
    const url = `${GEMINI_BASE}/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(req.body)),
      signal: controller.signal,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      res.write(`data: ${JSON.stringify({ error: data.error?.message || "Erreur Gemini" })}\n\n`);
      return res.end();
    }

    let buffer = "";
    for await (const chunk of response.body) {
      buffer += chunk.toString("utf8");
      let index;
      while ((index = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, index).trim();
        buffer = buffer.slice(index + 1);
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const parsed = JSON.parse(payload);
          const text = parsed.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
          if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`);
        } catch {
          // ignore malformed chunk
        }
      }
    }
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    if (error?.name !== "AbortError") {
      res.write(`data: ${JSON.stringify({ error: "Erreur serveur" })}\n\n`);
    }
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
