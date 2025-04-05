import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();
  const desc = "Play Codenames against an AI";

  const handlePlayClick = () => {
    navigate('/play'); // navigates to /log route
  };

  const handleRulesClick = () => {
    navigate('/rules'); // navigates to /log route
  };

  
  return (
    <>
      <h1>Codenames</h1>
      <h2>Welcome to Codenames</h2>
      <p>{desc}</p>
      <button type="button" onClick={handlePlayClick}>Play</button>
      <button type="button" onClick={handleRulesClick}>Rules</button>

    </>
  );
}

export default Menu;