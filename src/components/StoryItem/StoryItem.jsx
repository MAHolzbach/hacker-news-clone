import React, { useContext } from "react";
import { StoryContext } from "../App/App";

const StoryItem = () => {
  const stories = useContext(StoryContext);
  return <div>{stories}</div>;
};

export default StoryItem;
