import React, { useContext } from "react";
import { StoryContext } from "../App/App";

const SingleStory = () => {
  const context = useContext(StoryContext);
  const currentStory = context.storyId;

  return (
    <div className="content__wrapper">
      <h1>Here be yer story: {currentStory}.</h1>
    </div>
  );
};

export default SingleStory;
