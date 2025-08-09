import React, { useState, useEffect } from "react";
import {
  saveFight,
  deleteFight,
  isFightSaved,
  getSavedFights,
} from "../services/database";

const YearCard = ({ fighter1, fighter2, date, onRemove }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkIfSaved();
  }, [fighter1, fighter2, date]);

  const checkIfSaved = async () => {
    if (!fighter1 || !fighter2 || !date) return;
    const saved = await isFightSaved(fighter1, fighter2, date);
    setIsSaved(saved);
  };

  const toggleSave = async () => {
    if (isLoading) return;

    setIsLoading(true);

    if (isSaved) {
      const { data: fights } = await getSavedFights();
      const fight = fights?.find(
        (f) => f.matchup === `${fighter1} vs ${fighter2}` && f.date === date
      );
      if (fight) {
        const { error } = await deleteFight(fight.id);
        if (!error) {
          setIsSaved(false);
          if (onRemove) onRemove();
        }
      }
    } else {
      const fightData = { fighter1, fighter2, date };
      const { error } = await saveFight(fightData);
      if (!error) {
        setIsSaved(true);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="ufc-fight-card">
      <button
        className={`save-star ${isSaved ? "saved" : ""} ${
          isLoading ? "loading" : ""
        }`}
        onClick={toggleSave}
        disabled={isLoading}
        title={
          isLoading ? "Saving..." : isSaved ? "Remove from saved" : "Save fight"
        }
      ></button>
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
