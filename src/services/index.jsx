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
