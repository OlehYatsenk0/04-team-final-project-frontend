'use client';

import { useQuery } from '@tanstack/react-query';
import { PregnancyWeek } from '@/types/week';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import css from './JourneyPage.module.css';
import { fetchWeekClient } from '@/lib/api/clientApi';
import Loader from '@/components/Loader/Loader';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import { useAuthStore } from '@/lib/store/authStore';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';

interface Props {
  weekNumber: number;
}

function JourneyPageClient({ weekNumber }: Props) {
  const user = useAuthStore((state) => state.user);

  const { data, isLoading } = useQuery<PregnancyWeek>({
    queryKey: ['week', weekNumber],
    queryFn: () => fetchWeekClient(weekNumber),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={css.page}>
      <GreetingBlock userName={user?.name} />
      <WeekSelector weekNumber={weekNumber} />
      {isLoading && <Loader />}
      {data && <JourneyDetails data={data} />}
    </div>
  );
}

export default JourneyPageClient;
