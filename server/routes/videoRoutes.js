import express from 'express';
import { getDefaultVideos, searchVideos } from '../controller/video-controller.js';

const router = express.Router();

// Default videos
router.get('/', getDefaultVideos);

// Search videos
router.post('/search', searchVideos);

export default router;