export type WeatherType = "sunny" | "cloudy" | "rainy" | "snowy";
export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface DiaryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  weather: WeatherType;
  mood: MoodLevel;
  title: string;
  content: string;
  createdAt: number; // timestamp
}

export interface WriteFormState {
  date: string;
  weather: WeatherType | null;
  mood: MoodLevel | null;
  title: string;
  content: string;
}
