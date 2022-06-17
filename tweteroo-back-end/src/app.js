import express from "express";
import cors from "cors";
import validateRequestSignUp from "./functions/validateRequestSignUp.js";
import validateAvatarURL from "./functions/validateAvatarURL.js";
import validateTweetsRequestFormat from "./functions/validateTweetsRequestFormat.js";
import validateTweetsRequestContent from "./functions/validateTweetsRequestContent.js";

const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const usersInfos = [];
const tweetInfos = [];

app.post("/sign-up", (req, res) => {
  if (validateRequestSignUp(req.body)) {
    const areValidFields =
      req.body.username !== "" &&
      !req.body.username.includes(" ") &&
      !req.body.avatar.includes(" ") &&
      validateAvatarURL(req.body.avatar);
    if (areValidFields) {
      usersInfos.push(req.body);
      res.status(201).send("OK");
    } else res.status(400).send("Todos os campos são obrigatórios!");
  } else res.sendStatus(400);
});

app.post("/tweets", (req, res) => {
  if (validateTweetsRequestFormat(req.body)) {
    if (validateTweetsRequestContent(req.body)) {
      tweetInfos.push(req.body);
      res.status(201).send("OK");
    } else res.status(400).send("Todos os campos são obrigatórios!");
  } else res.sendStatus(400);
});

// app.get("/tweets", (req, res) => {
//   let lastTenTweets = tweetInfos.slice(-10);
//   lastTenTweets = lastTenTweets.map((tweet) => {
//     const { avatar } = usersInfos.find((user) => user.username === tweet.username);
//     return { ...tweet, avatar };
//   });
//   res.send(lastTenTweets);
// });

app.get("/tweets", (req, res) => {
  const page = Number(req.query.page);
  // console.log(page);
  // console.log(typeof page);
  if (typeof page === "number" && page !== NaN && page >= 1 && page % 1 === 0) {
    const limitMinTweets = page * -10;
    const limitMaxTweets = tweetInfos.length - (page - 1) * 10;
    let lastTenTweets = tweetInfos.slice(limitMinTweets, limitMaxTweets);
    lastTenTweets = lastTenTweets.map((tweet) => {
      const { avatar } = usersInfos.find((user) => user.username === tweet.username);
      return { ...tweet, avatar };
    });
    res.send(lastTenTweets);
  } else res.status(400).send("Informe uma página válida!");
});

app.get("/tweets/:username", (req, res) => {
  const username = req.params.username;
  let tweetsOfTheUser = tweetInfos.filter((tweet) => tweet.username === username);
  tweetsOfTheUser = tweetsOfTheUser.map((tweet) => {
    const { avatar } = usersInfos.find((user) => user.username === tweet.username);
    return { ...tweet, avatar };
  });
  res.send(tweetsOfTheUser);
});

app.listen(5000);
