function validateTweetsRequestFormat(user, body) {
  const isObject = typeof body === "object";
  const hasOnlyOneProperty = Object.keys(body).length === 1;
  const isFormattedCorrectly = typeof user === "string" && typeof body.tweet === "string";
  return isObject && hasOnlyOneProperty && isFormattedCorrectly;
}

export default validateTweetsRequestFormat;
