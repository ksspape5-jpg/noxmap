import { Router } from "express";
import { GEMINI_API_KEY } from "../config.js";
import { GeminiError, generateReply } from "../services/gemini.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Clé API non configurée côté serveur" });
    }
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages requis" });
    }

    const text = await generateReply(messages);
    res.json({ text });
  } catch (error) {
    if (error instanceof GeminiError) {
      return res.status(error.status).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
