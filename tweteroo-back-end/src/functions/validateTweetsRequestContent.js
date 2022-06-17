function validateTweetsRequestContent(user, body) {
  const isNotEmpty = user !== "" && body.tweet !== "";
  const hasNoSpace = !user.includes(" ");
  return isNotEmpty && hasNoSpace;
}

export default validateTweetsRequestContent;
