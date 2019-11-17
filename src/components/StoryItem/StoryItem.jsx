import React, { useContext } from "react";
import { StoryContext } from "../App/App";
import { Link } from "react-router-dom";

const StoryItem = props => {
  const context = useContext(StoryContext);
  const setCurrentStoryId = context.setCurrentStoryId;

  return (
    <div
      onClick={() => {
        setCurrentStoryId(props.id);
      }}
      className="story"
    >
      <div className="story__title-wrapper">
        <p className="story__index">{props.storyNumber}.</p>
        <a className="story__link" href={props.url}>
          <p>{props.title}</p>
        </a>
      </div>
      <p className="story__info">
        {props.score} points by {props.by} 2 hours ago | hide |{" "}
        <Link to={`/${props.id}`} className="story__comments-link">
          {props.commentCount > 0 ? props.commentCount : 0} comments
        </Link>
      </p>
    </div>
  );
};

export default StoryItem;
