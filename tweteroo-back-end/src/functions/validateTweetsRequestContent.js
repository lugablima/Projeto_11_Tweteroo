function validateTweetsRequestContent(res) {
  const isNotEmpty = res.username !== "" && res.tweet !== "";
  const hasNoSpace = !res.username.includes(" ");
  return isNotEmpty && hasNoSpace;
}

export default validateTweetsRequestContent;
