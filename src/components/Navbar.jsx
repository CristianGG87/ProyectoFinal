import './NavBar.css';

function NavBar({ onTopicClick, onShowAllNews, onSortByVotes }) {
    return (
        <section className="navBar">
            <button onClick={onShowAllNews}>Volver al inicio</button>
            <button onClick={onSortByVotes}>🔥Tendencia🔥</button>
            <button onClick={() => onTopicClick('deportes')}>
                ⚽ Deportes
            </button>
            <button onClick={() => onTopicClick('cultura')}>🎨 Cultura</button>
            <button onClick={() => onTopicClick('actualidad')}>
                🌎 Actualidad
            </button>
            <button onClick={() => onTopicClick('politica')}>
                🏦 Política
            </button>
            <button onClick={() => onTopicClick('ciencia')}>🔬 Ciencia</button>
        </section>
    );
}

export default NavBar;
