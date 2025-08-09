import React, { useState, useEffect } from "react";
import YearCard from "../components/YearCard";
import { getSavedFights } from "../services/database";

const SavedFights = () => {
  const [fights, setFights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFights();
  }, []);

  const loadFights = async () => {
    setIsLoading(true);
    const { data, error } = await getSavedFights();
    
    if (!error && data) {
      setFights(data);
    }
    setIsLoading(false);
  };

  return (
    <div className="home-container">
      <h1>Saved Fights</h1>
      <p className="p-description">Your favorite fights</p>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : fights.length === 0 ? (
        <div className="empty-state">
          <p>No saved fights yet.</p>
          <a href="/">Go search for fights</a>
        </div>
      ) : (
        <div className="year-results">
          {fights.map((fight) => {
            const [fighter1, fighter2] = fight.matchup.split(' vs ');
            return (
              <YearCard 
                key={fight.id}
                fighter1={fighter1}
                fighter2={fighter2}
                date={fight.date}
                onRemove={loadFights}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedFights;
