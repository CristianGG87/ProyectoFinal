import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Auth = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    console.log(user);
    return user ? (
        <>
            <p>
                El usuario<Link to={`/users/`}>{user.user.userName}</Link>
                está conectado
            </p>
            <button onClick={handleLogout}>Cerrar sesión</button>
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
