import { Link } from 'react-router-dom';

export const Auth = () => {
    return (
        <ul>
            <li>
                <Link to="/register">Regisrtro</Link>
            </li>
            <li>
                <Link to="/login">Entrar</Link>
            </li>
        </ul>
    );
};
