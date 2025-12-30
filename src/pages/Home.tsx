import { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, increment, collection, query, where, getDocs } from 'firebase/firestore';
import HanjaCard from '../components/HanjaCard';
import '../styles/Home.css'


/** 한자 데이터 타입 */
export interface Hanja {
  characterId: string;
  hanja: string;
  meaning: string;
  sound: string;
  wrongCount: number;
  status: string;
  grade: number;
}

const Home: React.FC = () => {
  const [hanjas, setHanjas] = useState<Hanja[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('grade');

  const auth = getAuth();
  const user = auth.currentUser;
  

  useEffect(() => {
    const fetchData = async () => {
    await getAllHanjas();
    await getUserStudyLog();
    };
    fetchData();
  }, [user]);

  // 공통 로직: 전체 한자 get
  const getAllHanjas = async () => {
    const q = query(
      collection(db, "characters")
    );
    const querySnapshot = await getDocs(q);
    const hanjas = querySnapshot.docs.map(doc => ({
      characterId: doc.id,
      hanja: doc.data().hanja,
      meaning: doc.data().meaning,
      sound: doc.data().sound,
      wrongCount: 0,
      status: "not_studied",
      grade: doc.data().grade,
    }));
    setHanjas(hanjas);
  };

  
  // 로그인 유저 전용 로직: 유저 학습 상태 get
  const getUserStudyLog = async () => {
    if(!user) return;

    const q = query(
      collection(db, "study_logs"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    
    // 1. 학습 기록 데이터를 맵(Map) 형태로 변환 (조회 성능 최적화)
    const logsMap = new Map();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      logsMap.set(data.characterId, data);
    });

    // 2. 기존 hanjas 상태 업데이트
    setHanjas(prevHanjas => 
      prevHanjas.map(h => {
        const log = logsMap.get(h.characterId);
        if (log) {
          return {
            ...h,
            status: log.status,
            wrongCount: log.wrongCount || 0 
          };
        }
        return h;
      })
    );

  }


  // 로그인 유저 전용 로직: 학습 상태 업데이트
  const setUserStudyLog = async (characterId: string, status: string, isWrong: boolean) => {
    try {
      if (!user) {
        alert("로그인이 필요합니다.");
        return;
      }

      console.log(characterId, status, isWrong);

      const docId = `${user.uid}_${characterId}`;
      const docRef = doc(db, "study_logs", docId);
      const docSnapshot = await getDoc(docRef);

      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const dayAfterTomorrow = new Date();
      dayAfterTomorrow.setDate(today.getDate() + 2);

      if (!docSnapshot.exists()) { // 학습 기록이 없으면 문서 생성.
        await setDoc(docRef, {
          userId: user.uid,
          characterId: characterId,
          status: status,
          wrongCount: isWrong ? 1 : 0,
          lastReviewDate: new Date(),
          nextStudyDate: isWrong ? tomorrow : dayAfterTomorrow,
        })
      }
      else { // 학습 기록이 있으면 업데이트.
        await updateDoc(docRef, {
          status: status,
          wrongCount: isWrong ? increment(1) : increment(0),
          lastReviewDate: new Date(),
          nextStudyDate: isWrong ? tomorrow : dayAfterTomorrow,
        })
      }

    } catch (err) {
      console.error("학습 상태 업데이트 중 오류 발생:", err);
    }
  }



  const handleUpdate = async(id: string, status: string, isWrong: boolean) => {
    await setUserStudyLog(id, status, isWrong);
    await getUserStudyLog();
  }
    

  const filteredHanjas = hanjas
    .filter(h => filter === 'all' || h.status === filter)
    .filter(h => gradeFilter === 'all' || h.grade.toString() === gradeFilter);

  filteredHanjas.sort((a, b) => {
    if (sortOrder === 'grade') return a.grade - b.grade; // 급수순 (오름차순)
    if (sortOrder === 'wrong') return b.wrongCount - a.wrongCount; // 틀린 횟수순 (내림차순)
    if (sortOrder === 'alphabetical') return a.sound.localeCompare(b.sound); // 가나다순 (음 기준)
    if (sortOrder === 'random') return Math.random() - 0.5; // 무작위 정렬
    return 0;
  });

  return (
    <div className="home-container">
      <div className="filter-bar">
        <button onClick={() => setFilter('all')} className={`filter-button ${filter === 'all' ? 'active' : ''}`}>전체</button>
        <button onClick={() => setFilter('unmemorized')} className={`filter-button ${filter === 'unmemorized' ? 'active' : ''}`}>미암기</button>
        <button onClick={() => setFilter('studied')} className={`filter-button ${filter === 'studied' ? 'active' : ''}`}>완료</button>
      </div>

      <div className="grade-filter-bar">
        <button onClick={() => setGradeFilter('all')} className={`filter-button ${gradeFilter === 'all' ? 'active' : ''}`}>전체</button>
        <button onClick={() => setGradeFilter('9')} className={`filter-button ${gradeFilter === '9' ? 'active' : ''}`}>9급</button>
        <button onClick={() => setGradeFilter('8')} className={`filter-button ${gradeFilter === '8' ? 'active' : ''}`}>8급</button>
        <button onClick={() => setGradeFilter('7')} className={`filter-button ${gradeFilter === '7' ? 'active' : ''}`}>7급</button>
        <button onClick={() => setGradeFilter('6')} className={`filter-button ${gradeFilter === '6' ? 'active' : ''}`}>6급</button>
        <button onClick={() => setGradeFilter('5')} className={`filter-button ${gradeFilter === '5' ? 'active' : ''}`}>5급</button>
        <button onClick={() => setGradeFilter('4')} className={`filter-button ${gradeFilter === '4' ? 'active' : ''}`}>4급</button>
      </div>



      
      <div className="sort-group">
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="grade">급수순</option>
          <option value="wrong">틀린 횟수순</option>
          <option value="alphabetical">가나다순</option>
          <option value="random">무작위</option>
        </select>
      </div>

      <button>무작위로 섞기</button>

      <div className="home-grid">
        {filteredHanjas.map(h => (
          <HanjaCard 
            key={h.characterId}
            data={h}
            onUpdate={handleUpdate} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;