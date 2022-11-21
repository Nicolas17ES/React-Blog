import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewPost from './pages/NewPost'
import UserPosts from './pages/UserPosts'
import SavedPosts from './pages/SavedPosts'
import SinglePost from './pages/SinglePost'
import Header from './components/Header'
import PrivateRoutes from './components/PrivateRoutes'
import SearchQuery from './pages/SearchQuery'
import UserProfile from './pages/UserProfile'
import ViewUserProfile from './pages/ViewUserProfile'
import Users from './pages/Users'
import BackButton from './components/BackButton'


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header/>
          <BackButton/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/search' element={<SearchQuery/>}/>
            <Route path='/new-post' element={<PrivateRoutes/>}>
              <Route path='/new-post' element={<NewPost/>}/>
            </Route>
            <Route path='/profile' element={<PrivateRoutes/>}>
              <Route path='/profile' element={<UserProfile/>}/>
            </Route>
            <Route path='/user-posts' element={<PrivateRoutes/>}>
              <Route path='/user-posts' element={<UserPosts/>}/>
            </Route>
            <Route path='/saved-posts' element={<PrivateRoutes/>}>
              <Route path='/saved-posts' element={<SavedPosts/>}/>
            </Route>
            <Route path='/post/:postId' element={<PrivateRoutes/>}>
              <Route path='/post/:postId' element={<SinglePost/>}/>
            </Route>
            <Route path='/user-profile' element={<PrivateRoutes/>}>
               <Route path='/user-profile' element={<ViewUserProfile/>}/>
            </Route>
            <Route path='/users' element={<PrivateRoutes/>}>
               <Route path='/users' element={<Users/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
