import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import documentsRouter from "./routes/documents.js";
import chatbotRouter from "./routes/chatbot.js";
import "./scripts/convert-pdfs.js"; // Convierte PDFs al arrancar

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/documents", documentsRouter);
app.use("/api/copilotkit", chatbotRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});