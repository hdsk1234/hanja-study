import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { auth } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import './App.css'


function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
      // 로그인 상태 감시 리스너
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // 언마운트 시 구독 해제
  }, []);

  if (loading) return <h1>Loading...</h1>;
  
  return (
   <Router>
    <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </Router>
  )
}

export default App

