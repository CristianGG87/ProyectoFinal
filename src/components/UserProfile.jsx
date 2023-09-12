import { Link, useParams } from 'react-router-dom';

export const UserProfile = () => {
    const { email } = useParams();
    // Aquí puedes usar el correo electrónico para crear un enlace a la página del usuario
    // y hacer una solicitud al backend para obtener más información sobre el usuario si es necesario.

    return (
        <div>
            <p>Perfil del usuario con correo electrónico: {email}</p>
            {/* Agrega un enlace a la página del usuario utilizando el correo electrónico */}
            <Link to={`/users/${email}`}>Ver perfil</Link>
        </div>
    );
};
