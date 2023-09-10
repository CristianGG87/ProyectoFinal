import { News } from './News';
export const NewsList = ({ news, removeNews }) => {
    if (news && news.news && news.news.length > 0) {
        return (
            <ul>
                {news.news.map((news) => (
                    <li key={news.id}>
                        <News news={news} removeNews={removeNews}/>
                    </li>
                ))}
            </ul>
        );
    } else {
        return <p>Aun no hay noticias...</p>;
    }
};
