import { Router } from "express";
import fs from "fs";
import path from "path";
import { CopilotBackend, OpenAIAdapter } from "@copilotkit/backend";

const router = Router();
const mdDir = path.resolve("documents/markdown");

router.post("/chat", async (req, res) => {
  try {
    const copilot = new CopilotBackend();
    const adapter = new OpenAIAdapter({
      model: "gpt-4-turbo",
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 🔍 Extraer mensaje del usuario
    const userMessage = req.body.messages?.at(-1)?.content || "";
    const files = fs.readdirSync(mdDir).filter(f => f.endsWith(".md"));

    // 🔎 Elegir documento más relevante
    const match = files.find(f => userMessage.toLowerCase().includes(f.replace(/\.md$/, "").toLowerCase())) ?? files[0];
    const content = fs.readFileSync(path.join(mdDir, match), "utf8");

    // 📄 Pasar como contexto
    req.body.context = content;

    const response = await copilot.response(req, adapter);
    const text = await response.text();

    res.type("application/json").send(text);
  } catch (err) {
    console.error("❌ Error en /chat:", err);
    res.status(500).send("Error al generar respuesta");
  }
});

export default router;