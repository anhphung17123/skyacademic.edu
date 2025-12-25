// ========================================
// Static Free Video Service
// ========================================
// Uses mock data directly - no API calls

import { mockFreeVideos } from '../mock/data/FreeVideos';
import { FreeVideoDto } from '@/types/api/misc';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface FetchVideosParams {
  search?: string;
  courseId?: string;
}

export const freeVideoApi = {
  async fetchVideos(params?: FetchVideosParams): Promise<FreeVideoDto[]> {
    await delay(300);
    let videos = [...mockFreeVideos];
    
    if (params?.courseId) {
      videos = videos.filter(video => video.course_id === params.courseId);
    }
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      videos = videos.filter(video => 
        video.title.toLowerCase().includes(searchLower) ||
        video.description?.toLowerCase().includes(searchLower) ||
        video.course_id?.includes(params.search!)
      );
    }
    
    return videos;
  },
};