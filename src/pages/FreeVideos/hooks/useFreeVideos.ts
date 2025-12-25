import { useState, useEffect } from 'react';
import { freeVideoApi } from '@/services/api/free-video-service';
import { FreeVideoDto } from '@/types/api';

export const useFreeVideos = () => {
  const [videos, setVideos] = useState<FreeVideoDto[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<FreeVideoDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    filterVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos, searchTerm, selectedCategory]);

  const loadVideos = async () => {
    setIsLoading(true);
    try {
      const data = await freeVideoApi.fetchVideos();
      setVideos(data);
      const uniqueCategories = Array.from(new Set(data.map((v) => v.category).filter(Boolean)));
      setCategories(uniqueCategories as string[]);
    } catch (error) {
      console.error('Failed to load videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterVideos = () => {
    let filtered = [...videos];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((video) => video.category === selectedCategory);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(term) ||
          video.description?.toLowerCase().includes(term) ||
          video.category?.toLowerCase().includes(term)
      );
    }
    setFilteredVideos(filtered);
  };

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


