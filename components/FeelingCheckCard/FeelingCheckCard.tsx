'use client';

import { useState } from 'react';
import css from './FeelingCheckCard.module.css';
import AddDiaryEntryForm from '../Diary/AddDiaryEntryModal/AddDiaryEntryForm';
import Modal from '../Modal/Modal';

import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';

function FeelingCheckCard() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();

  const openModalhandler = () => {
    if (!user) {
      router.push('/sign-up');
      return;
    }

    setOpenModal(true);
  };

  return (
    <>
      <section className={css.feelingCheckCard}>
        <h2 className={css.feelingCheckCard__title}>Як ви себе почуваєте?</h2>
        <p className={css.feelingCheckCard__labelBold}>
          Рекомендація на сьогодні:
        </p>
        <p className={css.feelingCheckCard__labelNormal}>
          Занотуйте незвичні відчуття у тілі.
        </p>
        <Button
          type="button"
          className={css.feelingCheckCard__button}
          onClick={() => {
            openModalhandler();
          }}
        >
          Зробити запис у щоденник
        </Button>
        {openModal && (
          <Modal handleClose={() => setOpenModal(false)}>
            <AddDiaryEntryForm onSuccess={() => setOpenModal(false)} />
          </Modal>
        )}
      </section>
    </>
  );
}

export default FeelingCheckCard;
