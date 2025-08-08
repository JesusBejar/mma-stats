const UFCCard = ({ fighter1, fighter2, date }) => {
  return (
    <div className="ufc-fight-card">
      <div className="fight-date">{date}</div>
      <div className="fighter-names">
        <span className="fighter">{fighter1}</span>
        <span className="vs">VS</span>
        <span className="fighter">{fighter2}</span>
      </div>
    </div>
  );
};

export default UFCCard;

