import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoryContext } from "../App/App";
import StoryItem from "../StoryItem/StoryItem";

const Headlines = () => {
  const context = useContext(StoryContext);
  const currentPage = context.currentPage;
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
    <div className="content__wrapper">
      {storiesContent}
      {/* <p
        className="headlines__more-link"
        onClick={() => {
          showNextThirtyStories();
        }}
        >
        More
      </p> */}
      <Link
        className="headlines__more-link"
        to={`/${currentPage + 1}`}
        onClick={() => {
          showNextThirtyStories();
        }}
      >
        More
      </Link>
    </div>
  );
};

export default Headlines;
