export type Weather = "sunny" | "cloudy" | "rainy" | "snowy" | "windy";
export type Mood = 1 | 2 | 3 | 4 | 5;

export interface DiaryEntry {
  id: string;
  date: string; // 'YYYY-MM-DD'
  weather: Weather;
  mood: Mood;
  title: string;
  content: string;
  createdAt: number; // Date.now()
}

export interface WriteFormState {
  date: string;
  weather: Weather | null;
  mood: Mood | null;
  title: string;
  content: string;
}
