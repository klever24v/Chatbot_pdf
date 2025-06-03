# Chatbot\_pdf

Chatbot\_pdf es un backend Node.js compatible con [CopilotKit](https://github.com/CopilotKit/CopilotKit), diseñado para procesar manuales en formato PDF, convertirlos automáticamente a Markdown y permitir respuestas inteligentes con IA a partir del contenido del documento más relevante.

Ideal para crear asistentes virtuales sobre documentación técnica, manuales de usuario, etc.

---

## 🚀 Funcionalidades

* Conversión automática de archivos PDF a Markdown al arrancar
* Rutas REST para listar y leer documentos
* Integración con OpenAI vía `@copilotkit/backend`
* Selección automática del documento más relevante según la pregunta del usuario
* Preparado para extenderse con RAG (embeddings, chunking, bases vectoriales, etc.)

---

## 📂 Estructura de directorio

```
chatbot_pdf/
└── backend/
    ├── index.js                   # Servidor Express principal
    ├── .env                       # Configuración sensible (ejemplo incluido)
    ├── package.json
    ├── scripts/
    │   └── convert-pdfs.js       # Script de conversión PDF -> Markdown
    ├── documents/
    │   ├── pdfs/                 # PDFs originales
    │   └── markdown/             # Markdown generados automáticamente
    ├── routes/
    │   ├── documents.js          # Endpoints de consulta de documentos
    │   └── chatbot.js            # Endpoint de IA compatible con CopilotKit
```

---

## 📦 Dependencias utilizadas

| Paquete               | Uso principal                                                                    |
| --------------------- | -------------------------------------------------------------------------------- |
| `express`             | Crear y administrar el servidor web REST                                         |
| `cors`                | Habilitar solicitudes entre frontend/backend                                     |
| `dotenv`              | Cargar variables de entorno desde `.env`                                         |
| `@copilotkit/backend` | SDK oficial para crear endpoints compatibles con CopilotKit                      |
| `openai`              | Cliente oficial para acceder a los modelos de OpenAI (necesario para CopilotKit) |

---

## 🛠 Requisitos previos

* Node.js >= 18
* Tener instalada la herramienta [`markitdown`](https://github.com/uhobnil/markitdown-rs)

### ¿Qué es `cargo`?

Es el gestor de paquetes y compilador para el lenguaje **Rust**. Se utiliza para instalar herramientas escritas en Rust, como `markitdown`.

Instala `markitdown` con:

```bash
cargo install markitdown
```

### ¿Para qué sirve `markitdown`?

Es una herramienta de línea de comandos que convierte archivos `.pdf` en `.md` (Markdown) cuando el texto es extraíble. Es rápida y útil para preprocesar documentación antes de alimentar un modelo de IA.

---

## ⚙️ Configuración

1. Clona el repositorio:

```bash
git clone https://github.com/klever24v/Chatbot_pdf.git
cd Chatbot_pdf/backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura la API Key de OpenAI:

📄 `.env` (ya incluido como plantilla):

```env
OPENAI_API_KEY=tu_clave_aqui
```

⚠️ Reemplaza `tu_clave_aqui` por tu API key válida de OpenAI.

4. Coloca tus archivos `.pdf` en:

```bash
backend/documents/pdfs/
```

---

## ▶️ Ejecutar el servidor

```bash
node backend/index.js
```

* Convierte automáticamente todos los PDFs nuevos a Markdown
* Levanta el servidor en `http://localhost:3001`

---

## 📡 Endpoints disponibles

### `GET /documents`

Retorna una lista de documentos disponibles (sin extensión):

```json
["manual_router_a10", "instrucciones_wifi"]
```

### `GET /documents/:name`

Devuelve el contenido Markdown de un documento específico.

### `POST /api/copilotkit/chat`

Endpoint compatible con CopilotKit. Analiza el mensaje del usuario, busca el documento más relevante y responde usando su contenido como contexto.

---

## 🐞 Problemas comunes

### ❌ Error: `ENOENT no such file or directory ... documents/pdfs`

Solución: asegúrate de que existan las carpetas `documents/pdfs` y `documents/markdown` dentro de `backend/`.

### ⚠️ `markitdown` no convierte bien

Si el PDF está escaneado (imágenes, no texto), considera usar OCR como [Tesseract](https://github.com/tesseract-ocr/tesseract).

---

## ✍️ Autor

**Klever24v**
GitHub: [klever24v](https://github.com/klever24v)

---

¡Listo para usar e integrar con CopilotKit en tu frontend React! 🎯
