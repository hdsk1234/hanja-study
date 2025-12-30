import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  OAuthProvider 
} from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/Auth.css';


const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // UI용 추가
  const [fullName, setFullName] = useState(''); // UI용 추가
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const userCredentia = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentia.user;
        
        // users 컬렉션에 유저 정보 저장
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: email,
          createdAt: new Date()
        });


        alert('회원가입 성공');
        setIsSignup(false);
        navigate('/auth');
      } else {
        await signInWithEmailAndPassword(auth, email, password);

        navigate('/home');
      }
    } catch (err: any) {
      switch (err.code) {
        case 'auth/invalid-credential':
          alert("이메일 또는 비밀번호가 일치하지 않습니다.");
          break;
        case 'auth/too-many-requests':
          alert("로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.");
          break;
        default:
          alert("로그인 중 오류가 발생했습니다.");
          break;
        }
    };
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleNaverLogin = async () => {
    const provider = new OAuthProvider('oidc.naver');
    await signInWithPopup(auth, provider);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* 왼쪽: 히어로 섹션 (이미지/텍스트) */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Defy the Past<br />Step into the<br />Future</h1>
            {/* VR 헤드셋 이미지 자리 (실제 이미지 경로로 교체 필요) */}
            <div className="hero-image-placeholder">
              <img src="/vr-headset.png" alt="VR Headset" onError={(e) => e.currentTarget.style.display='none'} />
            </div>
          </div>
        </div>

        {/* 오른쪽: 폼 섹션 */}
        <div className="form-section">
          
          <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          
          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
                <span className="eye-icon" >👁</span>
            </div>

            {isSignup && (
              <>
                <div className="input-group">
                  <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span className="eye-icon">👁</span>
                </div>
              </>
            )}

            <button type="submit" className="btn-submit">
              {isSignup ? 'Create Account' : 'Log In'}
            </button>
          </form>

          <div className="divider">Or</div>

          <div className="social-login">
            <button onClick={handleGoogleLogin} className="social-btn google">
              <span className="icon">G</span> Signup with Google
            </button>
            <button onClick={handleNaverLogin} className="social-btn naver">
              <span className="icon">N</span> Signup with Naver
            </button>
          </div>

          <p className="toggle-text">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? ' Log In' : ' Sign Up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;