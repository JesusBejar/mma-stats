import React, { useState, useEffect } from "react";

const FighterCard = ({ img, name, nickname, division, divisionBody, hometown, height, weight }) => {
 const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedFighters = JSON.parse(localStorage.getItem('savedFighters') || '[]');
    const isAlreadySaved = savedFighters.some(fighter => 
      fighter.Name === name && fighter.Nickname === nickname
    );
    setIsSaved(isAlreadySaved);
  }, [name, nickname]);

  const toggleSave = () => {
    const savedFighters = JSON.parse(localStorage.getItem('savedFighters') || '[]');
    
    if (isSaved) {
      const updatedFighters = savedFighters.filter(fighter => 
        !(fighter.Name === name && fighter.Nickname === nickname)
      );
      localStorage.setItem('savedFighters', JSON.stringify(updatedFighters));
      setIsSaved(false);
    } else {
      const fighterToSave = {
        "Image Link": img,
        "Name": name,
        "Nickname": nickname,
        "Division Title": division,
        "Division Body": {
          "Wins": divisionBody.split('W-')[0],
          "Losses": divisionBody.split('W-')[1]?.split('L-')[0] || "0",
          "Draws": divisionBody.split('L-')[1]?.split('D')[0] || "0"
        },
        "Fighter Bio": {
          "Hometown": hometown,
          "Height": height.replace('Height ', '').replace(' in', ''),
          "Weight": weight.replace('Weight ', '').replace(' lbs', '')
        }
      };
      
      const { error } = await saveFighter(fighterData);
      if (!error) {
        setIsSaved(true);
      }
    }
    
    setIsLoading(false);
  };
 
  return (
    <div className="fighter-card">
      <button 
        className={`save-star ${isSaved ? 'saved' : ''} ${isLoading ? 'loading' : ''}`}
        onClick={toggleSave}
        disabled={isLoading}
        title={isLoading ? "Saving..." : (isSaved ? "Remove from saved" : "Save fighter")}
      >
        {isLoading ? "⏳" : ""}
      </button>
      <img src={img} alt={name} />
      <h1>{name}</h1>
      <h5>{nickname}</h5>
      <h3>{division}</h3>
      <h2>{divisionBody}</h2>
      <h5>{hometown}</h5>
      <p>{height}</p>
      <p>{weight}</p>
    </div>
  );
};

export default FighterCard;