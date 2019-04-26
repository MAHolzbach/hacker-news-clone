import React, { useState, useEffect, useContext } from "react";
import { StoryContext } from "../App/App";

const StoryItem = () => {
  const stories = useContext(StoryContext);
  // const [localStoryState, setLocalStoryState] = useState([]);
  // useEffect(() => {
  //   setLocalStoryState(stories);
  // }, [stories]);
  console.log("STORIES CONTEXT:", stories);
  return (
    <div>
      {stories.map(story => {
        return <h2 key={story.id}>{story.title}</h2>;
      })}
    </div>
  );
};

export default StoryItem;
