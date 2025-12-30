import React, { useState } from 'react';
import '../styles/HanjaCard.css';
import type { MouseEvent } from 'react';
import type { Hanja } from '../pages/Home';

/** props 타입 */
interface HanjaCardProps {
  data: Hanja;
  onUpdate?: (id: string, status: string, isWrong: boolean) => void;
}

const HanjaCard: React.FC<HanjaCardProps> = ({ data, onUpdate }) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  const handleStopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="card-container"
      onClick={() => setFlipped(prev => !prev)}
    >
      <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
        <div className={`card-front ${data.status}`}>
          {data.hanja}
        </div>

        <div className="card-back">
          <p>
            {data.meaning} {data.sound}
          </p>
          <small>틀린 횟수: {data.wrongCount}</small>

          {onUpdate && (
            <div onClick={handleStopPropagation}>
              <button className="check-button" onClick={() => {
                onUpdate(data.characterId, 'studied', false);
                setFlipped(prev => !prev);
              }}>
                ✅
              </button>
              <button className="check-button" onClick={() => {
                onUpdate(data.characterId, 'unmemorized', true);
                setFlipped(prev => !prev);
              }}>
                ❌
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HanjaCard;
