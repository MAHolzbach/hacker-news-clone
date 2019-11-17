import React, { Component } from "react";
import axios from "axios";
import { HashRouter, Route } from "react-router-dom";
import Loader from "react-loader-spinner";
import Header from "../Header/Header";
import Headlines from "../Headlines/Headlines";
import SingleStory from "../SingleStory/SingleStory";

export const StoryContext = React.createContext(null);

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      stories: [],
      storyIds: [],
      storyDisplayNumbers: [],
      fetchComplete: false,
      numberOfPages: null,
      currentPage: 1,
      storyId: null,
      setCurrentStoryId: storyId => {
        this.setState({ storyId });
      },
      showNextThirtyStories: () => {
        this.showNextThirtyStories();
      },
      setCurrentPage: number => {
        this.setCurrentPage(number);
      }
    };
  }

  componentDidMount() {
    this.fetchStoryIds();
  }

  async fetchStories() {
    this.setState({ stories: [], storyDisplayNumbers: [] });
    let startingPoint =
      this.state.currentPage === 1 ? 0 : this.state.currentPage * 30 - 30;
    let storyNumberIndex = startingPoint + 1;
    const storiesToFetch = this.state.storyIds.slice(
      startingPoint,
      startingPoint + 30
    );

    await storiesToFetch.forEach(storyId => {
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
        .then(response => {
          this.setState({
            stories: [...this.state.stories, response.data],
            storyDisplayNumbers: [
              ...this.state.storyDisplayNumbers,
              storyNumberIndex++
            ]
          });
        });
    });
    this.setState({ fetchComplete: true });
  }

  async fetchStoryIds() {
    await axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(response => {
        this.setState({
          storyIds: response.data,
          numberOfPages: Math.ceil(response.data.length / 30)
        });
      })
      .then(() => {
        this.fetchStories();
      });
  }

  showNextThirtyStories() {
    this.setState({ currentPage: this.state.currentPage + 1 }, () => {
      this.fetchStories();
    });
  }

  setCurrentPage(number) {
    this.setState({ currentPage: number }, () => {
      this.fetchStories();
    });
  }

  render() {
    return (
      <>
        <StoryContext.Provider value={this.state}>
          <>
            <Header />
            <HashRouter>
              {this.state.fetchComplete ? (
                <Route exact path="/" component={Headlines}></Route>
              ) : (
                <Loader type="Triangle" color="orange" height={80} width={80} />
              )}
              <Route
                exact
                path={`/${this.state.storyId}`}
                component={SingleStory}
              ></Route>
            </HashRouter>
          </>
        </StoryContext.Provider>
      </>
    );
  }
}
