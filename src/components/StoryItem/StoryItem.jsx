import React, { useState, useEffect, useContext } from "react";
import { StoryContext } from "../App/App";

const StoryItem = () => {
  const stories = useContext(StoryContext);
  const [localStoryState, setLocalStoryState] = useState([]);
  console.log("STORIES CONTEXT:", stories);
  const renderHeadlines = () => {
    console.log("STORIES STATE:", localStoryState);
    console.log("HERE");
    localStoryState.map(story => {
      console.log("STORY:", story);
      return <h2 key={story.id}>{story.title}</h2>;
    });
  };
  useEffect(() => {
    setLocalStoryState(stories);
  }, [stories]);
  useEffect(() => {
    renderHeadlines();
  }, [localStoryState]);
  return <div>{renderHeadlines()}</div>;
};

export default StoryItem;
