import express from "express";
import cors from "cors";
import { CORS_ALLOWLIST } from "./config.js";
import rateLimit from "./middleware/rateLimit.js";
import chatRouter from "./routes/chat.js";

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || CORS_ALLOWLIST.includes(origin)) return callback(null, true);
      return callback(new Error("Origine non autorisée"));
    },
  }),
);
app.use(express.json({ limit: "256kb" }));

app.use("/api/chat", rateLimit, chatRouter);

export default app;
