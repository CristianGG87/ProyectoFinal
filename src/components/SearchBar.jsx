import { useState } from "react";
const SearchBar = ({ keywordNews }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const handleSearch = () => {
    keywordNews(searchKeyword);
    setSearchKeyword("");
  };
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }
  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder="Buscar noticias"
        onChange={handleInputChange}
        value={searchKeyword}
        onKeyPress={handleKeyPress}
      />
    </section>
  );
};
export default SearchBar;
