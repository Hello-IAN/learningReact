import Post from "./Post"

/* 인스타 그램 피드마냥 포스트를 받아서 배열 쪼개서 포스트한테 넘김 == 포스트를 컴포넌트를 렌더 */
const Feed = ({ posts }) => {
  return (
	<>
		{posts.map(post => (
			<Post key={post.id} post={post} />
		))}
	</>
  )
}

export default Feed