'use client';

import css from './ProfileAvatar.module.css';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { uploadAvatar } from '@/lib/api/clientApi';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfileAvatar() {
  const { user, setUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarKey, setAvatarKey] = useState(Date.now());

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Будь ласка, оберіть файл зображення');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Розмір файлу не повинен перевищувати 5MB');
      return;
    }

    try {
      setIsUploading(true);
      const updatedUser = await uploadAvatar(file);
      setUser(updatedUser);
      setAvatarKey(Date.now());
      toast.success('Аватар успішно оновлено!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Помилка завантаження фото');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const avatarSrc = user?.avatar || '/img/avatar.jpg';

  return (
    <div className={css.container}>
      <Image
        key={avatarKey}
        src={avatarSrc}
        width={132}
        height={132}
        className={css.avatar}
        alt="User's avatar"
      />
      <div className={css.info}>
        <div className={css.details}>
          <h3 className={css.name}>{user?.name || "Ім'я"}</h3>
          <p className={css.email}>{user?.email || 'email@example.com'}</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <button
          type="button"
          className={css.button}
          onClick={handleUploadClick}
          disabled={isUploading}
        >
          {isUploading ? 'Завантаження...' : 'Завантажити нове фото'}
        </button>
      </div>
    </div>
  );
}
