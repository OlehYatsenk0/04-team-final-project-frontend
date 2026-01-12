import { ComfortTip } from '@/types/week';
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
        <div className={css.babyTodayCard__imageBox}>
          <Image
            src={baby.image}
            alt="Малюк"
            width={287}
            height={216}
            priority
          />
        </div>
        <p>
          <strong>Розмір:</strong> Приблизно {baby.babySize} см.
        </p>
        <p>
          <strong>Вага:</strong> Близько {baby.babyWeight} грамів.
        </p>
        <p>
          <strong>Активність:</strong> {baby.babyActivity}
        </p>
        <p>{baby.babyDevelopment}</p>
      </section>
    </>
  );
}

export default BabyTodayCard;
