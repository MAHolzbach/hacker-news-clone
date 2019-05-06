import React, { useContext } from "react";
import { StoryContext } from "../App/App";
import StoryItem from "../StoryItem/StoryItem";

const Headlines = () => {
  const context = useContext(StoryContext);
  const storiesContent = context.stories.map(story => (
    <StoryItem
      key={story.id}
      score={story.score}
      url={story.url}
      title={story.title}
      by={story.by}
    />
  ));
  return <>{storiesContent}</>;
};

export default Headlines;
