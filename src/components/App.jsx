import { BrowserRouter,Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import {getPosts} from '../api.js'
import Posts from "./post/List";
import Post from "./post/Detail";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then((result) => {
      setPosts(result.posts);
    })
  }, [])
  
  return <div>    
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Posts posts={posts}/>} />
        <Route path=":id/detail" element={<Post/>} />
      </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
