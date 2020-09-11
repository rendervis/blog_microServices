const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "POST_CREATED": {
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    }
    case "COMMENT_CREATED": {
      const { id, content, postId } = data;
      const post = posts[postId];
      post.comments.push({ id, content });
      break;
    }
    default:
      posts;
  }
  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("Listening to 4002!");
});
