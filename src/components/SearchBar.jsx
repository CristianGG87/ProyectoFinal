import { useState } from 'react';

const SearchBar = ({ keywordNews }) => {
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleInputChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = () => {
        console.log(searchKeyword);
        keywordNews(searchKeyword);
        setSearchKeyword('');
    };

    return (
        <section className="search-bar">
            <input
                type="text"
                placeholder="Buscar noticias"
                onChange={handleInputChange}
                value={searchKeyword}
            />
            <button onClick={handleSearch}>Buscar</button>
        </section>
    );
};

export default SearchBar;
