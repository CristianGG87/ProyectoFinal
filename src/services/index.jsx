export const getAllNewsService = async () => {
    const response = await fetch('http://localhost:8000/news');
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};

export const getSingleNewsService = async (id) => {
    const response = await fetch(`http://localhost:8000/news/${id}`);
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data.news;
};

export const registerUserService = async ({ userName, email, password }) => {
    const response = await fetch(`http://localhost:8000/users/register`, {
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
    const response = await fetch(`http://localhost:8000/users/login`, {
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
    const response = await fetch('http://localhost:8000/users', {
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

export const sendNewsService = async ( data, token ) => {
    console.log(token);
    const response = await fetch('http://localhost:8000/news', {
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
    const response = await fetch(`http://localhost:8000/news/${id}`, {
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
