import React, { useContext } from "react";
import { StoryContext } from "../App/App";

const StoryItem = props => {
  const context = useContext(StoryContext);
  const setCurrentViewAndStoryId = context.setCurrentViewAndStoryId;
  return (
    <div
      onClick={() => {
        setCurrentViewAndStoryId("story", props.key);
      }}
      className="story"
    >
      <div className="story__title-wrapper">
        <strong className="story__score">{props.score}</strong>
        <a href={props.url}>
          <h3>{props.title}</h3>
        </a>
      </div>
      <p className="story__poster">Posted by: {props.by}</p>
    </div>
  );
};

export default StoryItem;
