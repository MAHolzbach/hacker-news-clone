import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

export const Comment = ({ comment }) => {
  const [currentStoryData, setCurrentStoryData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const subComments = (comment.kids || []).map(comment => {
    return <Comment key={comment.id} comment={comment} type="child" />;
  });

  console.log("COMMENT ==>", comment);

  // useEffect(() => {
  //   axios
  //     .get(`https://hacker-news.firebaseio.com/v0/item/${comment.id}.json`)
  //     .then(response =>
  //       setCommentData(commentData => [...commentData, response.data])
  //     )
  //     .then(() => console.log(commentData));
  // }, []);

  // const fetchCommentData = story => {
  //   story.kids.forEach(commentId => {
  //     axios
  //       .get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
  //       .then(response =>
  //         setCommentData(commentData => [...commentData, response.data])
  //       )
  //       .then(() => console.log(commentData));
  //   });
  // };

  // console.log(subComments);

  return (
    <div>
      <p>{comment.text}</p>
      {subComments}
    </div>
  );
};
