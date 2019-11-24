import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

export const Comment = ({ comment }) => {
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
