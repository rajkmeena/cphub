import React, { useState, useEffect } from 'react';
import './news.css';

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

function JobNews() {
  const [news, setNews] = useState(null);
  const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  useEffect(() => {
    const apiKey = 'e6776717ec5e493a94961501e6fde2c5';
    const apiUrl = `https://newsapi.org/v2/everything?q=jobs&apiKey=${apiKey}`;

    const fetchNews = async () => {
      await delay(500);
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setNews(data.articles))
        .catch(error => console.error('Error fetching news:', error));
    };

    fetchNews();
  }, []);

  const handleImageError = (event) => {
    event.target.style.display = 'none'; // Hide the image
  };

  return (
    <div>
      <div className="grid">
        <h1>Latest Job News</h1>
        {!news ? (
          <div className="loader">Loading...</div>
        ) : (
          <ul className="list">
            {news.map(article => (
              <li key={article.url} className="item">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <div className="image-container">
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="image-placeholder">
                        <h5 className='error-text'>IMAGE NOT FOUND</h5>
                      </div>
                    )}
                  </div>
                  <h2>{article.title}</h2>
                  <p className="article-text">{truncateText(article.description, 125)}</p>
                  <span className="read-more">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default JobNews;
