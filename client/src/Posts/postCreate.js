import { useState } from "react";
import Posts from "./posts";
import { useEffect } from "react";

export default function PostCreate() {
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);
  async function onSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if required (e.g., Authorization)
      },
      body: JSON.stringify({ title }),
    }).then((data) => {
      getPosts();
    });
  }
  function getPosts() {
    fetch("http://localhost:4000/posts")
      .then((data) => data.json())
      .then((data) => Object.values(data))
      .then((data) => setPosts(data));
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <h3>Create Post</h3>
        <div className="input-value">
          <input
            type="text"
            className="form-control col-md-5"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>
          <button type="submit" className="btn btn-primary">
            Submit{" "}
          </button>
        </div>
      </form>
      <br />
      <Posts posts={posts} />
    </>
  );
}
