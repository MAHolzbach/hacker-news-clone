import React, { useContext } from "react";
import { StoryContext } from "../App/App";
import StoryItem from "../StoryItem/StoryItem";

const Headlines = () => {
  const context = useContext(StoryContext);
  const storiesContent = context.stories.map((story, index) => (
    <StoryItem
      index={index + 1}
      id={story.id}
      score={story.score}
      url={story.url}
      title={story.title}
      by={story.by}
      commentCount={story.kids ? story.kids.length : 0}
    />
  ));
  return <>{storiesContent}</>;
};

export default Headlines;
