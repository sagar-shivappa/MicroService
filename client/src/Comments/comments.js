export default function Comments({ comments }) {
  return (
    <>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </>
  );
}
