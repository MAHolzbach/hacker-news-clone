import React, { useContext } from "react";
import { StoryContext } from "../App/App";
import Headlines from "../Headlines/Headlines";
import SingleStory from "../SingleStory/SingleStory";

const ContentView = () => {
  const context = useContext(StoryContext);
  const currentView = context.currentView;

  return <>{currentView === "headlines" ? <Headlines /> : <SingleStory />}</>;
};

export default ContentView;