import React, { useState, useEffect } from "react";

const YearCard = ({ fighter1, fighter2, date }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedFights = JSON.parse(localStorage.getItem('savedFights') || '[]');
    const isAlreadySaved = savedFights.some(fight => 
      fight.fighter1 === fighter1 && fight.fighter2 === fighter2 && fight.date === date
    );
    setIsSaved(isAlreadySaved);
  }, [fighter1, fighter2, date]);

  const toggleSave = () => {
    const savedFights = JSON.parse(localStorage.getItem('savedFights') || '[]');
    
    if (isSaved) {
      const updatedFights = savedFights.filter(fight => 
        !(fight.fighter1 === fighter1 && fight.fighter2 === fighter2 && fight.date === date)
      );
      localStorage.setItem('savedFights', JSON.stringify(updatedFights));
      setIsSaved(false);
    } else {
      const fightToSave = {
        fighter1,
        fighter2,
        date
      };
      savedFights.push(fightToSave);
      localStorage.setItem('savedFights', JSON.stringify(savedFights));
      setIsSaved(true);
    }
  };

  return (
    <div className="ufc-fight-card">
      <button 
        className={`save-star ${isSaved ? 'saved' : ''}`}
        onClick={toggleSave}
        title={isSaved ? "Remove from saved" : "Save fight"}
      >
        ★
      </button>
      <div className="fight-date">{date}</div>
      <div className="fighter-names">
        <span className="fighter">{fighter1}</span>
        <span className="vs">VS</span>
        <span className="fighter">{fighter2}</span>
      </div>
    </div>
  );
};

export default YearCard;

