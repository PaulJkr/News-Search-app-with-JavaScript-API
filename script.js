const apikey = "50e1f073839543c0ae9e64e4e37812cf";

const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = ""; // Clear the container

  // Ensure articles is an array
  if (articles && Array.isArray(articles)) {
    articles.forEach((article) => {
      // Create blog card elements
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");

      const img = document.createElement("img");
      img.src = article.urlToImage || "default-image.jpg"; // Fallback image if urlToImage is missing
      img.alt = article.title || "No title"; // Fallback alt text if title is missing

      const title = document.createElement("h2");
      title.textContent = article.title || "Untitled";

      const description = document.createElement("p");
      description.textContent =
        article.description || "No description available";

      // Append the elements to the blog card
      blogCard.appendChild(img);
      blogCard.appendChild(title);
      blogCard.appendChild(description);

      // Append the blog card to the container
      blogContainer.appendChild(blogCard);
    });
  } else {
    console.error("No valid articles to display.");
  }
}


(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
