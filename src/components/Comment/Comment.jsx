import React, { useContext, useState, useEffect } from "react";

export const Comment = ({ comment }) => {
  console.log("COMMENT:", comment);
  const subComments = (comment.kids || []).map(comment => {
    return <Comment key={comment.id} comment={comment} type="child" />;
  });

  return (
    <div>
      <p>{comment.text}</p>
      {subComments}
    </div>
  );
};
