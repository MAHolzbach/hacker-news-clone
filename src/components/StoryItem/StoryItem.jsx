import React, { useState, useEffect, useContext } from "react";
import { StoryContext } from "../App/App";

const StoryItem = () => {
  const context = useContext(StoryContext);
  const renderHeadlines = () => {
    console.log("STORIES CONTEXT:", context);
    return context.storyIds.map(story => {
      <p>STORY</p>;
    });
  };
  // useEffect(() => {
  //   console.log(context);
  //   renderHeadlines();
  // }, [context]);
  return (
    <div>
      {context.storyIds.map(story => {
        <p>STORY</p>;
      })}
    </div>
  );
};

export default StoryItem;
