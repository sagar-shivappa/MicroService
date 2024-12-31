import Post from "./post";
export default function Posts(props) {
  console.log("Posts", props.posts);
  return (
    <>
      <ul>
        {props.posts.map((post) => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </>
  );
}
