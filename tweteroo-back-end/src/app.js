import express from "express";
import cors from "cors";
import validateRequestSignUp from "./functions/validateRequestSignUp.js";
import validateAvatarURL from "./functions/validateAvatarURL.js";

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
  tweetInfos.push(req.body);
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  let lastTenTweets = tweetInfos.slice(-10);
  lastTenTweets = lastTenTweets.map((tweet) => {
    const { avatar } = usersInfos.find((user) => user.username === tweet.username);
    return { ...tweet, avatar };
  });
  res.send(lastTenTweets);
});

app.listen(5000);
