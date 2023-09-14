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
    const url = 'http://localhost:8000/users/email';
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({ oldEmail, newEmail }),
    };
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${json.message}`);
    }
    return json;
};
