import { News } from './News';
export const NewsList = ({ news, setNews, removeNews }) => {
    if (news && news.news && news.news.length > 0) {
        return (
            <ul>
                {news.news.map((news) => (
                    <li key={news.id}>
                        <News
                            news={news}
                            setNews={setNews}
                            removeNews={removeNews}
                        />
                    </li>
                ))}
            </ul>
        );
    } else {
        return <p>Aun no hay noticias...</p>;
    }
};
