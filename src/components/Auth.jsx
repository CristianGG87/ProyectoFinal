import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Auth = () => {
    const { logout, user } = useContext(AuthContext);
    console.log(user);
    return user ? (
        <p>
            El usuario
            <Link to={`/users/${user.user.id}`}>{user.user.userName}</Link>
            está conectado{' '}
            <button onClick={() => logout()}>Cerrar sesión </button>
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
