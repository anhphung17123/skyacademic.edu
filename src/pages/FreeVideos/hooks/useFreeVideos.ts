import { useState, useMemo } from 'react';
import { freeVideoApi } from '@/services/api/free-video-service';
import { FreeVideoDto } from '@/types/api';
import { useDataFetch, useDebounce } from '@/hooks';

export const useFreeVideos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const {
    data: videosData,
    isLoading,
  } = useDataFetch<FreeVideoDto[]>(
    () => freeVideoApi.fetchVideos(),
    {
      immediate: true,
      onError: (err) => {
        console.error('Failed to load videos:', err);
      },
    }
  );

  const videos = useMemo(() => videosData ?? [], [videosData]);

  const categories = useMemo(() => {
    if (!videos || videos.length === 0) {
      return [];
    }
    const uniqueCategories = Array.from(
      new Set(videos.map((v) => v.category).filter(Boolean))
    );
    return uniqueCategories as string[];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    if (!videos || videos.length === 0) {
      return [];
    }

    const searchTermLower = debouncedSearchTerm.toLowerCase();
    const hasSearch = searchTermLower.length > 0;
    const hasCategoryFilter = selectedCategory !== 'all';

    // Combine filters in a single pass
    return videos.filter((video) => {
      // Category filter
      if (hasCategoryFilter && video.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (hasSearch) {
        const matchesSearch =
          video.title.toLowerCase().includes(searchTermLower) ||
          video.description?.toLowerCase().includes(searchTermLower) ||
          video.category?.toLowerCase().includes(searchTermLower);
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [videos, debouncedSearchTerm, selectedCategory]);

  return {
    filteredVideos,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    videos,
  };
};


