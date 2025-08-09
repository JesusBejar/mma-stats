import React, { useState, useEffect } from "react";
import {
  saveFighter,
  deleteFighter,
  isFighterSaved,
  getSavedFighters,
} from "../services/database";

const FighterCard = ({
  img,
  name,
  nickname,
  division,
  divisionBody,
  hometown,
  height,
  weight,
  onRemove,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkIfSaved();
  }, [name]);

  const checkIfSaved = async () => {
    if (!name) return;
    const saved = await isFighterSaved(name);
    setIsSaved(saved);
  };

  const toggleSave = async () => {
    if (isLoading) return;

    setIsLoading(true);

    if (isSaved) {
      const { data: fighters } = await getSavedFighters();
      const fighter = fighters?.find((f) => f.name === name);
      if (fighter) {
        const { error } = await deleteFighter(fighter.id);
        if (!error) {
          setIsSaved(false);
          if (onRemove) onRemove();
        }
      }
    } else {
      const fighterData = {
        Name: name,
        Nickname: nickname,
        "Division Title": division,
        "Division Body": {
          Wins: divisionBody.split("W-")[0],
          Losses: divisionBody.split("W-")[1]?.split("L-")[0] || "0",
          Draws: divisionBody.split("L-")[1]?.split("D")[0] || "0",
        },
        "Fighter Bio": {
          Hometown: hometown,
          Height: height.replace("Height ", "").replace(" in", ""),
          Weight: weight.replace("Weight ", "").replace(" lbs", ""),
        },
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
        className={`save-star ${isSaved ? "saved" : ""} ${
          isLoading ? "loading" : ""
        }`}
        onClick={toggleSave}
        disabled={isLoading}
        title={
          isLoading
            ? "Saving..."
            : isSaved
            ? "Remove from saved"
            : "Save fighter"
        }
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
