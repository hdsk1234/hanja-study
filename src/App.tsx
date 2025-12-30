import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { auth } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';


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

  if (loading) return <div>Loading...</div>;

  // return (
  //   <Router>
  //     <Navbar />
  //     <Routes>
  //       {/* 1. 로그인 상태일 때만 접근 가능한 경로 */}
  //       <Route 
  //         path="/" 
  //         element={user ? <Home /> : <Navigate to="/auth" replace />} 
  //       />

  //       {/* 2. 로그아웃 상태일 때만 접근 가능한 경로 (로그인 페이지) */}
  //       <Route 
  //         path="/auth" 
  //         element={!user ? <Auth /> : <Navigate to="/" replace />} 
  //       />

  //       {/* 3. 기타 정의되지 않은 경로는 홈으로 리다이렉트 */}
  //       <Route path="*" element={<Navigate to="/" replace />} />
  //     </Routes>
  //   </Router>
  // );

  
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

