import React from "react";
import { useData } from "./Utilities";

export const SearchForm = () => {
  const [{ query }, dispatch] = useData();

  const handleSearch = (e) => {
    dispatch({ type: "HANDLE_SEARCH", payload: e.target.value });
  };

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h2>search coder news</h2>
      <input
        type="text"
        className="form-input"
        value={query}
        onChange={handleSearch}
      />
    </form>
  );
};
