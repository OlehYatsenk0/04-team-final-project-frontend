'use client';
import clsx from 'clsx';
import css from './DiaryEntryDetails.module.css';
import { Diary } from '@/types/diary';

interface DiaryEntryDetailsProps {
    diary: Diary;
    className?: string;
}

export default function DiaryEntryDetails({ diary, className = '' }: DiaryEntryDetailsProps) {
    return (
        <div className={clsx(css.container, className)}>
            <div className={css.header}>
                <div className={css.title}>
                    <h2 className={css.titleText}>{diary.title}</h2>
                    <button className={css.editButton}>
                        <svg className={css.editSvgIcon} width="21" height="21">
                            <use href="/img/sprite.svg#icon-edit"></use>
                        </svg>
                    </button>
                </div>
                <div className={css.date}>
                    <span className={css.dateText}>15 липня 2025</span>
                    <button className={css.deleteButton}>
                        <svg className={css.deleteSvgIcon} width="24" height="24">
                            <use href="/img/sprite.svg#icon-delete"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={css.description}>
                <p>{diary.description}</p>
            </div>
            <div className={css.labels}>
                {diary.emotions.map((emotion) => (
                    <span className={css.label} key={emotion._id}>{emotion.title}</span>
                ))}
            </div>
        </div>
    );
}