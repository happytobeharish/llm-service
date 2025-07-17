async function queryMistral(prompt) {
  const response = `Mistral replies: ${prompt}`;
  const tokenCount = prompt.split(" ").length;
  return { response, tokenCount };
}

module.exports = { queryMistral };
