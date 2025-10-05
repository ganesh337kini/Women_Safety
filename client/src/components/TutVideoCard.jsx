import React from 'react';
import styles from '../CSS/Tut.module.css'; // optional for extra tweaks

const VideoCard = ({ video }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col ${styles.videoCard}`}>
      <iframe
        className="w-full h-48 sm:h-56 md:h-64 rounded-t-xl"
        src={`https://www.youtube.com/embed/${video.id}`}
        title={video.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="p-4 flex flex-col flex-grow">
        <h6 className="font-semibold text-gray-800 text-lg truncate">{video.title}</h6>
        <p className="text-gray-500 text-sm flex-grow mt-2">
          {video.description?.substring(0, 100)}...
        </p>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 text-white text-center rounded-lg py-2 mt-4 hover:bg-purple-700 transition w-full"
        >
          Watch
        </a>
      </div>
    </div>
  );
};

export default VideoCard;
