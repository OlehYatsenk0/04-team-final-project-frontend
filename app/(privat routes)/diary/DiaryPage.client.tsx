'use client';

import { useState } from 'react';
import css from './DiaryPage.module.css';
import GreetingBlock from '@/components/Diary/GreetingBlock/GreetingBlock';
import DiaryList from '@/components/Diary/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/Diary/DiaryEntryDetails/DiaryEntryDetails';
import EmptyMessage from '@/components/Diary/EmptyMessage/EmptyMessage';
import { useQuery } from '@tanstack/react-query';
import { fetchDiaries } from '@/lib/api/clientApi';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/Diary/ErrorMessage/ErrorMessage';

export default function DiaryPageClient() {
    const { data: diaries, isError, isFetching, error, isSuccess } = useQuery({
        queryKey: ['diaries'],
        queryFn: () => fetchDiaries(),
        refetchOnMount: false,
    });
    const [selectedDiaryIndex, setSelectedDiaryIndex] = useState<number>(0);

    return (
        <section className={css.sectionContainer}>
            <GreetingBlock />
            <div className={css.contentContainer}>
                {!!diaries?.length && <>
                    <DiaryList diaries={diaries} setSelectedDiaryIndex={setSelectedDiaryIndex} />
                    <DiaryEntryDetails diary={diaries[selectedDiaryIndex]} className={css.entryDetails} />
                </>}
                {isFetching && <Loader />}
                {isError && <ErrorMessage message={error.message} />}
                {isSuccess && !diaries?.length && <EmptyMessage message="Наразі записи у щоденнику відсутні" />}
            </div>
        </section>
    );
} 
