import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

const App = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stories = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      setStories(stories.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {stories.length === 0 ? (
        <p>Loading...</p>
      ) : (
        stories.map(story => <p>{story}</p>)
      )}
    </div>
  );
};

export default App;
