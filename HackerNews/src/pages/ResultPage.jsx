import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Post from "../components/Search/Post";

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      console.log("Fetching starts, isLoading should be true");
      setIsLoading(true);
      fetch(`http://hn.algolia.com/api/v1/search?query=${query}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("data ", data);
          setPosts(data.hits);
          setFilteredPosts(data.hits);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  }, [query]);

  if (isLoading) {
    <div className="spinner-container">
      <div className="loader"></div>;
    </div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!posts.length) {
    return (
      <div className="empty">Please enter something in the search field!</div>
    );
  }

  const handleSearch = (searchTerm) => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div>
      {filteredPosts.map((post, index) => (
        <Post
          key={index}
          post={post}
          highlightResult={post._highlightResult}
          index={index}
        />
      ))}
    </div>
  );
}
