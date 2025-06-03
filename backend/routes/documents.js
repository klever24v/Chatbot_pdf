import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const mdDir = path.resolve("documents/markdown");

router.get("/", (req, res) => {
  const files = fs.readdirSync(mdDir)
    .filter(f => f.endsWith(".md"))
    .map(f => f.replace(".md", ""));
  res.json(files);
});

router.get("/:name", (req, res) => {
  const file = path.join(mdDir, `${req.params.name}.md`);
  if (!fs.existsSync(file)) return res.status(404).json({ error: "No encontrado" });
  const content = fs.readFileSync(file, "utf8");
  res.type("text/markdown").send(content);
});

export default router;