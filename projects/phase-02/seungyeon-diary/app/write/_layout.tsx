import { Stack } from "expo-router";
import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { Mood, Weather, WriteFormState } from "@/types/diary";

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const defaultForm: WriteFormState = {
  date: today(),
  weather: null,
  mood: null,
  title: "",
  content: "",
};

interface WriteFormContextValue {
  form: WriteFormState;
  setDate: (date: string) => void;
  setWeather: (weather: Weather) => void;
  setMood: (mood: Mood) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  resetForm: () => void;
}

const WriteFormContext = createContext<WriteFormContextValue | null>(null);

export function useWriteForm() {
  const ctx = useContext(WriteFormContext);
  if (!ctx) throw new Error("useWriteForm must be used within WriteFormProvider");
  return ctx;
}

export default function WriteLayout() {
  const [form, setForm] = useState<WriteFormState>(defaultForm);

  const setDate = useCallback((date: string) => setForm((f) => ({ ...f, date })), []);
  const setWeather = useCallback((weather: Weather) => setForm((f) => ({ ...f, weather })), []);
  const setMood = useCallback((mood: Mood) => setForm((f) => ({ ...f, mood })), []);
  const setTitle = useCallback((title: string) => setForm((f) => ({ ...f, title })), []);
  const setContent = useCallback((content: string) => setForm((f) => ({ ...f, content })), []);
  const resetForm = useCallback(() => setForm({ ...defaultForm, date: today() }), []);

  return (
    <WriteFormContext.Provider
      value={{ form, setDate, setWeather, setMood, setTitle, setContent, resetForm }}
    >
      <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }} />
    </WriteFormContext.Provider>
  );
}
