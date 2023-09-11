import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { ErrorMessage } from "../components/ErrorMessage";
import { UserNews } from "../components/UserNews";

export const UserPage = () => {
    const { id } = useParams();
    const {user, loading, error} = useUser(id);

    if(loading) return <p>Cargando los datos del usuario...</p>
    if(error) return <ErrorMessage message={error}/>
    return (
        <section>
            <h1> Datos del perfil </h1>
            <p>Nombre: {user.userName}</p>
            <p>Correo electronico:{user.email}</p>
            <p>Cambiar contraseña (aqui ira la funcion para cambiar la contraseña)</p>
            <p>Biografia:{user.biography}</p>
            <p>Foto usuario (aqui pondremos la foto del usuario)</p>
            <p>Registrado el:{new Date(user.createdAt).toLocaleDateString()}</p> 
            <UserNews id={user.userId} />       
        </section>
    );
};