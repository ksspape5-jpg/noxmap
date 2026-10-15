import { Router } from "express";
import { GEMINI_API_KEY } from "../config.js";
import { GeminiError, generateReply, streamReply } from "../services/gemini.js";

const router = Router();

function validate(req, res) {
  if (!GEMINI_API_KEY) {
    res.status(500).json({ error: "Clé API non configurée côté serveur" });
    return false;
  }
  if (!req.body || !Array.isArray(req.body.messages)) {
    res.status(400).json({ error: "Messages requis" });
    return false;
  }
  return true;
}

router.post("/", async (req, res) => {
  if (!validate(req, res)) return;
  try {
    const text = await generateReply(req.body);
    res.json({ text });
  } catch (error) {
    if (error instanceof GeminiError) {
      return res.status(error.status).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Réponse en Server-Sent Events : `data: {"text": ...}` puis `data: [DONE]`.
router.post("/stream", async (req, res) => {
  if (!validate(req, res)) return;

  const controller = new AbortController();
  res.on("close", () => {
    if (!res.writableEnded) controller.abort();
  });

  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);
  try {
    for await (const text of streamReply(req.body, controller.signal)) {
      send({ text });
    }
    res.write("data: [DONE]\n\n");
  } catch (error) {
    if (error?.name !== "AbortError") {
      send({ error: error instanceof GeminiError ? error.message : "Erreur serveur" });
    }
  }
  res.end();
});

export default router;
