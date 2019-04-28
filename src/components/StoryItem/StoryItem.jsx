import React, { useState, useEffect, useContext } from "react";
import { StoryContext } from "../App/App";

const StoryItem = () => {
  const context = useContext(StoryContext);
  const stories = context.stories.map(story => <h3>{story.title}</h3>);
  return <>{stories}</>;
};

export default StoryItem;
