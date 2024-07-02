import { formatDistance } from "date-fns";
import "./Post.css";
import VoteArrow from "../Frontpage/VoteArrow";
import { useState } from "react";

const Post = ({ post, index }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleHide = () => {
    setIsVisible(false);
  };

  const {
    title,
    objectID,
    url,
    author,
    points,
    created_at,
    num_comments,
    _highlightResult: highlightResult,
  } = post;

  const formattedDate = formatDistance(new Date(created_at), new Date(), {
    addSuffix: true,
  });

  if (!isVisible) return null;

  return (
    <div className="wrapper">
      <VoteArrow />
      <div className="post">
        <p className="post-title">
          {index !== undefined ? `${index + 1}. ` : ""}
          <a href={url} target="_blank" rel="noopener noreferrer">
            {highlightResult && highlightResult.title ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: highlightResult.title.value,
                }}
              />
            ) : (
              title
            )}
          </a>{" "}
          <span className="post-url">({url})</span>
        </p>
        <p className="post-sub">
          {points} points by {author} {formattedDate} ago |{" "}
          <span className="hide-link" onClick={handleHide}>
            hide
          </span>{" "}
          |
          <a href={`/comments/${objectID}`}>
            <span className="comments-link">{num_comments} comments</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Post;
