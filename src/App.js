import { useCallback, useEffect } from "react";
import { Buttons } from "./Buttons";
import { SearchForm } from "./SearchForm";
import { Stories } from "./Stories";
import { useData } from "./Utilities";

function App() {
  const [{ query, page, api_endpoint }, dispatch] = useData();

  const url = `${api_endpoint}query=${query}&page=${page}`;

  const getStories = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const resp = await fetch(url);
      const data = await resp.json();

      dispatch({
        type: "SET_STORIES",
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (err) {
      console.log(err);
    }
  }, [url, dispatch]);

  useEffect(() => {
    getStories();
  }, [api_endpoint, query, page, getStories]);

  return (
    <>
      <SearchForm />
      <Buttons />
      <Stories />
    </>
  );
}

export default App;
