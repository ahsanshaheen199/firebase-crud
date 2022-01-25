import './App.css';
import { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';
import { auth, db } from './firebase-config';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import { signOut } from 'firebase/auth';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = async () => {
    try {
      await signOut(auth);
      setIsAuth(false);
      window.location.pathname = "/login"
    } catch( error ) {
      console.log(error);
    }
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to="/"> Home </Link>
        {  isAuth  ?
          <>
            <Link to="/createpost"> Create Post </Link>
            <button onClick={signUserOut}>Log out</button>
          </>
          : 
          <Link to="/login"> Login </Link>
        }
      </nav>
      <Routes>
        <Route path="/" element={ <Home isAuth={isAuth} /> } />
        <Route path="/login" element={ <Login setIsAuth={setIsAuth} /> } />
        <Route path="/createpost" element={ <CreatePost isAuth={isAuth} /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
