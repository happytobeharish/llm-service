async function queryGptj(prompt) {
  const response = `GPT-J says: ${prompt}`;
  const tokenCount = prompt.split(" ").length;
  return { response, tokenCount };
}

module.exports = { queryGptj };
