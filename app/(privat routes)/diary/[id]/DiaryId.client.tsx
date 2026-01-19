'use client';

import css from './DiaryId.module.css';
import DiaryEntryDetails from '@/components/Diary/DiaryEntryDetails/DiaryEntryDetails';
import { useQuery} from '@tanstack/react-query';
import { deleteDiary, fetchDiaryById } from '@/lib/api/clientApi';
import {useParams, useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/Diary/ErrorMessage/ErrorMessage';
import { toast } from 'react-toastify';

export default function DiaryIdClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: diary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['diaries', id],
    queryFn: () => fetchDiaryById(id),
    refetchOnMount: false,
  });

  const deleteDiaryRequest = async (diaryId: string) => {
    try {

      await deleteDiary(diaryId);
      router.push('/diary/');
      toast.success('Запис успішно видалено!');
    } catch (error) {
        toast.error(`Виникла помилка при видаленні запису! ${error}`);
    }
  };
  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error.message || 'Щось пішло не так'} />}
      {!!diary && (
        <div className={css.entryDetailsContainer}>
          <DiaryEntryDetails diary={diary} onDelete={deleteDiaryRequest} />
        </div>
      )}
    </div>
  );
}
