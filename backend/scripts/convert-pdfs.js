import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

// Obtener el path real del script actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas correctas RELATIVAS a backend/
const pdfDir = path.join(__dirname, "../documents/pdfs");
const mdDir = path.join(__dirname, "../documents/markdown");

// Crear carpetas si no existen
if (!fs.existsSync(pdfDir)) {
  console.error("❌ No se encontró el directorio de PDFs:", pdfDir);
  fs.mkdirSync(pdfDir, { recursive: true });
  console.log("📁 Carpeta creada. Por favor, agrega archivos PDF y reinicia.");
  process.exit(1); // termina para evitar error
}

if (!fs.existsSync(mdDir)) {
  fs.mkdirSync(mdDir, { recursive: true });
}

fs.readdirSync(pdfDir).forEach(file => {
  if (file.endsWith(".pdf")) {
    const base = file.replace(/\.pdf$/i, "");
    const input = path.join(pdfDir, file);
    const output = path.join(mdDir, `${base}.md`);

    const needConvert = !fs.existsSync(output) || fs.statSync(input).mtime > fs.statSync(output).mtime;

    if (needConvert) {
      try {
        execSync(`markitdown "${input}" -o "${output}"`);
        console.log(`✅ Convertido: ${file}`);
      } catch (e) {
        console.error(`❌ Error: ${file}`, e.message);
      }
    } else {
      console.log(`⏭️  Ya actualizado: ${file}`);
    }
  }
});
