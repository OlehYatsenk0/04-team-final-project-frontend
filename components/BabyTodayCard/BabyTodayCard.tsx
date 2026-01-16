import css from './BabyTodayCard.module.css';
import Image from 'next/image';

interface BabyTodayCardProps {
  baby: {
    analogy: string | null;
    babySize: number;
    babyWeight: number;
    babyActivity: string;
    babyDevelopment: string;
    interestingFact: string;
    image: string;
  };
}

function BabyTodayCard({ baby }: BabyTodayCardProps) {
  return (
    <>
      <section className={css.babyTodayCard}>
        <h2 className={css.babyTodayCard__title}>Малюк сьогодні</h2>
        <div className={css.babyTodayCard__imageWithTextBox}>
          <div className={css.babyTodayCard__imageBox}>
            <Image
              className={css.babyTodayCard__image}
              src={baby.image}
              alt="Малюк"
              width={287}
              height={216}
              priority
            />
          </div>
          <div className={css.babyTodayCard__paragraphBox}>
            <p className={css.babyTodayCard__paragraph}>
              <strong>Розмір:</strong> Приблизно {baby.babySize} см.
            </p>
            <p className={css.babyTodayCard__paragraph}>
              <strong>Вага:</strong> Близько {baby.babyWeight} грамів.
            </p>
            <p className={css.babyTodayCard__paragraph}>
              <strong>Активність:</strong> {baby.babyActivity}
            </p>
          </div>
        </div>

        <p className={css.babyTodayCard__paragraph}>{baby.babyDevelopment}</p>
      </section>
    </>
  );
}

export default BabyTodayCard;
