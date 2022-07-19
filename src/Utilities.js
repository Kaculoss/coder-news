import React, { createContext, useContext, useReducer } from "react";

const dataContext = createContext();

export const DataLayer = ({ initialState, reducer, children }) => {
  return (
    <dataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </dataContext.Provider>
  );
};

export const useData = () => useContext(dataContext);

export const initialState = {
  isLoading: true,
  hits: [],
  query: "javascript",
  page: 0,
  nbPages: 0,
  api_endpoint: "https://hn.algolia.com/api/v1/search?",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_SEARCH":
      return { ...state, query: action.payload, page: 0 };

    case "HANDLE_PAGE":
      if (action.payload === "inc") {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }
        return { ...state, page: nextPage };
      }
      if (action.payload === "dec") {
        let prevPage = state.page - 1;
        if (prevPage < 0) {
          prevPage = state.nbPages - 1;
        }
        return { ...state, page: prevPage };
      }
      break;

    case "REMOVE_STORY":
      return {
        ...state,
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      };

    case "SET_LOADING":
      return { ...state, isLoading: true };

    case "SET_STORIES":
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };

    default:
      return state;
  }
};
