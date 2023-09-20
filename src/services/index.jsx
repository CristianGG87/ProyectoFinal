export const getAllNewsService = async () => {
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/news`);
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};

export const getUserNewsService = async (id) => {
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/users/${id}/news`);
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};

export const getSingleNewsService = async (id) => {
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/news/${id}`);
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data.news;
};

export const registerUserService = async ({ userName, email, password }) => {
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
};

export const loginUserService = async ({ email, password }) => {
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
    const env = import.meta.env.VITE_BACKEND;
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
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/users/${id}`);

    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};

export const sendNewsService = async (data, token) => {
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/news`, {
        method: 'POST',
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
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/news/${id}`, {
        method: 'DELETE',
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
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/news/${id}/votes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
};

export const updateEmailService = async (token, oldEmail, newEmail) => {
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/users/email`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
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

export const editUserBioService = async (token, biography) => {
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/users/biography`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
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
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/users/photo`, {
        method: 'PUT',
        headers: {
            Authorization: token,
        },
        body: photo, // Asegúrate de enviar los datos de la imagen adecuadamente
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
};

export const changePasswordService = async (token, currentPassword, newPassword) => {
    const env = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${env}/users/password`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
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