import axios from 'axios';

const API_KEY = "AIzaSyDZDN6uJzTUhxboJbAGEwOwRPtAM-fGpi4";

// Fetch videos from YouTube API
export async function fetchVideos(query, maxResults = 9, order = 'relevance', pageToken = null) {
  if (!API_KEY) throw new Error('YouTube API key is missing. Add YOUTUBE_API_KEY to your .env file.');

  const params = {
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults,
    order,
    key: API_KEY,
  };

  if (pageToken) params.pageToken = pageToken;

  try {
    // Search endpoint
    const searchResp = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
    const items = searchResp.data.items || [];
    const videoIds = items.map((item) => item.id.videoId).join(',');

    if (!videoIds) return { videos: [], nextPageToken: null };

    // Get video statistics
    const statsResp = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'statistics,contentDetails',
        id: videoIds,
        key: API_KEY,
      },
    });

    const statsData = statsResp.data.items || [];

    const videos = items.map((item, idx) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
      statistics: statsData[idx]?.statistics || {},
    }));

    return { videos, nextPageToken: searchResp.data.nextPageToken || null };
  } catch (error) {
    console.error('YouTube API Error:', error.message);
    throw new Error('Failed to fetch videos from YouTube API.');
  }
}

// Controller: get default videos
export async function getDefaultVideos(req, res) {
  try {
    const { videos, nextPageToken } = await fetchVideos('women safety');
    res.json({ videos, searchedQuery: 'women safety', nextPageToken });
  } catch (err) {
    console.error('Error fetching default videos:', err);
    res.status(500).json({ error: 'Failed to fetch videos', videos: [], searchedQuery: '', nextPageToken: null });
  }
}

// Controller: search videos
export async function searchVideos(req, res) {
  try {
    const { query, filter, pageToken } = req.body;

    if (!API_KEY) {
      return res.status(500).json({
        error: 'YouTube API key is missing. Add YOUTUBE_API_KEY to your .env file.',
      });
    }

    // Allowed search keywords
    const allowedKeywords = [
      'women safety',
      'self defense',
      'harassment awareness',
      'women rights',
      'emergency help',
      'mental health for women',
      'cyber safety for women',
    ];

    let finalQuery = query?.trim() || 'women safety';
    if (!allowedKeywords.some((k) => finalQuery.toLowerCase().includes(k))) {
      finalQuery = 'women safety';
    }

    // Map filter to YouTube API order
    let orderParam = 'relevance';
    if (filter === 'Newest') orderParam = 'date';
    if (filter === 'Most Viewed') orderParam = 'viewCount';

    const { videos, nextPageToken } = await fetchVideos(finalQuery, 9, orderParam, pageToken);

    res.json({ videos, searchedQuery: finalQuery, nextPageToken });
  } catch (err) {
    console.error('YouTube API search error:', err);
    res.status(500).json({
      error: 'Failed to fetch videos: ' + err.message,
      videos: [],
      searchedQuery: '',
      nextPageToken: null,
    });
  }
}
