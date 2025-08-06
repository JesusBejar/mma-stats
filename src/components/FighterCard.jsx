const FighterCard = ({ name, nickname, division, divisionBody, hometown, height, weight }) => {
  return <div className="fighter-card">
    <h1>{name}</h1>
    <h5>{nickname}</h5>
    <h3>{division}</h3>
    <h2>{divisionBody}</h2>
    <h5>{hometown}</h5>
    <p>{height}</p>
    <p>{weight}</p>
  </div>;
};

export default FighterCard;