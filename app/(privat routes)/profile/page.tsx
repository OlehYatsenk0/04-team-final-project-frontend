import css from './ProfilePage.module.css';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import Header from '@/components/Header/Header';
import { Metadata } from 'next';
import { QUERY_KEYS } from '@/app/const/queryKeys';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchServerCurrentUser } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Профіль',
  description: 'Переглядайте та редагуйте інформацію вашого профілю',
};

export default async function ProfilePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: fetchServerCurrentUser,
  });

  return (
    <>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className={css.container}>
          <ProfileAvatar />
          <ProfileEditForm />
        </div>
      </HydrationBoundary>
    </>
  );
}
