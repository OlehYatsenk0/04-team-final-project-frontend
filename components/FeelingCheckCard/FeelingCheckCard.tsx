import css from './FeelingCheckCard.module.css';

function FeelingCheckCard() {
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
          onClick={() => {}}
        >
          Зробити запис у щоденник
        </button>
      </section>
    </>
  );
}

export default FeelingCheckCard;
