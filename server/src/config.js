import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
