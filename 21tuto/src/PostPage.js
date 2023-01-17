import { useParams, Link, useNavigate } from "react-router-dom"
import { useContext } from "react";
import DataContext from "./context/DataContext";
import api from './api/posts';

const PostPage = ( ) => {
  const { posts, setPosts } = useContext(DataContext)
  const { id } = useParams(); /* 여기서 사용하려고 App.js에서 해당 페이지 라우트한것, 라우트 시에 사용한 url에서 가져오는듯? 찾아보니 맞음 */
  const post = posts.find(post => (post.id).toString() === id); /* post에서 post.id와 id가 같은 오브젝트 찾음 */
  const navigator = useNavigate();
	const handleDelete = async (id) => {
		try {
			await api.delete(`/posts/${id}`)
			const postsList = posts.filter(post => post.id !== id);
			setPosts(postsList)
			navigator('/');
		} catch (err) {
			console.log(`Error. ${err.message}`);
		}
	}

  return (
  	<main className="PostPage">
     { <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.dateTime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }
        {!post &&
            <>
              <h2>Post Not Found</h2>
              <p>Well, that's disappointing</p>
              <p>
                <Link to='/'>back to Home</Link>
              </p>
            </>
        }
      </article>}
    </main>
  )
}

export default PostPage