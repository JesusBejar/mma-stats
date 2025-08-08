const FighterCard = ({ img, name, nickname, division, divisionBody, hometown, height, weight }) => {
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
      savedFighters.push(fighterToSave);
      localStorage.setItem('savedFighters', JSON.stringify(savedFighters));
      setIsSaved(true);
    }
  };
 
};

export default FighterCard;