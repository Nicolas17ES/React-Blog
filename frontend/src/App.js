import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewPost from './pages/NewPost'
import UserPosts from './pages/UserPosts'
import SinglePost from './pages/SinglePost'
import Header from './components/Header'
import PrivateRoutes from './components/PrivateRoutes'


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/new-post' element={<PrivateRoutes/>}>
              <Route path='/new-post' element={<NewPost/>}/>
            </Route>
            <Route path='/user-posts' element={<PrivateRoutes/>}>
              <Route path='/user-posts' element={<UserPosts/>}/>
            </Route>
            <Route path='/post/:postId' element={<PrivateRoutes/>}>
              <Route path='/post/:postId' element={<SinglePost/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
