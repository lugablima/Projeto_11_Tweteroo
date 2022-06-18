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
  const body = req.body;
  if (!validateRequestSignUp(body)) {
    res.sendStatus(400);
    return;
  }
  const areValidFields =
    req.body.username !== "" &&
    !req.body.username.includes(" ") &&
    !req.body.avatar.includes(" ") &&
    validateAvatarURL(body.avatar);
  if (!areValidFields) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  const userExist = usersInfos.some((el) => el.username === body.username);
  if (userExist) {
    res.status(400).send("O usuário informado já existe!");
    return;
  }
  usersInfos.push(body);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const user = req.header("user");
  const body = req.body;
  if (!validateTweetsRequestFormat(user, body)) {
    res.sendStatus(400);
    return;
  }
  if (!validateTweetsRequestContent(user, body)) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  const isValidUser = usersInfos.some((el) => el.username === user);
  if (!isValidUser) {
    res.status(400).send("Usuário inválido!");
    return;
  }

  tweetInfos.unshift({ username: user, tweet: body.tweet });
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const page = Number(req.query.page);
  if (typeof page === "number" && page !== NaN && page >= 1 && page % 1 === 0) {
    const limitMin = page * 10 - 10;
    const limitMax = page * 10;
    let lastTenTweets = tweetInfos.slice(limitMin, limitMax);
    lastTenTweets = lastTenTweets.map((tweet) => {
      const { avatar } = usersInfos.find((user) => user.username === tweet.username);
      return { ...tweet, avatar };
    });
    res.send(lastTenTweets);
  } else res.status(400).send("Informe uma página válida!");
});

app.get("/tweets/:username", (req, res) => {
  const username = req.params.username;
  const isValidUser = usersInfos.some((el) => el.username === username);
  if (!isValidUser) {
    res.status(400).send("Usuário inválido!");
    return;
  }
  let tweetsOfTheUser = tweetInfos.filter((tweet) => tweet.username === username);
  tweetsOfTheUser = tweetsOfTheUser.map((tweet) => {
    const { avatar } = usersInfos.find((user) => user.username === tweet.username);
    return { ...tweet, avatar };
  });
  res.send(tweetsOfTheUser);
});

app.listen(5000);
