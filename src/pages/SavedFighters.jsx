import React, { useState, useEffect } from "react";
import FighterCard from "../components/FighterCard";
import { getSavedFighters } from "../services/database";

const SavedFighters = () => {
  const [fighters, setFighters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFighters();
  }, []);

  const loadFighters = async () => {
    setIsLoading(true);
    const { data, error } = await getSavedFighters();
    
    if (!error && data) {
      setFighters(data);
    }
    setIsLoading(false);
  };

  return (
    <div className="home-container">
      <h1>Saved Fighters</h1>
      <p className="p-description">Your favorite fighters</p>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : fighters.length === 0 ? (
        <div className="empty-state">
          <p>No saved fighters yet.</p>
          <a href="/">Go search for fighters</a>
        </div>
      ) : (
        <div className="search-results">
          {fighters.map((fighter) => (
            <FighterCard 
              key={fighter.id}
              img=""
              name={fighter.name}
              nickname={fighter.nickname}
              division={fighter.divisionTitle}
              divisionBody={fighter.divisionBody}
              hometown={fighter.homeTown}
              height={`Height ${fighter.height || 0} in`}
              weight={`Weight ${fighter.weight || 0} lbs`}
              onRemove={loadFighters}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedFighters;
