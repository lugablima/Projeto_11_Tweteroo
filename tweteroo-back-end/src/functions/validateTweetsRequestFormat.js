function validateTweetsRequestFormat(user, body) {
  const isObject = typeof body === "object";
  const isFormattedCorrectly = typeof user === "string" && typeof body.tweet === "string";
  return isObject && isFormattedCorrectly;
}

export default validateTweetsRequestFormat;
