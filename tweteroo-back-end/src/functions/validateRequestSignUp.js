function validateRequestSignUp(res) {
  const isObject = typeof res === "object";
  const isFormattedCorrectly = typeof res.username === "string" && typeof res.avatar === "string";
  return isObject && isFormattedCorrectly;
}

export default validateRequestSignUp;
