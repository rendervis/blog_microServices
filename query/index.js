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
  console.log(type);

  switch (type) {
    case "POST_CREATED": {
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    }
    case "COMMENT_CREATED": {
      const { id, content, postId, status } = data;
      const post = posts[postId];
      post.comments.push({ id, content, status });
      break;
    }
    case "COMMENT_UPDATED": {
      const { id, content, postId, status } = data;
      const post = posts[postId];
      const comment = post.comments.find((comment) => {
        return comment.id === id;
      });
      comment.status = status;
      comment.content = content;
      break;
    }
    default:
      return posts;
  }

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening to 4002!");
});
