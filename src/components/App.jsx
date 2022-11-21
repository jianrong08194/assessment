import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Posts from "./post/Posts";
import Post from "./post/Detail";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return <div>    
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Posts/>} />
        <Route path=":id/detail" element={<Post/>} />
      </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
