import { useNavigate } from 'react-router-dom';
import Card from "./Card.jsx";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Game() {
    const navigate = useNavigate();
    const [gameState, setGameState] = useState(null);
    const [clue, setClue] = useState('');
    const [aiGuesses, setAiGuesses] = useState([]);
    const [guessIndex, setGuessIndex] = useState(0);
    const [processing, setProcessing] = useState(false);

    // Initialize game state
    useEffect(() => {
        const fetchNewGame = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/game/get_new_game");
                setGameState(response.data);
            } catch (error) {
                console.error("Failed to initialize game:", error);
            }
        };
        fetchNewGame();
    }, []);

    // Handle AI Spymaster turn
    useEffect(() => {
        const fetchAiClue = async () => {
            if (!gameState || gameState.current_team_name !== 'red') return;

            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/game/get_ai_spymaster",
                    gameState
                );
                
                // Update game state with AI's clue
                const updatedState = {
                    ...gameState,
                    red_team: {
                        ...gameState.red_team,
                        spy_master: {
                            ...gameState.red_team.spy_master,
                            word: response.data.spymaster_word
                        },
                        operative: {
                            ...gameState.red_team.operative,
                            goes: response.data.goes
                        }
                    }
                };
                setGameState(updatedState);
            } catch (error) {
                console.error("AI Spymaster error:", error);
            }
        };

        fetchAiClue();
    }, [gameState?.current_team_name]);

    // Handle AI Operative guesses
    useEffect(() => {
        const processAiGuesses = async () => {
            if (!gameState || !processing) return;

            try {
                // Get current guess
                const guess = aiGuesses[guessIndex];
                
                // Update backend state
                const response = await axios.post(
                    "http://127.0.0.1:8000/game/get_ai_guesses",
                    {
                        game_state: gameState,
                        spymaster_word: gameState.red_team.spy_master.word,
                        goes: gameState.red_team.operative.goes
                    }
                );

                // Update frontend state
                const updatedWords = gameState.board_words.map(word => 
                    word.word === guess ? { ...word, used: true } : word
                );

                setGameState(prev => ({
                    ...prev,
                    board_words: updatedWords,
                    current_team_name: updatedWords.find(w => w.word === guess)?.role === 'red' 
                        ? 'red' 
                        : 'blue'
                }));

                // Process next guess or complete
                if (guessIndex < aiGuesses.length - 1) {
                    setGuessIndex(prev => prev + 1);
                } else {
                    setProcessing(false);
                    setGuessIndex(0);
                }
            } catch (error) {
                console.error("AI Operative error:", error);
            }
        };

        processAiGuesses();
    }, [processing, guessIndex]);

    // Handle card clicks for human operative
    const handleCardClick = async (word) => {
        if (!gameState || gameState.current_team_name !== 'blue') return;

        try {
            // Update backend state
            const response = await axios.post(
                "http://127.0.0.1:8000/game/update",
                {
                    ...gameState,
                    guess: word
                }
            );

            // Update frontend state
            setGameState(response.data);
        } catch (error) {
            console.error("Card click error:", error);
        }
    };

    // Render game board
    const renderBoard = () => {
        if (!gameState) return null;

        return (
            <div className="grid grid-cols-5 gap-4 mb-10">
                {gameState.board_words.map((wordObj, i) => (
                    <Card
                        key={i}
                        word={wordObj.word}
                        colour={wordObj.role}
                        state={wordObj.used}
                        onClick={() => handleCardClick(wordObj.word)}
                    />
                ))}
            </div>
        );
    };

    // Render UI based on game state
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center px-4">
            {gameState?.winner ? (
                <div className="text-center">
                    <h1 className="text-7xl font-bold mb-10">{gameState.winner} wins!</h1>
                    <button
                        onClick={() => navigate('/menu')}
                        className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl text-xl font-bold"
                    >
                        Return to Menu
                    </button>
                </div>
            ) : (
                <>
                    <h1 className="text-5xl font-bold mb-10">
                        {gameState?.current_team_name === 'blue' 
                            ? "Your Turn" 
                            : "AI's Turn"}
                    </h1>
                    
                    {renderBoard()}

                    {gameState?.current_team_name === 'blue' && (
                        <div className="flex flex-col items-center gap-4">
                            <input
                                type="text"
                                value={clue}
                                onChange={(e) => setClue(e.target.value)}
                                placeholder="Enter your clue"
                                className="px-4 py-2 rounded-md border border-gray-300 text-black w-64"
                            />
                            <button
                                onClick={() => setProcessing(true)}
                                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-xl font-bold"
                            >
                                Submit Clue
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}