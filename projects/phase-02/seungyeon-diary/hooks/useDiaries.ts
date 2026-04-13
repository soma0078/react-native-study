import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import type { DiaryEntry } from "@/types/diary";

const STORAGE_KEY = "diaries";

async function loadDiaries(): Promise<DiaryEntry[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as DiaryEntry[];
}

async function saveDiaries(entries: DiaryEntry[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function useDiaries() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await loadDiaries();
    const sorted = [...data].sort((a, b) => b.createdAt - a.createdAt);
    setDiaries(sorted);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(async (entry: DiaryEntry) => {
    const existing = await loadDiaries();
    const updated = [entry, ...existing.filter((e) => e.id !== entry.id)];
    await saveDiaries(updated);
    const sorted = [...updated].sort((a, b) => b.createdAt - a.createdAt);
    setDiaries(sorted);
  }, []);

  const remove = useCallback(async (id: string) => {
    const existing = await loadDiaries();
    const updated = existing.filter((e) => e.id !== id);
    await saveDiaries(updated);
    setDiaries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const getById = useCallback(
    (id: string) => diaries.find((e) => e.id === id) ?? null,
    [diaries],
  );

  return { diaries, loading, save, remove, getById, refresh };
}
