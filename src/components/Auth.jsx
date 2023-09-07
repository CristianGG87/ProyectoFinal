import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
export const Auth = () => {
    const { logout, user } = useContext(AuthContext);
    return user ? (
        <p>
            El usuario {user.user.username} está conectado{' '}
            <button onClick={() => logout()}>Cerrar sesion</button>
        </p>
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
