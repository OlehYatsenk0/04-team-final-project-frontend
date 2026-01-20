import { useState } from 'react';
import css from './FeelingCheckCard.module.css';
import AddDiaryEntryForm from '../Diary/AddDiaryEntryModal/AddDiaryEntryForm';
import Modal from '../Modal/Modal';

function FeelingCheckCard() {
  const [openModal, setOpenModal] = useState(false);

  const openModalhandler = () => {
    setOpenModal(true);
    console.log('openModalhandler');
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
        <button
          type="button"
          className={css.feelingCheckCard__button}
          onClick={() => {
            openModalhandler();
          }}
        >
          Зробити запис у щоденник
        </button>
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
