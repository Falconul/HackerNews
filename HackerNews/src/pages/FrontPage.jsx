import { useEffect, useState } from "react";
import { frontPage } from "../API's/hackernews";
import Post from "../Components/Search/Post";
import "./ResultPage.css";

export default function FrontPage() {
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    frontPage()
      .then((testPost) => {
        setHits(testPost);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

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
    <div>
      <ol className="front-page-ol">
        {hits.map((element, idx) => (
          <li key={idx}>
            <Post post={element} />
          </li>
        ))}
      </ol>
    </div>
  );
}
