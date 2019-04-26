import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import StoryItem from "../StoryItem/StoryItem";

export const StoryContext = React.createContext(null);

const App = () => {
  const [stories, setStories] = useState([]);
  const [numberOfStories, setNumberOfStories] = useState(0);

  useEffect(() => {
    const newStoryArray = [];
    const fetchData = async () => {
      await axios
        .get("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then(response => {
          console.log(response.data.length);
          setNumberOfStories(response.data.length);
          console.log(numberOfStories);
          response.data.forEach(story => {
            axios
              .get(`https://hacker-news.firebaseio.com/v0/item/${story}.json`)
              .then(response => {
                newStoryArray.push(response.data);
              });
          });
          if (newStoryArray.length === numberOfStories) {
            setStories(newStoryArray);
          }
        });
    };
    fetchData();
  }, []);

  return (
    <StoryContext.Provider value={stories}>
      <div>{<StoryItem />}</div>
    </StoryContext.Provider>
  );
};

export default App;
