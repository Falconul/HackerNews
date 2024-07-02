import React, { useState, useEffect } from "react";
import { fetchLatestPosts } from "../../API's/hackernews";
import Post from "../Search/Post";

const New = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(15);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const endpoints = [
          "http://hn.algolia.com/api/v1/search_by_date?query=foo&tags=story",
          "http://hn.algolia.com/api/v1/search_by_date?query=bar&tags=comment",
        ];

        const requests = endpoints.map(fetchLatestPosts);
        const results = await Promise.all(requests);

        const combinedPosts = results.flatMap((result, index) => {
          const type = endpoints[index].includes("comment")
            ? "comment"
            : "story";
          return result.map((post) => ({ ...post, type }));
        });

        const currentTime = new Date();
        const sortedPosts = combinedPosts.sort((a, b) => {
          const timeDifferenceA = currentTime - new Date(a.created_at);
          const timeDifferenceB = currentTime - new Date(b.created_at);
          return timeDifferenceA - timeDifferenceB;
        });

        setLatestPosts(sortedPosts);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 15);
  };

  if (isLoading)
    return (
      <div className="spinner-container">
        <div className="loader"></div>
      </div>
    );

  if (error) return <p>Error loading latest posts: {error}</p>;

  return (
    <div>
      {latestPosts.slice(0, visiblePosts).map((post, index) => (
        <Post key={post.objectID} post={post} index={index} />
      ))}
      {latestPosts.length > visiblePosts && (
        <button onClick={loadMorePosts}>Load More</button>
      )}
    </div>
  );
};

export default New;
