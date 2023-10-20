import "./OwnUserPage.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ErrorMessage } from "../components/ErrorMessage";
import {
  updateEmailService,
  getMyUserDataService,
  editUserBioService,
  editUserPhotoService,
  changePasswordService,
  editUserNameService,
} from "../services";
import useNews from "../hooks/useNews";
import UserNewsList from "../components/UserNewsList";
import Header from "../components/Header";
import { IconEdit } from "@tabler/icons-react";
export const OwnUserPage = () => {
  const env = import.meta.env.VITE_BACKEND;
  const { token, updateUserName } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState("");
  const [biography, setBiography] = useState(user?.user.biography || "");
  const [isEditingBiography, setIsEditingBiography] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);

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
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);
  const { removeNews } = useNews();
  const handleDelete = async (news) => {
    try {
      await removeNews(news, token);
    } catch (error) {
      setError(error.message);
    }
  };
  if (loading) {
    return <p>Cargando los datos del usuario...</p>;
  }
  const handleSavePassword = async () => {
    try {
      await changePasswordService(token, currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsEditingPassword(false);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };
  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };
  const handleEditBiography = () => {
    setIsEditingBiography(true);
  };
  const handleEditUserName = () => {
    setIsEditingUserName(true);
  };
  const handleSaveEmail = async () => {
    try {
      await updateEmailService(token, oldEmail, newEmail);
      setUser({ ...user, user: { ...user.user, email: newEmail } });
      setIsEditingEmail(false);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleSaveName = async () => {
    try {
      await editUserNameService(token, userName);
      setUser({ ...user, user: { ...user.user, userName: userName } });
      updateUserName(userName);
      setIsEditingUserName(false);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleSaveBiography = async () => {
    try {
      await editUserBioService(token, biography);
      setUser({ ...user, user: { ...user.user, biography: biography } });
      setIsEditingBiography(false);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  const handleUploadImage = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("photo", selectedImage);
        await editUserPhotoService(token, formData);
        const updatedUserData = await getMyUserDataService({ token });
        setUser(updatedUserData);
        setSelectedImage(null);
        setIsEditingPhoto(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const cancelEditPhoto = () => {
    setIsEditingPhoto(false);
    setSelectedImage(null);
  };
  if (error) {
    return <ErrorMessage message={error} />;
  }
  if (user) {
    return (
      <>
        <Header />
        <main>
          <section className="user-data">
            <section className="user-image">
              {selectedImage ? (
                <figure>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    style={{ width: "200px" }}
                  />
                </figure>
              ) : user.user.photo ? (
                <img
                  src={`${env}/${user.user.photo}`}
                  alt={user.user.userName}
                />
              ) : (
                <img
                  src="/user.svg"
                  alt="Imagen por defecto"
                  style={{ width: "200px" }}
                />
              )}
              {isEditingPhoto ? (
                <div>
                  <button onClick={handleUploadImage}>Guardar Foto</button>
                  <button onClick={() => cancelEditPhoto()}>Cancelar</button>
                </div>
              ) : (
                <div>
                  <button
                    className="edit"
                    onClick={() => {
                      document.getElementById("imageUpload").click();
                      setIsEditingPhoto(true);
                    }}
                  >
                    &#9998;
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </section>
            <section className="user-name">
              {isEditingUserName ? (
                <div>
                  <input
                    placeholder="Nombre de usuario"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <button onClick={handleSaveName}>Guardar nombre</button>
                  <button onClick={() => setIsEditingUserName(false)}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <div>
                  <h2>
                    {user.user.userName}{" "}
                    <button className="edit" onClick={handleEditUserName}>
                      &#9998;
                    </button>
                  </h2>
                </div>
              )}
            </section>
            <section>
              {isEditingBiography ? (
                <div>
                  <input
                    placeholder="Nueva biografía del usuario"
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                  />
                  <button onClick={handleSaveBiography}>
                    Guardar Biografía
                  </button>
                  <button onClick={() => setIsEditingBiography(false)}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <p>
                  Biografía: {user.user.biography}{" "}
                  <button className="edit" onClick={handleEditBiography}>
                    &#9998;
                  </button>
                </p>
              )}
            </section>

            <section className="edit-email">
              {isEditingEmail ? (
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
                  <button onClick={() => setIsEditingEmail(false)}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <p>
                  {user.user.email}{" "}
                  <button className="edit" onClick={handleEditEmail}>
                    {" "}
                    &#9998;
                  </button>
                </p>
              )}
            </section>
            <section>
              {isEditingPassword ? (
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
                  <button onClick={handleSavePassword}>Guardar</button>
                  <button onClick={() => setIsEditingPassword(false)}>
                    Cancelar
                  </button>
                </div>
              ) : null}
            </section>
            <section>
              {!isEditingPassword && (
                <button
                  className="change-password"
                  onClick={handleEditPassword}
                >
                  Cambiar Contraseña
                </button>
              )}
            </section>

            <p>
              Registrado el:{" "}
              {new Date(user.user.createdAt).toLocaleDateString()}
            </p>
          </section>
          <section className="own-news">
            <h2>Mis Noticias:</h2>
            <UserNewsList
              news={user.user.news}
              setUser={setUser}
              env={env}
              handleDelete={handleDelete}
              error={error}
              removeNews={removeNews}
            />
          </section>
        </main>
      </>
    );
  }
  return null;
};
