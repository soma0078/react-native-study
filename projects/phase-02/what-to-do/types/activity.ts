import { WeatherCondition } from "./weather";

export interface Activity {
  id: string;
  name: string;
  emoji: string;
  suitability: number; // 1~5
  duration: string;
  checklist: string[];
  condition: WeatherCondition;
}
