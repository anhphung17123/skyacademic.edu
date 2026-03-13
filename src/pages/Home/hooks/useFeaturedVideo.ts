import { useMemo } from "react";
import { useDataFetch } from "@/hooks";
import { freeVideoApi } from "@/services/api/free-video-service";
import type { FreeVideoDto } from "@/types/api";

export function useFeaturedVideo(): {
  featuredVideo: FreeVideoDto | null;
  isLoading: boolean;
} {
  const { data: videos, isLoading } = useDataFetch(
    () => freeVideoApi.fetchVideos(),
    { immediate: true }
  );

  const featuredVideo = useMemo(
    () => (videos?.length ? videos[0] ?? null : null),
    [videos]
  );

  return { featuredVideo, isLoading };
}
