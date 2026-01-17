'use client';

import { useState } from 'react';
import css from './DiaryEntryDetails.module.css';
import { Diary } from '@/types/diary';
import { getFormattedDate } from '@/app/helpers/utils';
import Modal from '@/components/Modal/Modal';
import { DiaryButton } from '../DiaryButton/DiaryButton';

interface DiaryEntryDetailsProps {
  diary: Diary;
}

export default function DiaryEntryDetails({ diary }: DiaryEntryDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
          <span className={css.dateText}>{getFormattedDate(diary.date)}</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className={css.deleteButton}
          >
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
          <span className={css.label} key={emotion._id}>
            {emotion.title}
          </span>
        ))}
      </div>
      {isModalOpen && (
        <Modal handleClose={handleModalClose}>
          <p className={css.modalText}>Ви точно хочете видалити запис?</p>
          <div className={css.buttonsContainer}>
            <DiaryButton role="secondary" onClick={handleModalClose}>
              Ні
            </DiaryButton>
            <DiaryButton role="primary" onClick={handleModalClose}>
              Так
            </DiaryButton>
          </div>
        </Modal>
      )}
    </>
  );
}
