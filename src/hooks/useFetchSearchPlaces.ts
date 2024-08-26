'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import db from '@/app/db';
import { PlaceDetailProps } from '@/types/place';

export const useFetchSearchPlaces = (
  contentsPerPage: number,
  searchQuery: string | null
) => {
  const [places, setPlaces] = useState<PlaceDetailProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPlace = currentPage * contentsPerPage;
  const indexOfFirstPlace = indexOfLastPlace - contentsPerPage;

  const fetchSearchPlaces = async (page: number, queryText: string | null) => {
    if (isLoading || !queryText) return;

    setIsLoading(true);

    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'places'), orderBy('score', 'desc'))
      );
      const results: PlaceDetailProps[] = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as PlaceDetailProps))
        .filter((doc) =>
          doc.name.toLowerCase().includes(queryText.toLowerCase())
        );

      setPlaces(results.slice(indexOfFirstPlace, indexOfLastPlace));
    } catch (error) {
      setError('검색 결과를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchPlaces(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const moveToNextPage = (totalPage: number) =>
    setCurrentPage((page) => (page < totalPage ? page + 1 : page));
  const moveToPrevPage = () =>
    setCurrentPage((page) => (page > 1 ? page - 1 : page));

  return { places, error, currentPage, moveToNextPage, moveToPrevPage };
};
