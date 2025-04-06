import { useNavigate } from 'react-router-dom';
import Card from "./Card.jsx";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Game() {

    const navigate = useNavigate();
    const handleMenuClick = () => {
        navigate('/menu');
    };
    const [wordMap, setWordMap] = useState({});
    const [wordState, setWordState] = useState({});
    const [gameState, setGameState] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                var response = await axios.get("http://127.0.0.1:8000/game/get_new_game");
                setGameState(response.data);
                console.log(response.data); // use the data to populate your board
            } catch (error) {
                console.error("Failed to fetch:", error);
            }
            const words = response.data.board_words;
            const newWordMap = Object.fromEntries(
              words.map(({ word, role }) => [word, role === "assassin" ? "black" : role])
            );
            
            const newWordState = Object.fromEntries(
              words.map(({ word }) => [word, false])
            );
            
            setWordMap(newWordMap);
            setWordState(newWordState);            
        }   
      
        fetchData();
    }, []);


    const [currentTurn, setCurrentTurn] = useState("human-spymaster");
    const [clue, setClue] = useState('');
    const [clueNumber, setClueNumber] = useState(1);
    const [winner, setWinner] = useState("");
    const [blues, setBlues] = useState(0);
    const [reds, setReds] = useState(0);
    const [aiGuesses, setAiGuesses] = useState([]);
    const [guessIndex, setGuessIndex] = useState(0);


    useEffect(() => {
        const fetchAiClue = async () => {
          if (currentTurn !== "ai-spymaster") return;
      
          const allWords = Object.keys(wordMap);
          const unflippedWords = allWords.filter(word => !wordState[word]);
          const redUnflippedWords = unflippedWords.filter(word => wordMap[word] === "red");
          const formData = {
            all_words: unflippedWords,
            ai_words: redUnflippedWords
          };

          console.log(formData)

          try {
            const response = await axios.post("http://127.0.0.1:8000/game/get_ai_spymaster", formData);
      
            const { spymaster_word, goes } = response.data;
            setClue(spymaster_word);
            setClueNumber(goes);
            
            setTimeout(() => {
                setCurrentTurn("ai-operative");
            }, 3000); // 3000ms = 3 seconds

          } catch (error) {
            console.error("AI Spymaster error:", error);
          }
        };
      
        fetchAiClue();
      }, [currentTurn]);
      
    useEffect(() => {
        const fetchAiGuesses = async () => {
          if (
            currentTurn !== "ai-operative" ||
            !clue ||
            Object.keys(wordMap).length === 0 ||
            Object.keys(wordState).length === 0
          ) return;
      
          try {
            const unflippedWords = Object.keys(wordMap).filter(word => !wordState[word]);
      
            const response = await axios.post("http://127.0.0.1:8000/game/get_ai_guesses", {
              all_words: unflippedWords,
              spymaster_word: clue,
              goes: clueNumber
            });
      
            const guesses = response.data.guesses;
            setAiGuesses(guesses);
            setGuessIndex(0);
          } catch (error) {
            console.error("AI Operative error:", error);
          }
        };
      
        fetchAiGuesses();
    }, [currentTurn]);
      
    useEffect(() => {
        if (
          currentTurn !== "ai-operative" ||
          guessIndex >= aiGuesses.length
        ) return;
        console.log(wordMap)
        console.log("AI guesses:", aiGuesses);

        
        const guess = aiGuesses[guessIndex];
        const colour = wordMap[guess];
      
        const timeout = setTimeout(() => {
          setWordState(prev => ({ ...prev, [guess]: true }));
      
          if (colour === "red") {
            const newReds = reds + 1;
            setReds(newReds);
      
            if (newReds === 9) {
              setWinner("AI");
              setCurrentTurn("over");
              return;
            }
      
            if (colour === "red") {
                const newReds = reds + 1;
                setReds(newReds);
              
                if (newReds === 9) {
                  setWinner("AI");
                  setCurrentTurn("over");
                  return;
                }
              
                if (guessIndex + 1 < clueNumber) {
                  setGuessIndex(prev => prev + 1);
                } else {
                  setCurrentTurn("human-spymaster");
                }
              } else {
                // Reveal wrong card, end turn
                setCurrentTurn("human-spymaster");
              }
              
      
          } else if (colour === "blue" || colour === "neutral") {
            setCurrentTurn("human-spymaster");
          } else if (colour === "black") {
            setWinner("You");
            setCurrentTurn("over");
          }
      
        }, 3000); // 3 second delay
      
        return () => clearTimeout(timeout);
    }, [guessIndex, aiGuesses, currentTurn]);
      

    function handleClueSubmit() {
        if (!clue.trim()) return;
        console.log("Clue submitted:", clue, clueNumber);
        setClueNumber(clueNumber);
        setCurrentTurn('human-operative');
    }
    
    function handleCardClick(word, colour) {
        if (wordState[word]) return; // already revealed
      
        // Reveal the word
        setWordState(prev => ({ ...prev, [word]: true }));
      
        if (colour === "blue") {
            setClueNumber(clueNumber - 1);
            const newBlues = blues + 1;
            setBlues(newBlues);

            if (newBlues === 9) {
                setWinner("You");
                setCurrentTurn("over");
                return;
            }
            if (clueNumber === 1){
                setClueNumber(1);
                setCurrentTurn("ai-spymaster");
          }
        } else if (colour === "red" || colour === "neutral") {
          // End turn

            if (colour === "red"){
                const newReds = reds + 1;
                setReds(newReds);

                if (newReds === 9) {
                    setWinner("AI");
                    setCurrentTurn("over");
                    return;
                }
            }

            setClueNumber(1);
            setCurrentTurn("ai-spymaster");
        }
        else {
            setWinner("AI");
            setCurrentTurn("over");
        }
    }
      
    
    if (currentTurn === "human-spymaster"){
        return(
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center px-4">
                <h1 className="text-5xl font-bold mb-10">Give your Operatives a clue</h1>
    
                <div className="grid grid-cols-5 gap-4 mb-10">
                    {Object.entries(wordMap).map(([word, colour], i) => (
                        <Card key={i} word={word} colour={colour} state={true}/>
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
                <h1 className="text-5xl font-bold mb-10">Select a word</h1>
    
                <div className="grid grid-cols-5 gap-4 mb-10">
                    {Object.entries(wordMap).map(([word, colour], i) => (
                        <Card
                        key={i}
                        word={word}
                        colour={colour}
                        state={wordState[word]}
                        onClick={() => handleCardClick(word, colour)}
                      />  
                    ))}
                </div>
                
                <p className="text-3xl font-bold mb-5">{"Clue: " + clue}</p>
                <p className="text-3xl font-bold mb-10">{"Number of words: " + clueNumber}</p>

            </div>
        );
    }

    else if (currentTurn === "ai-spymaster"){

        return(
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center px-4">
                <h1 className="text-5xl font-bold mb-10">The AI Spymaster is choosing a word...</h1>
    
                <div className="grid grid-cols-5 gap-4 mb-10">
                    {Object.entries(wordMap).map(([word, colour], i) => (
                        <Card
                        key={i}
                        word={word}
                        colour={colour}
                        state={wordState[word]}
                        onClick={null}
                      />  
                    ))}
                </div>

            </div>
        );
    }

    else if (currentTurn === "ai-operative"){
        return(
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center px-4">
                <h1 className="text-5xl font-bold mb-10">The AI Operative is guessing...</h1>
    
                <div className="grid grid-cols-5 gap-4 mb-10">
                    {Object.entries(wordMap).map(([word, colour], i) => (
                        <Card
                        key={i}
                        word={word}
                        colour={colour}
                        state={wordState[word]}
                        onClick={() => setCurrentTurn("human-spymaster")}
                      />  
                    ))}
                </div>
                
                <p className="text-3xl font-bold mb-5">{"Clue: " + clue}</p>
                <p className="text-3xl font-bold mb-10">{"Number of words: " + clueNumber}</p>

            </div>
        );
    }

    else if (currentTurn === "over"){
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center px-4">
              <h1 className="text-7xl font-bold mb-5">{winner + " wins!"}</h1>
                      
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleMenuClick}
                  className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold"
                >
                  Return to menu
                </button>
              </div>
            </div>
        );
    }

    //print current turn if error
    return <div>{currentTurn}</div>;
}