function validateTweetsRequestFormat(res) {
  const isObject = typeof res === "object";
  const isFormattedCorrectly = typeof res.username === "string" && typeof res.tweet === "string";
  return isObject && isFormattedCorrectly;
}

export default validateTweetsRequestFormat;
