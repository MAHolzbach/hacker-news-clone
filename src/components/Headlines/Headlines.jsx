import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoryContext } from "../App/App";
import StoryItem from "../StoryItem/StoryItem";

const Headlines = () => {
  const context = useContext(StoryContext);
  const currentPage = context.currentPage;
  const storyDisplayNumbers = context.storyDisplayNumbers;
  const setCurrentPage = context.setCurrentPage;
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
      <Link
        className="headlines__more-link"
        to={`/${currentPage + 1}`}
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        More
      </Link>
    </div>
  );
};

export default Headlines;
