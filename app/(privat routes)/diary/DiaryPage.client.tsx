'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import css from './DiaryPage.module.css';
import DiaryList from '@/components/Diary/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/Diary/DiaryEntryDetails/DiaryEntryDetails';
import { useQuery } from '@tanstack/react-query';
import { fetchDiaries, deleteDiary } from '@/lib/api/clientApi';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/Diary/ErrorMessage/ErrorMessage';
import { QUERY_KEYS } from '@/app/const/queryKeys';
import {
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddDiaryEntryModal from '@/components/Diary/AddDiaryEntryModal/AddDiaryEntryModal';

export default function DiaryPageClient() {
  const queryClient = useQueryClient();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const openCreate = () => setIsCreateOpen(true);
  const closeCreate = () => setIsCreateOpen(false);

  const {
    data: diaries,
    isError,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: [QUERY_KEYS.DIARIES],
    queryFn: () => fetchDiaries(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const { mutate: deleteDiaryRequest, isPending: isDeletingDiary } =
    useMutation({
      mutationFn: deleteDiary,
      onSuccess: () => {
        toast.success('Запис успішно видалено!');
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DIARIES] });
      },
      onError: () => {
        toast.error('Виникла помилка при видаленні запису!');
      },
    });

  const [selectedDiaryIndex, setSelectedDiaryIndex] = useState<number>(0);
  const selectedDiary = diaries?.[selectedDiaryIndex];

  return (
    <section className={css.sectionContainer}>
      <div className={css.contentContainer}>
        <>
          <DiaryList
            diaries={diaries || []}
            isEmpty={isSuccess && !diaries?.length}
            setSelectedDiaryIndex={setSelectedDiaryIndex}
            isPending={isDeletingDiary}
            onCreateClick={openCreate}
          />
          <div className={css.entryDetailsContainer}>
            <div className={css.animatedContent}>
              <AnimatePresence mode="sync">
                <motion.div
                  key={diaries?.[selectedDiaryIndex]?._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                  }}
                >
                  {!!selectedDiary && (
                    <DiaryEntryDetails
                      onDelete={deleteDiaryRequest}
                      diary={diaries[selectedDiaryIndex]}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </>
        {(isLoading || isDeletingDiary) && <Loader className={css.loader} />}
        {isError && (
          <ErrorMessage
            message={error.message}
            className={clsx({
              [css.error]: isError,
            })}
          />
        )}
        {isCreateOpen && (
          <AddDiaryEntryModal
            onClose={closeCreate}
            onCreated={() => {
              queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DIARIES] });
              closeCreate();
            }}
          />
        )}
      </div>
    </section>
  );
}
