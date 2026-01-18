'use client';

import css from './ProfilePage.module.css';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import Header from '@/components/Header/Header';

export default function ProfilePage() {
  return (
  <>
      <Header />
    <div className={css.container}>
      <ProfileAvatar />
      <ProfileEditForm />
      </div> </>
  );
}
