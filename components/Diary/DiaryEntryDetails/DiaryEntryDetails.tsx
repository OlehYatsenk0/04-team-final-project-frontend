'use client';

import { useState } from 'react';
import css from './DiaryEntryDetails.module.css';
import type { Diary } from '@/types/diary';
import { getFormattedDate } from '@/app/helpers/utils';
import Modal from '@/components/Modal/Modal';
import { DiaryButton } from '../DiaryButton/DiaryButton';

import AddDiaryEntryForm, {
  DiaryFormValues,
} from '@/components/Diary/AddDiaryEntryModal/AddDiaryEntryForm';
import addModalCss from '@/components/Diary/AddDiaryEntryModal/AddDiaryEntryModal.module.css';

import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/app/const/queryKeys';

interface DiaryEntryDetailsProps {
  diary: Diary;
  onDelete: (id: string) => void;
}

export default function DiaryEntryDetails({
  diary,
  onDelete
}: DiaryEntryDetailsProps) {
  const queryClient = useQueryClient();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteModalClose = () => setIsDeleteModalOpen(false);
  const handleEditModalClose = () => setIsEditModalOpen(false);

  const initialValues: DiaryFormValues = {
    title: diary.title,
    description: diary.description,
    emotions: diary.emotions.map((e) => e._id), // ✅ ids, без any
  };

  const handlePatchSubmit = async (values: DiaryFormValues) => {
    const res = await fetch(`/api/diaries/${diary._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw new Error('PATCH failed');
    }
  };

  const handleEditSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DIARIES] });
    queryClient.invalidateQueries({ queryKey: ['diaries', diary._id] });
    handleEditModalClose();
  };

  return (
    <>
      <div className={css.header}>
        <div className={css.title}>
          <h2 className={css.titleText}>{diary.title}</h2>

          <button
            className={css.editButton}
            onClick={() => setIsEditModalOpen(true)}
            aria-label="Редагувати запис"
            type="button"
          >
            <svg className={css.editSvgIcon} width="21" height="21">
              <use href="/img/sprite.svg#icon-edit"></use>
            </svg>
          </button>
        </div>

        <div className={css.date}>
          <span className={css.dateText}>{getFormattedDate(diary.date)}</span>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className={css.deleteButton}
            type="button"
            aria-label="Видалити запис"
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

      {/* ===== Delete modal ===== */}
      {isDeleteModalOpen && (
        <Modal handleClose={handleDeleteModalClose}>
          <p className={css.modalText}>Ви точно хочете видалити запис?</p>
          <div className={css.buttonsContainer}>
            <DiaryButton role="secondary" onClick={handleDeleteModalClose}>
              Ні
            </DiaryButton>
            <DiaryButton
              role="primary"
              onClick={() => {
                console.log(diary._id);
                onDelete(diary._id);
                handleDeleteModalClose();
              }}
            >
              Так
            </DiaryButton>
          </div>
        </Modal>
      )}

      {/* ===== Edit modal ===== */}
      {isEditModalOpen && (
        <Modal handleClose={handleEditModalClose}>
          <div className={addModalCss.wrapper}>
            <AddDiaryEntryForm
              initialValues={initialValues}
              submitText="Зберегти"
              onSubmitToApi={handlePatchSubmit}
              onSuccess={handleEditSuccess}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
