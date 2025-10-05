import React, { useState, useEffect } from 'react';
import VideoCard from './TutVideoCard';

const VideoSearchSection = () => {
  const [videos, setVideos] = useState([]);
  const [searchedQuery, setSearchedQuery] = useState('');
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('relevance'); 

  const API_URL = "http://localhost:8000/api/videos/search";

  const searchVideos = async (query, filterParam = 'relevance', pageToken = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query || '',
          filter: filterParam,
          pageToken: pageToken || ''
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server returned:", errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.videos && data.videos.length > 0) {
        setVideos(pageToken ? [...videos, ...data.videos] : data.videos);
        setNextPageToken(data.nextPageToken);
      } else {
        setError('No videos found for this search. Try a different term.');
        setVideos([]);
      }
      setSearchedQuery(query || '');
    } catch (err) {
      console.error('YouTube API search error:', err);
      setError(err.message || 'Failed to load videos. Please try again.');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchVideos('');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('query') || '';
    searchVideos(query, filter);
  };

  const handleCategoryClick = (categoryQuery) => {
    searchVideos(categoryQuery, filter);
  };

  const handleFilterChange = (newFilter) => {
    let orderParam = 'relevance';
    if (newFilter === 'Newest') orderParam = 'date';
    if (newFilter === 'Most Viewed') orderParam = 'viewCount';
    setFilter(orderParam);
    searchVideos(searchedQuery, orderParam);
  };

  const loadMoreVideos = () => {
    if (nextPageToken) searchVideos(searchedQuery, filter, nextPageToken);
  };

  return (
    <section id="video-search" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">Tutorials & Training</h2>
        <p className="text-gray-600 text-center mt-2 mb-8 max-w-2xl mx-auto">
          Learn essential skills to protect yourself in various situations
        </p>

        {/* Search Form */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow p-4 mb-6">
          <form className="flex flex-col md:flex-row items-center gap-3" onSubmit={handleSearch}>
            <div className="flex w-full max-w-md border border-gray-300 rounded overflow-hidden bg-white/20">
      <span className="flex items-center justify-center px-3 text-white">
        🔍
      </span>
      <input
        type="search"
        name="query"
        placeholder="Search tutorials..."
        className="flex-1 px-3 py-2 bg-transparent text-white placeholder-white focus:outline-none"
      />
    </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                className="border border-gray-300 rounded px-3 py-2 cursor-pointer"
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="Newest">Newest</option>
                <option value="Most Viewed">Most Viewed</option>
                <option value="Recommended">Recommended</option>
              </select>
            </div>
          </form>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['All Category', 'Self Defence', 'Rights', 'News', 'Safety'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Cards */}
        {loading && (
          <div className="text-center">
            <div className="loader border-t-4 border-purple-600 w-12 h-12 rounded-full mx-auto animate-spin mb-2"></div>
            <p>Loading videos...</p>
          </div>
        )}

        {error && (
          <div className="text-center bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
            {error} <br />
            <small>Please ensure your YouTube API key is configured correctly.</small>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <VideoCard key={video.id || index} video={video} />
            ))}
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <p className="text-center text-gray-500">No videos found.</p>
        )}

        {/* Load More Button */}
        {nextPageToken && (
          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={loadMoreVideos}
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
            >
              More Videos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSearchSection;
