import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleInputChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchKeyword);
        setSearchKeyword('');
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Buscar noticias"
                onChange={handleInputChange}
                value={searchKeyword}
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};

export default SearchBar;
////
