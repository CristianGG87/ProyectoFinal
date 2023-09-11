import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
  const { logout, user } = useContext(AuthContext);

  return user ? (
    <p>
<<<<<<< HEAD
      El usuario<Link to={`/users/${user.id}`}>{user.user.username}</Link>está conectado  <button onClick={() => logout()}>Cerrar sesión </button>
=======
      El usuario <Link to={`/users/${user.id}`}>{user.mail}</Link>
      {""} {user.user.username} está conectado{" "}
      <button onClick={() => logout()}>Cerrar sesión </button>
>>>>>>> 19acfb26b005a107a2380b5c2cd92645df16f6f9
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
