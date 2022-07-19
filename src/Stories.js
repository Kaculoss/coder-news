import React from "react";
import { useData } from "./Utilities";

export const Stories = () => {
  const [{ hits, isLoading }] = useData();

  const removeStory = (id) => {
    dispatchEvent({ type: "REMOVE_STORY", payload: id });
  };

  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <div className="stories">
      {hits.map((story) => {
        const { objectID, title, num_comments, url, points, author } = story;
        return (
          <article key={objectID} className="story">
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} points by <span>{author} | </span> {num_comments}{" "}
              comments
            </p>
            <div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-link"
              >
                read more
              </a>
            </div>
            <button
              className="remove-btn"
              onClick={() => removeStory(objectID)}
            >
              remove
            </button>
          </article>
        );
      })}
    </div>
  );
};
