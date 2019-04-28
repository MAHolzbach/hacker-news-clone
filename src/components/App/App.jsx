import React, { Component } from "react";
import axios from "axios";
import StoryItem from "../StoryItem/StoryItem";

export const StoryContext = React.createContext(null);

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      stories: [],
      storyIds: [],
      fetchComplete: false
    };
  }

  componentDidMount() {
    const fetchStoryIds = async () => {
      await axios
        .get("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then(response => {
          this.setState({ storyIds: response.data });
        })
        .then(() => {
          const storiesToFetch = this.state.storyIds.slice(0, 20);
          const newStoryArray = [];
          const fetchStories = async () => {
            await storiesToFetch.forEach(storyId => {
              axios
                .get(
                  `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
                )
                .then(response => {
                  newStoryArray.push(response.data);
                  this.setState({ stories: newStoryArray });
                });
            });
            this.setState({ fetchComplete: true });
          };
          fetchStories();
        });
    };
    fetchStoryIds();
  }

  render() {
    return (
      <>
        <StoryContext.Provider value={this.state}>
          <div>
            {this.state.fetchComplete ? <StoryItem /> : <p>Loading...</p>}
          </div>
        </StoryContext.Provider>
      </>
    );
  }
}
