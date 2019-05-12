import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
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
      page: null,
      storyId: null,
      setPage: () => {
        this.setPage();
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

  setPage() {}

  showNextThirtyStories() {
    console.log("DDERP");
  }

  render() {
    // console.log(this.state.stories);
    return (
      <>
        <StoryContext.Provider value={this.state}>
          <>
            <Header />
            {this.state.fetchComplete ? (
              <>
                <Route exact path="/" component={ContentView} />
                <Route
                  path={`page-${this.state.page}`}
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
