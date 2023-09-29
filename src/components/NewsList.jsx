import { useContext, useEffect, useState } from 'react';
import NavBar from './Navbar';
import { News } from './News';
import './NewsList.css';
import { AuthContext } from '../context/AuthContext';
import { CreateNews } from './CreateNews';
import Acordeon from './Acordeon';
export const NewsList = ({
    news,
    setNews,
    removeNews,
    addNews,
    topicNews,
    hotNews,
    showAllNews,
}) => {
    const { user } = useContext(AuthContext);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <main className="news-container">
            <section className="nav-bar-normal">
                {windowWidth > 768 ? (
                    <NavBar
                        topicNews={topicNews}
                        hotNews={hotNews}
                        onShowAllNews={showAllNews}
                        className="hidden-on-mobile"
                    />
                ) : null}
            </section>
            <section className="news-list">
                <div className="mobile-buttons">
                    <section className="nav-bar-mobile">
                        {windowWidth <= 768 ? (
                            <section>
                                <Acordeon>
                                    <NavBar
                                        topicNews={topicNews}
                                        hotNews={hotNews}
                                        onShowAllNews={showAllNews}
                                    />
                                </Acordeon>
                            </section>
                        ) : null}

                        {user ? <CreateNews addNews={addNews} /> : null}
                    </section>
                </div>
                {news.news.length > 0 ? (
                    <ul>
                        {news.news.map((newsItem) => (
                            <li key={newsItem.id} className="news-item">
                                <News
                                    news={newsItem}
                                    setNews={setNews}
                                    removeNews={removeNews}
                                    showAllNews={showAllNews}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <>
                        <p>
                            {showAllNews
                                ? 'No hay noticias.'
                                : 'No hay noticias para este tema.'}
                        </p>
                    </>
                )}
            </section>
        </main>
    );
};
