import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const location = useLocation();
  const [username, setUsername] = useState("");

  const getUserName = async () => {
    if(!user) return;

    const db = getFirestore();
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) {
      setUsername(docSnap.data().name);
    }
  }
  
  useEffect(() => {
    getUserName();
  }, []);

  if(location.pathname === '/auth') {
    return null;
  }

  const handleLogout = async() => {
    try {
      const ok = confirm("로그아웃 하시겠습니까?");
      if(ok) {
        await signOut(auth);
        navigate('/home');
        window.location.reload();
      }
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  }

  const handleLogin = () => {
    navigate('/auth');
  }




  return (
    <nav className="navbar">
      {/* <div className="navbar-brand">漢字學習</div> */}
      <span>{username}님, 반갑습니다!</span>
      {user ? (
        <button id="logout-btn" onClick={handleLogout}>logout</button>
      ) : (
        <button id="login-btn" onClick={handleLogin}>login</button>
      )

      }
      
    </nav>
  );
};

export default Navbar;



