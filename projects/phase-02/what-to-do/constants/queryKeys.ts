import { WeatherRequest } from "@/types/weather";

export const QUERY_KEYS = {
  weather: ({ lat, lon }: WeatherRequest) => ["weather", lat, lon] as const,
  hangang: () => ["hangang"] as const,
} as const;
