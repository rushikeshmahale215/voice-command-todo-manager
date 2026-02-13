import { useState } from "react";
import "./Searchbar.css";

const SearchBar = ({ onSearch, onClear }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value);
  };

  const handleClear = () => {
    setValue("");
    onClear();
  };

  
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search todos..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="search-input"
      />

      <button type="submit" className="search-btn primary">
        Search
      </button>

      <button
        type="button"
        onClick={handleClear}
        className="search-btn secondary"
      >
        Clear
      </button>
    </form>
  );
};

export default SearchBar;
