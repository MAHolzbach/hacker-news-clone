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
      time={story.time}
      storyNumber={storyDisplayNumbers[index]}
      score={story.score}
      url={story.url}
      title={story.title}
      by={story.by}
      commentCount={story.descendants}
      key={story.id}
    />
  ));

  return (
    <div className="content__wrapper">
      {storiesContent}
      <p
        className="headlines__more-link"
        onClick={() => {
          showNextThirtyStories();
        }}
      >
        More
      </p>
    </div>
  );
};

export default Headlines;
