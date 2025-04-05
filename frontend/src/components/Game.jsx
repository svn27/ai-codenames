import { useNavigate } from 'react-router-dom';

export default function Game() {

    const navigate = useNavigate();
    const desc = "Game page";

    const handleMenuClick = () => {
        navigate('/menu'); // navigates to /menu route
    };

    return(
        <>
            <h1>Game</h1>
            <p>{desc}</p>
            <button type="button" onClick={handleMenuClick}>Back to Menu</button>
        </>
    )
}