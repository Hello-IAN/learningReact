import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';
import Footer from './Footer';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]); /* mathing a type with sample posts */
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigator = useNavigate();
  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/post');

  useEffect(() => {
      setPosts(data);
  }, [data]) /* only first loading  */
 
  useEffect(() => {
    /* body나 title에서 찾는 것이 있는지 filter */
     const filteredResults = posts.filter(post => 
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()))
      setSearchResults(filteredResults.reverse());
  }, [posts, search])

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
    <div className="App"> 
      <Header title="React Js Test" width={width}/>
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home 
          posts={searchResults}
          fetchError={fetchError}
          isLoading={isLoading}
          /> } />
        <Route path="post">
          <Route index element={<NewPost 
             handleSubmit={handleSubmit}
             postTitle={postTitle}
             setPostTitle={setPostTitle}
             postBody={postBody}
             setPostBody={setPostBody}
             />} />
          <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
        </Route>
       <Route path="edit/:id" element={<EditPost
                posts={posts} 
                handleEdit={handleEdit}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editBody={editBody}
                setEditBody={setEditBody}
             />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
