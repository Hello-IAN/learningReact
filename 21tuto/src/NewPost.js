import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api/posts'
import DataContext from './context/DataContext';
import { format } from 'date-fns';

const NewPost = () => {
  const [postTitle, setPostTitle] = useState('');
	const [postBody, setPostBody] = useState('');
  const { posts, setPosts } = useContext(DataContext);
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
		e.preventDefault();
		const id = posts.length ? posts[posts.length - 1].id + 1 : 1 //인덱스 맨뒤 or 1
		const datetime = format(new Date(), 'MMMM dd, yyyy pp'); //시간 포맷에 맞게 시간 가져옴
		const newPost = { id, title: postTitle, datetime, body: postBody}
		try {
			const response = await api.post('/posts', newPost); /* sending a new data to server using axios */
			const allPosts = [ ...posts, response.data];
			setPosts(allPosts);
			setPostTitle(''); /* PostTitle초기화 */
			setPostBody(''); /* postBody초기화 */
			navigator('/'); /* 홈으로 돌아감 */
		} catch(err) {
			console.log(`Error. ${err.message}`);
		}
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