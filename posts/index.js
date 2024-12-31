const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.use(express.json());
const posts = {};

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const id = await randomBytes(4).toString("hex");
  posts[id] = { id, title: req.body.title };
  await axios.post("htt://localhost:4005/events", {
    type: "PostCreation",
    body: { id, title: req.body.title },
  });
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Post Service Listening at PORT 4000");
});
