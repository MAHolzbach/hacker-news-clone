import React, { Component } from "react";
import axios from "axios";
// import Loader from "react-loader-spinner";
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
          const storiesToFetch = this.state.storyIds.slice(0, 30);
          const fetchStories = async () => {
            await storiesToFetch.forEach(storyId => {
              axios
                .get(
                  `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
                )
                .then(response => {
                  this.setState({
                    stories: [...this.state.stories, response.data]
                  });
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
    console.log(this.state.stories);
    return (
      <>
        <StoryContext.Provider value={this.state}>
          <div>
            {this.state.fetchComplete ? (
              <StoryItem />
            ) : (
              // <Loader type="Grid" color="#somecolor" height={80} width={80} />
              <p>LOADING...</p>
            )}
          </div>
        </StoryContext.Provider>
      </>
    );
  }
}
