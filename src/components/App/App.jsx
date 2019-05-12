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
    const fetchStoryIds = async () => {
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
          let startingPoint =
            this.state.currentPage === 1 ? 0 : this.state.currentPage * 30;
          const storiesToFetch = this.state.storyIds.slice(
            startingPoint,
            startingPoint * 30 + 30
          );
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

  setCurrentPage() {
    let urlArray = window.location.href.split("=");
    return parseInt(urlArray[1]);
  }

  showNextThirtyStories() {
    console.log("DDERP");
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
