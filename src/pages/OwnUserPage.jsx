import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ErrorMessage } from '../components/ErrorMessage';
import {
    updateEmailService,
    getMyUserDataService,
    editUserBioService,
    editUserPhotoService,
    changePasswordService,
} from '../services';

import useNews from '../hooks/useNews';
import UserNewsList from '../components/UserNewsList';

export const OwnUserPage = () => {
    const { token } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const env = import.meta.env.VITE_BACKEND;
    const [editEmail, setEditEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [oldEmail, setOldEmail] = useState('');
    const [biography, setBiography] = useState('');
    const [isEditingBiography, setIsEditingBiography] = useState(false); // Estado para controlar la edición de la biografía
    const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
    const [isEditingPhoto, setIsEditingPhoto] = useState(false); // Estado para controlar la edición de la foto
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [editPassword, setEditPassword] = useState(false);

    const { removeNews } = useNews();

    const handleSavePassword = async () => {
        try {
            await changePasswordService(token, currentPassword, newPassword);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setEditPassword(false);
        } catch (error) {
            console.error(error);
            setError('Error al cambiar la contraseña');
        }
    };

    const handleEditPassword = () => {
        setEditPassword(true);
    };

    const handleDelete = async (news) => {
        try {
            await removeNews(news, token);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getMyUserDataService({ token });
                const sortedNews = userData.user.news.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setUser({
                    ...userData,
                    user: { ...userData.user, news: sortedNews },
                });
                setBiography(userData.user.biography);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Error al obtener el perfil del usuario');
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    if (loading) {
        return <p>Cargando los datos del usuario...</p>;
    }

    const handleEditEmail = () => {
        setEditEmail(true);
    };

    // Función para activar la edición de la biografía
    const handleEditBiography = () => {
        setIsEditingBiography(true);
    };
    const handleSaveEmail = async () => {
        try {
            await updateEmailService(token, oldEmail, newEmail);
            setUser({ ...user, user: { ...user.user, email: newEmail } });
            setEditEmail(false);
        } catch (error) {
            console.error(error);
            setError('Error al actualizar el correo electrónico');
        }
    };

    const handleSaveBiography = async () => {
        try {
            await editUserBioService(token, biography);
            setUser({ ...user, user: { ...user.user, biography: biography } });
            setIsEditingBiography(false);
        } catch (error) {
            console.error(error);
            setError('Error al actualizar la biografía');
        }
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };
    const handleUploadImage = async () => {
        try {
            if (selectedImage) {
                const formData = new FormData();
                formData.append('photo', selectedImage);

                await editUserPhotoService(token, formData);

                // Actualiza el estado del usuario con la nueva foto
                const updatedUserData = await getMyUserDataService({ token });
                setUser(updatedUserData);

                // Reinicia el estado de la imagen seleccionada y la edición de la foto
                setSelectedImage(null);
                setIsEditingPhoto(false);
            }
        } catch (error) {
            console.error(error);
            setError('Error al actualizar la foto del usuario');
        }
    };

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (user) {
        return (
            <section>
                <h1>Perfil Propio</h1>
                <p>Nombre: {user.user.userName}</p>
                {editEmail ? (
                    <div>
                        <input
                            type="email"
                            placeholder="Antiguo correo electrónico"
                            value={oldEmail}
                            onChange={(e) => setOldEmail(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Nuevo correo electrónico"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <button onClick={handleSaveEmail}>Guardar</button>
                    </div>
                ) : (
                    <p>Correo electrónico: {user.user.email}</p>
                )}
                <button onClick={handleEditEmail}>Editar Email</button>


                {editPassword ? (
                    <div>
                        <input
                            type="password"
                            placeholder="Contraseña actual"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirmar nueva contraseña"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                        <button onClick={handleSavePassword}>Guardar Contraseña</button>
                    </div>
                ) : (
                    <p>Contraseña: {user.user.password}</p>
                )}
                <button onClick={handleEditPassword}>Cambiar Contraseña</button>
                
                {isEditingBiography ? (
                    <div>
                        <textarea
                            placeholder="Nueva biografía del usuario"
                            value={biography}
                            onChange={(e) => setBiography(e.target.value)}
                        />
                        <button onClick={handleSaveBiography}>
                            Guardar Biografía
                        </button>
                    </div>
                ) : (
                    <p>Biografía: {user.user.biography}</p>
                )}
                {isEditingBiography ? null : (
                    <button onClick={handleEditBiography}>
                        Editar Biografía
                    </button>
                )}

                <div>
                    {selectedImage ? (
                        <figure>
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Preview"
                                style={{ width: '100px' }}
                            />
                        </figure>
                    ) : user.user.photo ? (
                        <img
                            src={`${env}/${user.user.photo}`}
                            alt={user.user.userName}
                        />
                    ) : null}
                    <button
                        onClick={() => {
                            document.getElementById('imageUpload').click();
                        }}
                    >
                        Editar Foto
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        id="imageUpload"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    {selectedImage ? (
                        <button onClick={handleUploadImage}>
                            Guardar Foto
                        </button>
                    ) : null}
                </div>

                <p>
                    {' '}
                    Registrado el:
                    {new Date(user.user.createdAt).toLocaleDateString()}
                </p>

                <h2>Mis Noticias:</h2>
                <UserNewsList
                    news={user.user.news}
                    setUser={setUser}
                    env={env}
                    handleDelete={handleDelete}
                    error={error}
                />
            </section>
        );
    }

    return null;
};
///////////////////////////////////////////////////////////////////////////////////
