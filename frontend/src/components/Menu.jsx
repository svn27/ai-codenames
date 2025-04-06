import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();
  //const desc = "Play Codenames against an AI";

  const handlePlayClick = () => {
    navigate('/play'); 
  };

  const handleRulesClick = () => {
    navigate('/rules');
  };

  //<h1 className="text-7xl font-bold mb-5">CODENETICS</h1>
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center px-4">
      
      <img src="/raw-removebg-preview.png" alt="Codenetics Logo" className="w-100 mb-0" />
      
      <p className="mb-5">Play Codenames against an AI</p>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handlePlayClick}
          className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold"
        >
          Play
        </button>
        <button
          type="button"
          onClick={handleRulesClick}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold"
        >
          Rules
        </button>
      </div>
    </div>
  );
}

export default Menu;