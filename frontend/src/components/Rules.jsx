import { useNavigate } from 'react-router-dom';

export default function Rules() {

    const navigate = useNavigate();

    const handleMenuClick = () => {
        navigate('/menu');
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center px-6 py-10">
            <h1 className="text-5xl font-bold mb-7">Rules</h1>

            <div className="max-w-2xl text-left text-white space-y-6 text-lg">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Objective</h2>
                    <p>Guess all your team's secret words before the other team does — with the help of one-word clues from your Spymaster.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Game Setup</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>A 5x5 grid of <strong>25 words</strong> is laid out.</li>
                        <li>Each word is secretly assigned a color:
                            <ul className="list-none pl-4">
                                <li>🟥 Red Team</li>
                                <li>🟦 Blue Team</li>
                                <li>⬜ Neutral</li>
                                <li>⬛ Assassin (don’t pick this one)</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Roles</h2>
                    <p><strong>Spymaster:</strong> Knows which words belong to each team.<br />
                       <strong>Operatives:</strong> Try to guess the correct words based on clues.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Clue Rules</h2>
                    <p>The Spymaster gives a <strong>one-word clue</strong> and a <strong>number</strong> of related words.</p>
                    <p><em>Example:</em> <code>"Fruit 2"</code> → Two of your words are related to "Fruit".</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Guessing</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>You can guess up to the number given +1. So for <code>"Fruit 2"</code>, guess up to 3 words.</li>
                        <li>Click a word to guess. The result will be:
                            <ul className="list-disc list-inside pl-4">
                                <li>Your team’s word</li>
                                <li>Neutral word</li>
                                <li>Opponent’s word</li>
                                <li>Assassin (game over)</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Winning</h2>
                    <p>First team to guess all of their words wins. If someone picks the Assassin, they instantly lose.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">AI Twist</h2>
                    <p>Your opponent is an AI. The AI Spymaster uses word meanings to connect ideas and give a word to its AI Operative.</p>
                </div>
            </div>

            <div className="mt-10">
                <button
                    type="button"
                    onClick={handleMenuClick}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold transition duration-300"
                >
                    Return to Menu
                </button>
            </div>
        </div>
    );
}
