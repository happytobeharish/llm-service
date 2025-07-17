const axios = require("axios");

async function testModel(model) {
  const res = await axios.post(`http://localhost:3000/generate?model=${model}`, {
    prompt: "Tell me a joke."
  });
  console.log(`[${model}]`, res.data);
}

async function runTests() {
  await testModel("gptj");
  await testModel("mistral");
  await testModel("gptj");
  await testModel("mistral");
}

runTests();
