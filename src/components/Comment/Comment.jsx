import React, { useState } from "react";
import parse from "html-react-parser";
import moment from "moment";

export const Comment = ({ comment }) => {
  const subComments = (comment.kids || []).map(comment => {
    return <Comment key={comment.id} comment={comment} type="child" />;
  });
  const [commentOpen, setCommentOpen] = useState(true);

  return (
    <div className="comment__wrapper">
      <p className="comment__controls">
        <span className="comment__controls__author">{comment.by}</span>{" "}
        <span className="comment__controls__age">
          {moment(comment.time * 1000).fromNow()}
        </span>{" "}
        <span
          className="comment__controls__view-toggle"
          onClick={() => setCommentOpen(!commentOpen)}
        >
          {commentOpen
            ? `[-]`
            : comment.kids
            ? `[+${subComments.length}]`
            : `[+]`}
        </span>
      </p>
      {commentOpen &&
        (comment.deleted ? (
          <p className="comment__text">deleted</p>
        ) : (
          <div className="comment__text">{parse(`${comment.text}`)}</div>
        ))}
      {commentOpen && subComments}
    </div>
  );
};
