const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.json(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = await randomBytes(4).toString("hex");
  const { comment } = req.body;
  const newComment = { id, comment };
  const commentsAvailable = (await commentsByPostId[req.params.id]) || [];
  commentsByPostId[req.params.id] = [...commentsAvailable, newComment];

  await axios.post("http://localhost:4005", {
    type: "CommentCreated",
    body: {
      ...newComment,
      postId: req.params.id,
    },
  });

  res.status(201).json(commentsByPostId[req.params.id]);
});

app.listen(4001, () => {
  console.log("Comments Service Listening at PORT 4001");
});
