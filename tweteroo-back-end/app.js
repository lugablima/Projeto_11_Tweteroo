import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

const usersInfos = [];
const tweetInfos = [];

const userInfoTemplate = {
  username: "",
  avatar: "",
};

const tweetInfoTemplate = {
  username: "",
  tweet: "",
};

app.listen(5000);
