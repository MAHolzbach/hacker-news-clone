import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import StoryItem from "../StoryItem/StoryItem";

export const StoryContext = React.createContext(null);

const App = () => {
  const [stories, setStories] = useState([]);
  const [storyIds, setStoryIds] = useState([]);
  const [fetchComplete, setFetchComplete] = useState(false);

  useEffect(() => {
    const fetchStoryIds = async () => {
      await axios
        .get("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then(response => {
          setStoryIds(response.data);
        });
    };
    fetchStoryIds();
  }, []);

  useEffect(() => {
    const storiesToFetch = storyIds.slice(0, 20);
    const fetchStories = async () => {
      const newStoryArray = [];
      await storiesToFetch.forEach(storyId => {
        axios
          .get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
          .then(response => {
            newStoryArray.push(response.data);
          });
      });
      setStories(newStoryArray);
      setFetchComplete(true);
    };
    fetchStories();
  }, [storyIds]);

  return (
    <StoryContext.Provider value={stories}>
      <div>{fetchComplete ? <StoryItem /> : <p>Loading...</p>}</div>
    </StoryContext.Provider>
  );
};

export default App;
