import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom"
import DataContext from './context/DataContext';
import api from './api/posts';
import { format } from 'date-fns';

const EditPost = () => {
	const [editTitle, setEditTitle] = useState('');
	const [editBody, setEditBody] = useState('');
	const { posts, setPosts} = useContext(DataContext);
	const { id } = useParams();
	const post = posts.find(post => (post.id).toString() === id);
	const navigator = useNavigate();

	useEffect(() => {
		if (post) {
			setEditTitle(post.title);
			setEditBody(post.body);
		} else {
			console.log("failed loading");
		}
	}, [post, setEditTitle, setEditBody])
	
		
	const handleEdit = async (id) => {
		const datetime = format(new Date(), 'MMMM dd, yyyy pp'); /* //시간 포맷에 맞게 시간 가져옴 */
		const updatedPost = { id, title: editTitle, datetime, body: editBody}
	
		try {
			const response = await api.put(`/posts/${id}`, updatedPost)
			setPosts(posts.map(post => post.id === id ? { ...response.data } : post)) /* //업데이트 된것만 던짐 */
			setEditTitle('');
			setEditBody('');
			navigator('/');
		} catch(err) {
			console.log(`Error. ${err.message}`);
		}
	}
	
 	return (
		<main className='NewPost'>
			{editTitle && 
				<>
				<h2>Edit Post</h2>
				<form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
					<label htmlFor="postTitle">Title:</label>
			 		<input 
						type="text"
						id="postTitle"
						required
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}		  
					/> {/* htmlfor 속성값이랑 id 매칭 */}
					<label htmlFor="postBody">Post:</label>
					<textarea 
						id="postBody"
						required
						value={editBody}
						onChange={(e) => setEditBody(e.target.value)} 
					/>
					<button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
				</form>
				</>
			}
			{!editTitle &&
				<>
					<h2> Post Not Found </h2>
					<p>Well, that's disappointing</p>
					<p>
						<Link to='/'>Back to Home</Link>
					</p>
				</>
				
			}
		</main>
  )
}

export default EditPost