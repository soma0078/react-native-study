import AsyncStorage from '@react-native-async-storage/async-storage';
import { DiaryEntry } from '@/types';

const STORAGE_KEY = 'diaries';

export const getDiaries = async (): Promise<DiaryEntry[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading diaries:', error);
    return [];
  }
};

export const saveDiary = async (entry: DiaryEntry): Promise<void> => {
  try {
    const diaries = await getDiaries();
    diaries.push(entry);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(diaries));
  } catch (error) {
    console.error('Error saving diary:', error);
  }
};

export const getDiaryById = async (id: string): Promise<DiaryEntry | null> => {
  try {
    const diaries = await getDiaries();
    return diaries.find((d) => d.id === id) || null;
  } catch (error) {
    console.error('Error reading diary:', error);
    return null;
  }
};

export const deleteDiary = async (id: string): Promise<void> => {
  try {
    const diaries = await getDiaries();
    const filtered = diaries.filter((d) => d.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting diary:', error);
  }
};
