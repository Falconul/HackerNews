export async function frontPage() {
  const url = "http://hn.algolia.com/api/v1/search?tags=front_page";
  
  const resp = await fetch(url);
  const posts = await resp.json();

  return posts.hits;
}

export async function fetchLatestPosts() {
  try {
    // Define the URLs for fetching data from the Hacker News (HN) Algolia API
    const url1 = "http://hn.algolia.com/api/v1/search_by_date?tags=(story,poll)";
    const url2 = "http://hn.algolia.com/api/v1/search_by_date?tags=story";
    const url3 = "http://hn.algolia.com/api/v1/search?tags=front_page";
    const url4 = "http://hn.algolia.com/api/v1/search?tags=comment,story";
    const url5 = "http://hn.algolia.com/api/v1/search?tags=story,author_pg"; 

    // Fetch data from the first URL
    const resp1 = await fetch(url1);
    const posts1 = await resp1.json();

    // Fetch data from the second URL
    const resp2 = await fetch(url2);
    const posts2 = await resp2.json();

    // Fetch data from the third URL
    const resp3 = await fetch(url3);
    const posts3 = await resp3.json();

    // Fetch data from the fourth URL
    const resp4 = await fetch(url4);
    const posts4 = await resp4.json();

    // Fetch data from the fifth URL
    const resp5 = await fetch(url5);
    const posts5 = await resp5.json();

    // Combine the results from all five URLs into a single array
    const combinedPosts = [
      ...posts1.hits,
      ...posts2.hits,
      ...posts3.hits,
      ...posts4.hits,
      ...posts5.hits,
    ];

    // Return the combined array of posts
    return combinedPosts;
  } catch (error) {
    // If an error occurs during any of the fetch operations, log the error and rethrow it
    console.error('Error fetching latest posts:', error);
    throw error;
  }
}
