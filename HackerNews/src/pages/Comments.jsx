import { useEffect, useState } from "react";
import Post from "../Components/Search/Post";
import "../components/Search/Post.css";
import { formatDistanceToNow } from "date-fns";
import "./ResultPage.css";
import VoteArrow from "../Components/Frontpage/VoteArrow";

const Comments = ({ storyID }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://hn.algolia.com/api/v1/search_by_date?tags=comment")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const enrichedComments = data.hits.map((comment) => ({
          ...comment,
          storyTitle: comment.story_title,
          storyUrl: comment.story_url,
          parentId: comment.parent_id,
        }));
        setComments(enrichedComments);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const convertHtmlEntities = (htmlString) => {
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(htmlString, "text/html");
    return parsedHTML.body.textContent || "";
  };

  const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="loader"></div>;
      </div>
    );
  }

  if (error) {
    return <p>Error loading comments: {error}</p>;
  }

  return (
    <div className="comments-main">
      {post && <Post post={post} />}
      {comments.map((comment) => (
        <div className="wrapper" id="arrow-comments" key={comment.objectID}>
          <VoteArrow />
          <div>
            <br />

            <span className="comments-sub">
              {" "}
              {comment.author} | {timeAgo(comment.created_at)} | Parent ID:{" "}
              {comment.parentId} | on:{" "}
              <a
                href={comment.storyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {comment.storyTitle}
              </a>
            </span>
            <p className="comments-title">
              {convertHtmlEntities(comment.comment_text)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
