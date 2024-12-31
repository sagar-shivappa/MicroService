import { createContext } from "react";
import CreateComment from "../Comments/createComment";

export const PostContext = createContext();

export default function Post({ post }) {
  return (
    <>
      <PostContext.Provider value={post}>
        <div className="card">
          <div className="card-title">
            <h3>{post.title}</h3>
          </div>
          <CreateComment />
        </div>
      </PostContext.Provider>
    </>
  );
}
