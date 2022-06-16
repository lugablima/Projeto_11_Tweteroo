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

const tweetInfoTemplate = {
  username: "",
  tweet: "",
};

app.listen(5000);
