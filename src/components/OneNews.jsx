export const OneNews = ({ news }) => {
    console.log({ news });
    return (
        <article>
            <h2>{news.title}</h2>
            <h3>{news.intro}</h3>
            <p>{news.text}</p>
            {news.photo ? (
                <img
                    src={`http://localhost:8000/${news.photo}`}
                    alt={news.title}
                />
            ) : null}
            <p>
                Autor: {news.userName} el {new Date(news.date).toLocaleString()}
            </p>
        </article>
    );
};
