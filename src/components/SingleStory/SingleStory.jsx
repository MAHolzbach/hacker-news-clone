import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { StoryContext } from "../App/App";
import { Comment } from "../Comment/Comment";

const SingleStory = () => {
  const [currentStoryData, setCurrentStoryData] = useState({});
  const [commentData, setCommentData] = useState([]);
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
  // console.log("COMMENT DATA ==>", commentData);

  const fetchCommentData = story => {
    story.kids.forEach(commentId => {
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
        .then(response => {
          response.data.kids
            ? (console.log("KIDS", response.data),
              fetchCommentData(response.data))
            : console.log("NO KIDS", response.data);
        });
      // setCommentData(commentData => [...commentData, response.data])
      // .then(() => console.log("HERE", commentData));
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
        {commentData.map(comment => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default SingleStory;
