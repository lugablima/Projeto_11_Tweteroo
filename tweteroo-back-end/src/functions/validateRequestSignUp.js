function validateRequestSignUp(res) {
  const isObject = typeof res === "object";
  const hasOnlyTwoProperties = Object.keys(res).length === 2;
  const isFormattedCorrectly = typeof res.username === "string" && typeof res.avatar === "string";
  return isObject && hasOnlyTwoProperties && isFormattedCorrectly;
}

export default validateRequestSignUp;
