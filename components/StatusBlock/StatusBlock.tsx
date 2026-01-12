import css from './StatusBlock.module.css';

interface StatusBlockProps {
  weekNumber: number;
  dayToBirth: number;
}

function StatusBlock({ weekNumber, dayToBirth }: StatusBlockProps) {
  return (
    <>
      <section className={css.statusBlock}>
        <div className={css.statusBlock__block}>
          <p className={css.statusBlock__label}>Тиждень</p>
          <p className={css.statusBlock__value}>{weekNumber}</p>
        </div>
        <div className={css.statusBlock__block}>
          <p className={css.statusBlock__label}>Днів до зустрічі</p>
          <p className={css.statusBlock__value}>~${dayToBirth}</p>
        </div>
      </section>
    </>
  );
}

export default StatusBlock;
