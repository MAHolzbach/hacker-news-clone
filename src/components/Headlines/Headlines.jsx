import React, { useContext } from "react";
import { StoryContext } from "../App/App";
import StoryItem from "../StoryItem/StoryItem";

const Headlines = () => {
  const context = useContext(StoryContext);
  const storyDisplayNumbers = context.storyDisplayNumbers;
  const showNextThirtyStories = context.showNextThirtyStories;
  const storiesContent = context.stories.map((story, index) => (
    <StoryItem
      index={index + 1}
      id={story.id}
      storyNumber={storyDisplayNumbers[index]}
      score={story.score}
      url={story.url}
      title={story.title}
      by={story.by}
      commentCount={story.kids ? story.kids.length : 0}
      key={story.id}
    />
  ));

  return (
    <>
      {storiesContent}
      <p
        className="headlines__more-link"
        onClick={() => {
          showNextThirtyStories();
        }}
      >
        More
      </p>
    </>
  );
};

export default Headlines;
