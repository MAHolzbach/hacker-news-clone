import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { StoryContext } from "../App/App";
import { Comment } from "../Comment/Comment";
import Loader from "react-loader-spinner";
import moment from "moment";

const SingleStory = () => {
  const [currentStoryData, setCurrentStoryData] = useState({});
  const [fetchComplete, setFetchComplete] = useState(false);
  const context = useContext(StoryContext);
  const storyArray = context.stories;
  const currentStoryId = context.storyId;

  useEffect(() => {
    setCurrentStoryData(
      storyArray.filter(story => story.id === currentStoryId)[0]
    );
    (async () => {
      const currentStory = storyArray.filter(
        story => story.id === currentStoryId
      )[0];
      await fetchCommentData(currentStory);
    })();
  }, []);

  console.log("CURRENT STORY ==>", currentStoryData);

  const fetchCommentData = item => {
    let idArray = item.kids;
    idArray.forEach((id, index) => {
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(response => {
          idArray[index] = response.data;
          if (response.data.kids) {
            fetchCommentData(response.data);
          }
        })
        .then(() =>
          setTimeout(() => {
            setFetchComplete(true);
          }, 2000)
        );
    });
  };

  return (
    <div className="content__wrapper">
      <div className="story__title-wrapper">
        <a className="story__link" href={currentStoryData.url}>
          <p>{currentStoryData.title}</p>
        </a>
      </div>
      <p className="story__info">
        {currentStoryData.score} points by {currentStoryData.by}{" "}
        {moment(currentStoryData.time * 1000).fromNow()} | hide |{" "}
        {currentStoryData.descendants} comments
      </p>
      <div>
        {fetchComplete ? (
          currentStoryData.kids.map(item => {
            return <Comment key={item.id} comment={item} />;
          })
        ) : (
          <Loader type="Triangle" color="orange" height={80} width={80} />
        )}
      </div>
    </div>
  );
};

export default SingleStory;
