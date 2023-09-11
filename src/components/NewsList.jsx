import { OneNews } from './News';
export const NewsList = ({ news, removeNews }) => {
    return news.news.length ? (
        <ul>
            {news.news.map((oneNews) => (
                <li key={oneNews.id}>
                    <OneNews oneNews={oneNews} removeNews={removeNews} />
                </li>
            ))}
        </ul>
    ) : (
        <p>Aun no hay noticias...</p>
    );
};
