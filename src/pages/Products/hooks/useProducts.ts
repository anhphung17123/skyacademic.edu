import { useDataFetch } from '@/hooks';
import { productApi } from '@/services/api/product-service';
import type { Product } from '@/types';
import { useMemo } from 'react';
import { isBookProduct, isFlashcardProduct } from '@/types';
import { logger } from '@/lib/logger';

interface UseProductsReturn {
  products: Product[];
  books: import('@/types').BookProduct[];
  flashcards: import('@/types').FlashcardProduct[];
  isLoading: boolean;
  error: string | null;
}

export const useProducts = (): UseProductsReturn => {
  const {
    data: productsData,
    isLoading,
    error: fetchError,
  } = useDataFetch<Product[] | null>(() => productApi.fetchProducts(), {
    immediate: true,
    onError: (err) => {
      logger.error('Failed to fetch products', err);
    },
  });

  const products = productsData ?? [];

  const books = useMemo(
    () => products.filter((p): p is import('@/types').BookProduct => isBookProduct(p)),
    [products]
  );

  const flashcards = useMemo(
    () =>
      products.filter((p): p is import('@/types').FlashcardProduct =>
        isFlashcardProduct(p)
      ),
    [products]
  );

  const error = fetchError ? (fetchError.message ?? 'Failed to load products') : null;

  return {
    products,
    books,
    flashcards,
    isLoading,
    error,
  };
};
