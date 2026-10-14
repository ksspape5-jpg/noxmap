import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Clé API non configurée côté serveur" });
    }
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages requis" });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    let systemPrompt = "";
    let chatMessages = messages;
    if (chatMessages.length > 0 && chatMessages[0].role === "user" && chatMessages[0].content.startsWith("Tu es l'assistant")) {
      systemPrompt = chatMessages[0].content;
      chatMessages = chatMessages.slice(1);
    }

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: systemPrompt + "\n\nContexte:\n" + chatMessages.map(m => (m.role==="assistant"?"Assistant":"Utilisateur")+": "+m.content).join("\n")
          }
        ]
      }
    ];

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents }),
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
