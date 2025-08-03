# 🧠 LLM Multi-Model Service (Node.js)

This project is a minimal Node.js service that lets users interact with multiple open-source language models (e.g., GPT-J, Mistral) via a REST API. It includes model routing, latency and token count logging, and a clean architecture for extensibility.
---

## 📦 Features

- 🔁 Multi-model routing (`?model=gptj` or `?model=mistral`)
- 📨 Accepts prompts via HTTP POST
- ⏱️ Logs round-trip latency and estimated token count 
- 💾 Logs saved in `logs/prompt_logs.json`
- 🧪 Simple integration tests
- 🛠️ Clean modular structure with separate model handlers
 
---
 
## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/llm-service.git
cd llm-service

Install dependencies
npm install

Run the Server
npm start

