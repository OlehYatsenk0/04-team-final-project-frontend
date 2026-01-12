'use client';

import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import Loader from '@/components/Loader/Loader';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import { fetchWeek } from '@/lib/api/api';
import { Week } from '@/types/week';
import { useQuery } from '@tanstack/react-query';

function DashboardPageClient() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['week'],
    queryFn: fetchWeek,
  });

  console.log(data);
  if (isLoading) return <Loader />;
  if (isError || !data) return null;

  return (
    <>
      <StatusBlock weekNumber={data.weekNumber} dayToBirth={data.daysToBirth} />
      <BabyTodayCard baby={data.baby} mom={data.mom} />
    </>
  );
}

export default DashboardPageClient;
