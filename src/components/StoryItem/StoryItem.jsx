import React, { useContext } from "react";
import { StoryContext } from "../App/App";

const StoryItem = props => {
  const context = useContext(StoryContext);
  const setCurrentViewAndStoryId = context.setCurrentViewAndStoryId;
  return (
    <div
      onClick={() => {
        setCurrentViewAndStoryId("story", props.id);
      }}
      className="story"
    >
      <div className="story__title-wrapper">
        <p className="story__index">{props.index}.</p>
        <a className="story__link" href={props.url}>
          <p>{props.title}</p>
        </a>
      </div>
      <p className="story__info">
        {props.score} points by {props.by} 2 hours ago | hide |{" "}
        {props.commentCount > 0 ? props.commentCount : 0} comments
      </p>
    </div>
  );
};

export default StoryItem;
