import { useContext, useEffect, useState } from "react";
import Comments from "./comments";
import { PostContext } from "../Posts/post";

export default function CreateComment() {
  const { id } = useContext(PostContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllComments();
  });

  function onSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:4001/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    }).then(() => getAllComments());
  }

  function getAllComments() {
    fetch(`http://localhost:4001/posts/${id}/comments`)
      .then((data) => data.json())
      .then((data) => setComments(data));
  }

  return (
    <>
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="input-value">
          <input
            type="text"
            className="form-control col-md-5"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></input>
          <button type="submit" className="btn btn-info">
            comment{" "}
          </button>
        </div>
      </form>
      <br />
      <Comments comments={comments} />
    </>
  );
}
