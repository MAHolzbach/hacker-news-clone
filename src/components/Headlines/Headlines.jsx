import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { StoryContext } from "../App/App";
import StoryItem from "../StoryItem/StoryItem";

const Headlines = () => {
  const context = useContext(StoryContext);
  const storyDisplayNumbers = context.storyDisplayNumbers;
  const showNextThirtyStories = context.showNextThirtyStories;
  const currentPage = context.currentPage;
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
    />
  ));

  useEffect(() => {
    console.log(context.stories);
  }, []);

  return (
    <>
      {storiesContent}
      {/* <NavLink to={`/page=${currentPage + 1}`}>More</NavLink> */}
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
