import { LoginData, User } from "@/types/user";
import { api } from "./api";
import { Diary } from "@/types/diary";
import { ApiResponse } from "@/types/axios";



export const login = async (loginData: LoginData) => {
  const { data } = await api.post<ApiResponse<User>>(`/auth/login`, loginData);
  return data.data;
};

export const fetchDiaries = async () => {
  const { data } = await api.get<ApiResponse<Diary[]>>(`/diaries`);
  return data.data;
}

export const fetchDiaryById = async (id: string) => {
  const { data } = await api.get<ApiResponse<Diary>>(`/diaries/${id}`);
  return data.data;
} 