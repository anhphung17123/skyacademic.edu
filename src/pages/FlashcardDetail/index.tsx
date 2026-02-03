import { useParams, Navigate } from 'react-router-dom';
import { Loading } from '@/components/common/Loading';
import { useDataFetch } from '@/hooks';
import { productApi } from '@/services/api/product-service';
import { FlashcardDetailContent } from '@/pages/ProductDetail/components/FlashcardDetailContent';

/** Flashcard detail page: route /flashcards/:slug – topics as tabs, payment in modal. */
export const FlashcardDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useDataFetch(
    () => (slug ? productApi.getFlashcardBySlug(slug) : Promise.resolve(null)),
    { immediate: !!slug }
  );

  if (!slug) return <Navigate to="/products" replace />;
  if (isLoading) return <Loading fullScreen />;
  if (error || !product) return <Navigate to="/products" replace />;

  return <FlashcardDetailContent product={product} />;
};
