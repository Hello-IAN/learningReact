import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App"> 
      <Header title="React Js Test"/>
      <Nav />
      <Routes>
        <Route path="/*" element={<Home /> } />
        <Route path="/post/*" element={<NewPost />}> 
          <Route path=":id" element={<NewPost />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
