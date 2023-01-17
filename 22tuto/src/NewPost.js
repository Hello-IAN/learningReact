import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {

  const navigator = useNavigate();
  const posts = useStoreState((state)=> state.posts);
  const postTitle = useStoreState((state)=> state.postTitle);
  const postBody = useStoreState((state)=> state.postBody);

  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  
  const handleSubmit = (e) => {
		e.preventDefault();
		const id = posts.length ? posts[posts.length - 1].id + 1 : 1 //인덱스 맨뒤 or 1
		const datetime = format(new Date(), 'MMMM dd, yyyy pp'); //시간 포맷에 맞게 시간 가져옴
		const newPost = { id, title: postTitle, datetime, body: postBody}
    savePost(newPost);
    navigator('/');
	}
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title</label>
        <input 
          type="text"
          id="postTitle"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}          
          /> {/* htmlfor 속성값이랑 id 매칭 */}
        <label htmlFor="postBody">Post:</label>
        <textarea 
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)} 
          cols="30" rows="10">
        </textarea>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost