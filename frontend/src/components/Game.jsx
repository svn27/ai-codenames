import { useNavigate } from 'react-router-dom';
import Card from "./Card.jsx";

export default function Game() {

    const navigate = useNavigate();
    
    const allWords = [
        "apple", "banana", "cherry", "dog", "elephant", "frog", "guitar", "house", "ice", "jungle",
        "kite", "lemon", "mountain", "notebook", "ocean", "pencil", "queen", "river", "sun", "tree",
        "umbrella", "violin", "whale", "xylophone", "zebra"
      ];
      
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
      
    function generateWordMap() {
        const shuffledWords = shuffle([...allWords]);
        const wordMap = {};
      
        shuffledWords.slice(0, 9).forEach(word => wordMap[word] = "blue");
        shuffledWords.slice(9, 18).forEach(word => wordMap[word] = "red");
        wordMap[shuffledWords[18]] = "black";
        shuffledWords.slice(19).forEach(word => wordMap[word] = "normal");
      
        return wordMap;
    }
      
    const wordMap = generateWordMap();
      //console.log(wordMap);
      

    const handleMenuClick = () => {
        navigate('/menu'); // navigates to /menu route
    };

    return(
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center px-4">
            <h1 className="text-5xl font-bold mb-7">Game</h1>

            <div className="grid grid-cols-5 gap-4">
                {Object.entries(wordMap).map(([word, colour], i) => (
                    <Card key={i} word={word} colour={colour} />
                ))}
            </div>
            
            <button type="button" onClick={handleMenuClick}>Back to Menu</button>
        </div>
    )
}