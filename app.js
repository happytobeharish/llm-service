const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { queryGptj } = require("./models/gptj");
const { queryMistral } = require("./models/mistral");

const app = express();
const port = 3000;
const logFile = path.join(__dirname, "logs", "prompt_logs.json");

app.use(bodyParser.json());

// Ensure log file exists
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, JSON.stringify([]));
}

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  const model = req.query.model || "gptj";

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  const startTime = Date.now();

  let response, tokenCount;

  try {
    if (model === "gptj") {
      ({ response, tokenCount } = await queryGptj(prompt));
    } else if (model === "mistral") {
      ({ response, tokenCount } = await queryMistral(prompt));
    } else {
      return res.status(400).json({ error: "Invalid model" });
    }

    const latency = Date.now() - startTime;

    const logEntry = {
      model,
      prompt,
      response,
      tokens: tokenCount,
      latency_ms: latency
    };

    const logs = JSON.parse(fs.readFileSync(logFile, "utf-8"));
    logs.push(logEntry);
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));

    res.json({ response, latency_ms: latency, tokens: tokenCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`LLM service running on http://localhost:${port}`);
});
