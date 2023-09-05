export const getAllNewsService = async () => {
  const response = await fetch("http://localhost:8000/news");
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
