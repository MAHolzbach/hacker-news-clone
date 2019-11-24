import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { StoryContext } from "../App/App";
import { Comment } from "../Comment/Comment";
import Loader from "react-loader-spinner";

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

  // console.log("CURRENT STORY ==>", currentStoryData);

  const fetchCommentData = async item => {
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
        .then(() => setFetchComplete(true));
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
        {currentStoryData.score} points by {currentStoryData.by} 2 hours ago |
        hide |{" "}
        {currentStoryData.commentCount > 0 ? currentStoryData.commentCount : 0}{" "}
        comments
      </p>
      <div>
        {fetchComplete ? (
          (console.log(currentStoryData),
          currentStoryData.kids.map(item => {
            console.log(item);
            return <Comment key={item.id} item={item} />;
          }))
        ) : (
          <Loader type="Triangle" color="orange" height={80} width={80} />
        )}

        {/* {currentStoryData.map(item => {
          return <Comment key={item.id} item={item} />;
        })} */}
      </div>
    </div>
  );
};

export default SingleStory;
