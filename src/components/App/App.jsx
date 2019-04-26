import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import StoryItem from "../StoryItem/StoryItem";

export const StoryContext = React.createContext(null);

const App = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then(response => {
          console.log(response.data);
          response.data.map(story => {
            setStories([...stories, story]);
          });
          console.log(stories);
        });
    };
    fetchData();
  }, []);

  return (
    <StoryContext.Provider value={stories}>
      <div>{stories.length === 0 ? <p>Loading...</p> : <StoryItem />}</div>
    </StoryContext.Provider>
  );
};

export default App;
