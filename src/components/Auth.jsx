import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';
import { IconPower } from '@tabler/icons-react';
export const Auth = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return user ? (
        <>
            <p>
                ¡Hola, <Link to={`/users/`}>{user.user.userName}</Link>!
            </p>
            <button className="cerrarSesion" onClick={handleLogout}>
                <IconPower />
            </button>
        </>
    ) : (
        <ul>
            <li>
                <Link to="/register">Registro</Link>
            </li>
            <li>
                <Link to="/login">Entrar</Link>
            </li>
        </ul>
    );
};
