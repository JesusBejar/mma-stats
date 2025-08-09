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
    <>
      <NavBar />
      <div className="saved-page-container">
        <h1>Saved Fighters</h1>
        <p className="saved-description">Your collection of favorite fighters</p>
        
        {savedFighters.length > 0 && (
          <div className="saved-controls">
            <button onClick={clearAllFighters} className="clear-all-btn">
              Clear All Saved Fighters
            </button>
            <span className="saved-count">
              {savedFighters.length} fighter{savedFighters.length !== 1 ? 's' : ''} saved
            </span>
          </div>
        )}

        {savedFighters.length === 0 ? (
          <div className="empty-state">
            <h3>No fighters saved yet</h3>
            <p>Search for fighters on the home page and save your favorites!</p>
            <a href="/" className="home-link">Go to Home Page</a>
          </div>
        ) : (
          <div className="saved-results">
            {savedFighters.map((fighterData, index) => (
              <div key={index} className="saved-fighter-item">
                <FighterCard 
                  img={fighterData["Image Link"]}
                  name={fighterData.Name} 
                  nickname={fighterData.Nickname} 
                  division={fighterData["Division Title"]} 
                  divisionBody={`${fighterData["Division Body"].Wins}W-${fighterData["Division Body"].Losses}L-${fighterData["Division Body"].Draws}D`}
                  hometown={fighterData["Fighter Bio"].Hometown} 
                  height={`Height ${fighterData["Fighter Bio"].Height} in`} 
                  weight={`Weight ${fighterData["Fighter Bio"].Weight} lbs`} 
                />
                <button 
                  onClick={() => removeFighter(index)}
                  className="remove-btn"
                >
                  Remove from Saved
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SavedFighters;
