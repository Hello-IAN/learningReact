import { Link } from "react-router-dom";

/* 각 포스트페이지로 가는 링크를 걸어줌 */

const Post = ({ post }) => {
  return (
	<article className="post">
		<Link to= {`/post/${post.id}`}>
			<h2>
				{post.title}
			</h2>
			<p className="postDate">{post.datetime}</p>	
		</Link>
		<p className="postBody">{
			(post.body).length <= 25 /* ?를 통해 게시글 25줄 이상이면 미리보기 */
				? post.body /* 25이하면 그냥 바디 전체 */
				: `${(post.body).slice(0, 25)}...`	/* 아니면 자르기 */
		}</p>
	</article>
  )
}

export default Post