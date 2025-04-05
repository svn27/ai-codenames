import { useNavigate } from 'react-router-dom';
import Card from "./Card.jsx";
import { useState } from 'react';

export default function Game() {

    const navigate = useNavigate();
    
    const allWords = [
        "apple", "banana", "cherry", "dog", "elephant", "frog", "guitar", "house", "ice", "jungle",
        "kite", "lemon", "mountain", "notebook", "ocean", "pencil", "queen", "river", "sun", "tree",
        "umbrella", "violin", "whale", "xylophone", "zebra"
      ];
      
    function generateWordMap(words) {
        const wordMap = {};
      
        words.forEach((word, index) => {
          if (index < 9) wordMap[word] = "blue";
          else if (index < 18) wordMap[word] = "red";
          else if (index === 18) wordMap[word] = "black";
          else wordMap[word] = "normal";
        });
      
        return wordMap;
      }
      
    const wordMap = generateWordMap(allWords);
    //console.log(wordMap);

    const [currentTurn, setCurrentTurn] = useState("human-spymaster");
    const [clue, setClue] = useState('');
    const [clueNumber, setClueNumber] = useState(1);

    function handleClueSubmit() {
        if (!clue.trim()) return;
      
        console.log("Clue submitted:", clue, clueNumber);
      
        // Save or send the clue + number to state or server
        // Then advance turn
        //setClue('');
        setClueNumber(1);
        setCurrentTurn('human-operative');
      }
      
    if (currentTurn === "human-spymaster"){
        return(
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center px-4">
                <h1 className="text-5xl font-bold mb-10">Give your operatives a clue</h1>
    
                <div className="grid grid-cols-5 gap-4 mb-10">
                    {Object.entries(wordMap).map(([word, colour], i) => (
                        <Card key={i} word={word} colour={colour} />
                    ))}
                </div>
                
                <div className="flex flex-col items-center gap-4">
                    <input
                        type="text"
                        value={clue}
                        onChange={(e) => setClue(e.target.value)}
                        placeholder="Enter a one-word clue"
                        className="px-4 py-2 rounded-md border border-gray-300 text-black w-64"
                    />

                    <select
                        value={clueNumber}
                        onChange={(e) => setClueNumber(Number(e.target.value))}
                        className="px-3 py-2 rounded-md border border-gray-300 text-black"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleClueSubmit}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold"
                    >
                        Submit Clue
                    </button>
                </div>
            </div>
        );
    }

    else if (currentTurn === "human-operative"){
        return(
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center px-4">
                <h1 className="text-5xl font-bold mb-10">{"Clue: " + clue}</h1>
    
                <div className="grid grid-cols-5 gap-4 mb-10">
                    {Object.entries(wordMap).map(([word, colour], i) => (
                        <Card key={i} word={word} colour={colour} />
                    ))}
                </div>   
            </div>
        );

    }

    //print current turn if error
    return <div>{currentTurn}</div>;
}