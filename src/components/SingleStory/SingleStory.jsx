import React, { useContext } from "react";
import { StoryContext } from "../App/App";

const SingleStory = () => {
  const context = useContext(StoryContext);
  const currentStory = context.storyId;

  return (
    <>
      <h1>Here be yer story: {currentStory}.</h1>
    </>
  );
};

export default SingleStory;
