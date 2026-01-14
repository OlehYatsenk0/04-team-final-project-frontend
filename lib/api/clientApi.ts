'use client';

import { api } from './api';
import type { OnboardingFormValues, OnboardingResponse } from '@/types/onboarding';
import type { User } from '@/types/user';
import { setTheme, getThemeFromGender } from '@/lib/utils/theme';

export const uploadAvatar = async (avatarFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append('avatar', avatarFile);

  const response = await api.post<{ avatar: string }>('/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.avatar;
};

export const updateOnboarding = async (data: {
  dueDate: string;
  gender: string;
  avatar?: string;
}): Promise<User> => {
  const themeMap: Record<string, string> = {
    girl: 'pink',
    boy: 'blue',
    unknown: 'neutral',
  };

  const response = await api.put<OnboardingResponse>('/users/profile', {
    dueDate: data.dueDate,
    gender: data.gender,
    theme: themeMap[data.gender] || 'neutral',
    ...(data.avatar && { avatar: data.avatar }),
  });

  return response.data.user;
};

export const completeOnboarding = async (formData: OnboardingFormValues): Promise<User> => {
  let avatarUrl = '';

  if (formData.avatar) {
    avatarUrl = await uploadAvatar(formData.avatar);
  }

  // Конвертуємо 'unknown' в null для API (згідно з вимогами: boy, girl, null)
  const genderForApi = formData.gender === 'unknown' ? null : formData.gender;

  const user = await updateOnboarding({
    dueDate: formData.dueDate,
    gender: genderForApi || 'unknown', // Якщо null, відправляємо 'unknown' для теми
    avatar: avatarUrl,
  });

  setTheme(getThemeFromGender(user.gender));

  return user;
};