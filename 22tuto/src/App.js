import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

function App() {

  return (
    <div className="App"> 
        <Header title="React Js Test" />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="post">
              <Route index element={<NewPost />} />
              <Route path=":id" element={<PostPage />} />
            </Route>
          <Route path="edit/:id" element={<EditPost />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        <Footer /> 
    </div>
  );
}

export default App;
