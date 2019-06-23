import React, { Component } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
import Header from "../Header/Header";
import ContentView from "../ContentView/ContentView";

export const StoryContext = React.createContext(null);

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      stories: [],
      storyIds: [],
      storyDisplayNumbers: [],
      fetchComplete: false,
      currentView: "headlines",
      numberOfPages: null,
      currentPage: null,
      storyId: null,
      setCurrentPage: () => {
        this.setCurrentPage();
      },
      setCurrentViewAndStoryId: (currentView, storyId) => {
        this.setState({ currentView, storyId });
      },
      showNextThirtyStories: () => {
        this.showNextThirtyStories();
      }
    };
  }

  componentDidMount() {
    this.fetchStoryIds();
  }

  async fetchStories() {
    this.setState({ stories: [] });
    let startingPoint =
      this.state.currentPage === 1 ? 0 : this.state.currentPage * 30 - 30;
    let storyNumberIndex = startingPoint + 1;
    const storiesToFetch = this.state.storyIds.slice(
      startingPoint,
      startingPoint + 30
    );

    await storiesToFetch.forEach((storyId, index) => {
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
          numberOfPages: Math.ceil(response.data.length / 30),
          currentPage: this.setCurrentPage()
        });
      })
      .then(() => {
        this.fetchStories();
      });
  }

  setCurrentPage() {
    let urlArray = window.location.href.split("=");
    return parseInt(urlArray[1]);
  }

  showNextThirtyStories() {
    this.setState({ currentPage: this.state.currentPage + 1 }, () => {
      console.log(this.state.currentPage);
      this.fetchStories();
    });
  }

  render() {
    return (
      <>
        <StoryContext.Provider value={this.state}>
          <>
            <Header />
            {this.state.fetchComplete ? (
              <>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/page=1" />}
                />
                <Route
                  path={`/page=${this.state.currentPage}`}
                  component={ContentView}
                />
              </>
            ) : (
              <Loader type="Triangle" color="orange" height={80} width={80} />
            )}
          </>
        </StoryContext.Provider>
      </>
    );
  }
}
