import { useNavigate } from 'react-router-dom';

export default function Rules() {

    const navigate = useNavigate();
    const desc = "Play Codenames against an AI";

    const handleMenuClick = () => {
        navigate('/menu'); // navigates to /menu route
    };

    return(
        <>
            <h1>Rules</h1>
            <p>{desc}</p>
            <button type="button" onClick={handleMenuClick}>Back to Menu</button>
        </>
    )
}