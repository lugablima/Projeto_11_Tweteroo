import express from "express";
import cors from "cors";

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
  usersInfos.push(req.body);
  res.send("OK");
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
