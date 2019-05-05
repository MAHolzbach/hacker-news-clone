import React, { useContext } from "react";
import { StoryContext } from "../App/App";

const StoryItem = () => {
  const context = useContext(StoryContext);
  const storiesContent = context.stories.map(story => (
    <>
      <div className="stories__title-wrapper">
        <strong className="stories__score">{story.score}</strong>
        <a href={story.url}>
          <h3>{story.title}</h3>
        </a>
      </div>
      <p className="stories__poster">Posted by: {story.by}</p>
    </>
  ));
  return <div className="story-div">{storiesContent}</div>;
};

export default StoryItem;
