import env from "../hooks/backendEnv";
export const getAllNewsService = async (data) => {
  const path = new URL(`${env}/news`);
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  if (data?.topic) {
    path.searchParams.append("topic", data.topic);
    searchParams.set("topic", data.topic);
    window.history.pushState(
      {},
      "",
      `${url.pathname}?${searchParams.toString()}`
    );
  }
  if (data?.keyword) {
    path.searchParams.append("keyword", data.keyword);
    searchParams.set("keyword", data.keyword);
    window.history.pushState(
      {},
      "",
      `${url.pathname}?${searchParams.toString()}`
    );
  }
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(json.message);
  }
  const json = await response.json();
  return json.data;
};
export const getUserNewsService = async (id) => {
  const response = await fetch(`${env}/users/${id}/news`);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};
export const getSingleNewsService = async (id) => {
  const response = await fetch(`${env}/news/${id}`);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data.news;
};
export const registerUserService = async ({ userName, email, password }) => {
  const response = await fetch(`${env}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, email, password }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
};
export const loginUserService = async ({ email, password }) => {
  const response = await fetch(`${env}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data.token;
};
export const getMyUserDataService = async ({ token }) => {
  const response = await fetch(`${env}/users`, {
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};
export const getUserDataService = async (id) => {
  const response = await fetch(`${env}/users/${id}`);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};
export const sendNewsService = async (data, token) => {
  const response = await fetch(`${env}/news`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data.news;
};
export const deleteNewsService = async (id, token) => {
  const response = await fetch(`${env}/news/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
};
export const voteNewsService = async (id, token) => {
  const response = await fetch(`${env}/news/${id}/votes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
};
export const updateEmailService = async (token, oldEmail, newEmail) => {
  const response = await fetch(`${env}/users/email`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ oldEmail, newEmail }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};
export const editUserNameService = async (token, userName) => {
  const response = await fetch(`${env}/users/name`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ userName }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};
export const editUserBioService = async (token, biography) => {
  const response = await fetch(`${env}/users/biography`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ biography }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};
export const editUserPhotoService = async (token, photo) => {
  const response = await fetch(`${env}/users/photo`, {
    method: "PUT",
    headers: {
      Authorization: token,
    },
    body: photo,
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};
export const changePasswordService = async (
  token,
  currentPassword,
  newPassword
) => {
  const response = await fetch(`${env}/users/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      oldPass: currentPassword,
      newPass: newPassword,
    }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};
export const sendVoteService = async (newsId, value, token) => {
  try {
    const response = await fetch(`${env}/news/${newsId}/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ value }),
    });
    if (!response.ok) {
      throw new Error("No puedes votar tu propia noticia");
    }
    const responseData = await response.json();
    return {
      vPos: responseData.data.vPos,
      vNeg: responseData.data.vNeg,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
export const updateNewsService = async (newsId, editedNews, token) => {
  try {
    const formData = new FormData();
    formData.append("title", editedNews.title);
    formData.append("intro", editedNews.intro);
    formData.append("text", editedNews.text);
    const response = await fetch(`${env}/news/${newsId}`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la noticia.");
    }
    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const updateNewsPhotoService = async (newsId, image, token) => {
  try {
    if (!image) {
      throw new Error("No se ha seleccionado una imagen.");
    }
    const formData = new FormData();
    formData.append("photo", image);
    const response = await fetch(`${env}/news/${newsId}/photos`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la foto de la noticia.");
    }
    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
