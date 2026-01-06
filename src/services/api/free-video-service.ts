// ========================================
// Static Free Video Service
// ========================================
// Uses mock data directly - no API calls
// Cached in localStorage for instant loading

import { mockFreeVideos } from '../mock/data/FreeVideos';
import { FreeVideoDto } from '@/types/api/free-video';
import { getCachedData, setCachedData } from '@/utils/cache';

const CACHE_KEY_VIDEOS = 'skyacademy_videos_cache';

interface FetchVideosParams {
  search?: string;
  courseId?: string;
}

export const freeVideoApi = {
  async fetchVideos(params?: FetchVideosParams): Promise<FreeVideoDto[]> {
    // For filtered results, don't cache (too many combinations)
    if (params?.courseId || params?.search) {
      let videos = [...mockFreeVideos];

      if (params.courseId) {
        videos = videos.filter((video) => video.course_id === params.courseId);
      }
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        videos = videos.filter(
          (video) =>
            video.title.toLowerCase().includes(searchLower) ||
            video.description?.toLowerCase().includes(searchLower) ||
            video.course_id?.includes(params.search!)
        );
      }

      return videos;
    }

    // Cache full list
    const cached = getCachedData<FreeVideoDto[]>(CACHE_KEY_VIDEOS);
    if (cached) {
      return cached;
    }

    const videos = [...mockFreeVideos];
    setCachedData(CACHE_KEY_VIDEOS, videos);
    return videos;
  },
};