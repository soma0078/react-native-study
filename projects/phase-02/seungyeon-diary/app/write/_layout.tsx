import { Stack } from "expo-router";
import { createContext, useCallback, useContext, useState } from "react";
import type { WriteFormState } from "@/types/diary";

const makeDefault = (): WriteFormState => {
  const d = new Date();
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return { date, weather: null, mood: null, title: "", content: "" };
};

interface WriteFormContextValue {
  form: WriteFormState;
  update: (patch: Partial<WriteFormState>) => void;
  resetForm: () => void;
}

const WriteFormContext = createContext<WriteFormContextValue | null>(null);

export function useWriteForm() {
  const ctx = useContext(WriteFormContext);
  if (!ctx) throw new Error("useWriteForm must be used within WriteFormProvider");
  return ctx;
}

export default function WriteLayout() {
  const [form, setForm] = useState<WriteFormState>(makeDefault);

  const update = useCallback(
    (patch: Partial<WriteFormState>) => setForm((f) => ({ ...f, ...patch })),
    [],
  );
  const resetForm = useCallback(() => setForm(makeDefault()), []);

  return (
    <WriteFormContext.Provider value={{ form, update, resetForm }}>
      <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }} />
    </WriteFormContext.Provider>
  );
}
