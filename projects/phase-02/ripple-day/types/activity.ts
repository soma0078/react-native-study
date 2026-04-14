export interface Activity {
  id: string;
  name: string;
  emoji: string;
  description: string;
  suitabilityScore: number; // 1-100
  duration: string; // 예: "30분", "1시간"
  items: ChecklistItem[];
  category: ActivityCategory;
  minTemp?: number;
  maxTemp?: number;
  maxPrecipitation?: number; // 최대 강수확률
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export type ActivityCategory =
  | "outdoor"
  | "water"
  | "indoor"
  | "exercise"
  | "leisure";
