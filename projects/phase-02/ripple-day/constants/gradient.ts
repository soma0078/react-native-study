import { SkyCondition, PrecipitationType } from "@/types/weather";

export interface GradientConfig {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
}

function getHour(): number {
  return new Date().getHours();
}

export function getGradientConfig(
  skyCondition: SkyCondition,
  precipitationType: PrecipitationType,
): GradientConfig {
  const hour = getHour();
  const isNight = hour < 6 || hour >= 20;
  const isSunset = hour >= 17 && hour < 20;
  const isDawn = hour >= 5 && hour < 7;

  // 비/눈 오는 경우
  if (precipitationType !== 0) {
    return {
      colors: ["#2c3e50", "#4a6274", "#6b8fa3"],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    };
  }

  // 흐린 날
  if (skyCondition === 4) {
    return {
      colors: isNight
        ? ["#1a1a2e", "#2d2d44", "#3d3d5c"]
        : ["#636e7b", "#8a9ba8", "#b0bec5"],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    };
  }

  // 새벽
  if (isDawn) {
    return {
      colors: ["#1a1a2e", "#2d1b69", "#e91e8c"],
      start: { x: 0, y: 0 },
      end: { x: 0.5, y: 1 },
    };
  }

  // 저녁 노을
  if (isSunset) {
    return {
      colors: ["#1a1a2e", "#e96c1e", "#f5c842"],
      start: { x: 0, y: 0 },
      end: { x: 0.3, y: 1 },
    };
  }

  // 밤
  if (isNight) {
    return {
      colors: ["#0a0e1a", "#1a2744", "#0d3b6e"],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    };
  }

  // 맑은 낮
  return {
    colors: ["#0a1628", "#1565c0", "#1e88e5"],
    start: { x: 0, y: 0 },
    end: { x: 0.3, y: 1 },
  };
}
