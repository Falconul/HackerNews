// PostAndComments.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Components/Search/Post.css";
import Post from "../Components/Search/Post.jsx";
import "./ResultPage.css";

const PostAndComments = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://hn.algolia.com/api/v1/items/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setPostDetails(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    } else {
      setError("No ID provided");
      setIsLoading(false);
    }
  }, [id]);

  const convertHtmlEntities = (htmlString) => {
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(htmlString, "text/html");
    return parsedHTML.body.textContent || "";
  };

  const renderComments = (comments, startIndex = 0) => {
    return comments.map((comment, index) => (
      <div key={comment.id} className="comment">
        <p className="comment-author">
          {startIndex + index + 1}. {comment.author}:
        </p>
        <div className="comment-text">{convertHtmlEntities(comment.text)}</div>
        {comment.children &&
          comment.children.length > 0 &&
          renderComments(comment.children, startIndex + index + 1)}
      </div>
    ));
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {postDetails && (
        <div>
          <Post post={postDetails} />
          <div>
            <h2>Comments:</h2>
            {postDetails.children && renderComments(postDetails.children)}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostAndComments;
