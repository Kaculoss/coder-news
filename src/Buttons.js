import React from "react";
import { useData } from "./Utilities";

export const Buttons = () => {
  const [{ isLoading, page, nbPages }, dispatch] = useData();

  const handlePage = (value) => {
    dispatch({ type: "HANDLE_PAGE", payload: value });
  };

  return (
    <div className="btn-container">
      <button disabled={isLoading} onClick={() => handlePage("dec")}>
        prev
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button disabled={isLoading} onClick={() => handlePage("inc")}>
        next
      </button>
    </div>
  );
};
