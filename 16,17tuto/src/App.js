import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Footer from './Footer';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "Jan 13, 2023 22:21:35 PM",
      body: "posting just for test"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "Jan 13, 2023 22:24:40 PM",
      body: "posting just for test add some string"
    },
    {
      id: 3,
      title: "My 3nd Post",
      datetime: "Jan 13, 2023 22:26:54 PM",
      body: "posting just for test add some string and"
    },
    {
      id: 4,
      title: "My 4nd Post",
      datetime: "Jan 13, 2023 22:30:21 PM",
      body: "posting just for test just endpoint"
    }
  ]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]); /* mathing a type with sample posts */
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigator = useNavigate();
 
  useEffect(() => {
    /* body나 title에서 찾는 것이 있는지 filter */
     const filteredResults = posts.filter(post => 
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()))
      setSearchResults(filteredResults.reverse());
  }, [posts, search])
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.legnth ? posts[posts.length - 1].id + 1 : 1 //인덱스 맨뒤 or 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp'); //시간 포맷에 맞게 시간 가져옴
    const newPost = { id, title: postTitle, datetime, body: postBody}
    const allPosts = [ ...posts, newPost ];
    setPosts(allPosts);
    setPostTitle(''); /* PostTitle초기화 */
    setPostBody(''); /* postBody초기화 */
    navigator('/'); /* 홈으로 돌아감 */

  }
  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList)
    navigator('/');
  }

  return (
    <div className="App"> 
      <Header title="React Js Test"/>
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/*" element={<Home posts={searchResults}/> } />
        <Route path="/post/*">
          <Route index element={<NewPost 
             handleSubmit={handleSubmit}
             postTitle={postTitle}
             setPostTitle={setPostTitle}
             postBody={postBody}
             setPostBody={setPostBody}
          />} />
          <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
