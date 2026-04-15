import { useState, useEffect, useCallback } from "react";
import {
  WeatherData,
  WaterQualityData,
  WeatherLoadingState,
} from "@/types/weather";
import { latLonToGrid } from "@/utils/gridCoord";
import { Coordinates } from "@/hooks/useLocation";

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function getBaseTime(date: Date): string {
  const hour = date.getHours();
  const minute = date.getMinutes();
  // 기상청 단기예보 발표 시각: 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300
  const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];
  let baseHour = baseTimes[0];
  for (const t of baseTimes) {
    if (hour > t || (hour === t && minute >= 10)) {
      baseHour = t;
    }
  }
  return String(baseHour).padStart(2, "0") + "00";
}

async function fetchWeatherData(
  apiKey: string,
  coords: Coordinates,
): Promise<WeatherData> {
  const { nx, ny } = latLonToGrid(coords.latitude, coords.longitude);
  const now = new Date();
  const baseDate = formatDate(now);
  const baseTime = getBaseTime(now);

  const url =
    `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst` +
    `?serviceKey=${apiKey}` +
    `&numOfRows=100` +
    `&pageNo=1` +
    `&dataType=JSON` +
    `&base_date=${baseDate}` +
    `&base_time=${baseTime}` +
    `&nx=${nx}` +
    `&ny=${ny}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  const items: Array<{
    category: string;
    fcstValue: string;
    fcstDate: string;
    fcstTime: string;
  }> = json?.response?.body?.items?.item ?? [];

  // 가장 가까운 예보 시각 기준으로 파싱
  const now_str =
    formatDate(now) + String(now.getHours()).padStart(2, "0") + "00";
  const grouped: Record<string, Record<string, string>> = {};

  for (const item of items) {
    const key = item.fcstDate + item.fcstTime;
    if (!grouped[key]) grouped[key] = {};
    grouped[key][item.category] = item.fcstValue;
  }

  const times = Object.keys(grouped).sort();
  const nearestKey = times.find((t) => t >= now_str) ?? times[0];
  const data = grouped[nearestKey] ?? {};

  return {
    temperature: parseFloat(data["TMP"] ?? "20"),
    humidity: parseFloat(data["REH"] ?? "50"),
    windSpeed: parseFloat(data["WSD"] ?? "1"),
    precipitationProbability: parseFloat(data["POP"] ?? "0"),
    skyCondition: parseInt(data["SKY"] ?? "1") as 1 | 3 | 4,
    precipitationType: parseInt(data["PTY"] ?? "0") as
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7,
    baseDate,
    baseTime,
  };
}

async function fetchWaterQuality(): Promise<WaterQualityData> {
  // 서울시 한강 수질 API (고정 관측소: 한강대교)
  const url = `http://openAPI.seoul.go.kr:8088/sample/json/WPOSInformationTime/1/5/`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    const row = json?.WPOSInformationTime?.row?.[0];
    return {
      waterTemperature: parseFloat(row?.WATER_TEMP ?? "15"),
      stationName: row?.SITE_ID ?? "한강대교",
    };
  } catch {
    // API 키 없이 fallback
    return { waterTemperature: 16, stationName: "한강대교" };
  }
}

export function useWeather(coords: Coordinates) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [waterQuality, setWaterQuality] = useState<WaterQualityData | null>(
    null,
  );
  const [state, setState] = useState<WeatherLoadingState>("idle");
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.EXPO_PUBLIC_WEATHER_SERVICE_API_KEY ?? "";

  const load = useCallback(async () => {
    if (!apiKey) {
      setError("날씨 API 키가 설정되지 않았어요.\n.env.local 파일을 확인해주세요.");
      setState("error");
      return;
    }
    setState("loading");
    setError(null);
    try {
      const [weatherData, waterData] = await Promise.all([
        fetchWeatherData(apiKey, coords),
        fetchWaterQuality(),
      ]);
      setWeather(weatherData);
      setWaterQuality(waterData);
      setState("success");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "날씨 정보를 불러오지 못했어요",
      );
      setState("error");
    }
  }, [apiKey, coords.latitude, coords.longitude]);

  useEffect(() => {
    load();
  }, [load]);

  return { weather, waterQuality, state, error, reload: load };
}
