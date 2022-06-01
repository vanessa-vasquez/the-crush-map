import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js'; 

export default function Identifier(props) {
    const currentUserUni = props.userUni; 
    const { logout } = useAuth(); 
    const navigate = useNavigate(); 

    const handleLogOut = async (e) => {
        try {
            await logout()
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="user">
            <span className='user-info'>You: {currentUserUni}</span>
            <button id="log-out-btn" onClick={handleLogOut}> Log Out </button>
        </div>
    )
}