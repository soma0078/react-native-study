import type { Weather, Mood } from "@/types/diary";

export const COLORS = {
  primary: "#7C6FF7",
  primaryLight: "#EDE9FE",
  background: "#F8F7FF",
  surface: "#FFFFFF",
  text: "#1A1A2E",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E5E7EB",
  danger: "#EF4444",
  dangerLight: "#FEE2E2",
  success: "#10B981",
  white: "#FFFFFF",
  disabled: "#D1D5DB",
};

export const WEATHER_OPTIONS: {
  value: Weather;
  icon: string;
  label: string;
}[] = [
  { value: "sunny", icon: "☀️", label: "맑음" },
  { value: "cloudy", icon: "☁️", label: "흐림" },
  { value: "rainy", icon: "🌧️", label: "비" },
  { value: "snowy", icon: "❄️", label: "눈" },
  { value: "windy", icon: "💨", label: "바람" },
];

export const MOOD_OPTIONS: { value: Mood; icon: string; label: string }[] = [
  { value: 1, icon: "😢", label: "매우 나쁨" },
  { value: 2, icon: "😕", label: "나쁨" },
  { value: 3, icon: "😐", label: "보통" },
  { value: 4, icon: "😊", label: "좋음" },
  { value: 5, icon: "😄", label: "매우 좋음" },
];

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
