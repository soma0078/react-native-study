export interface WeatherData {
  temperature: number; // 기온 (°C)
  humidity: number; // 습도 (%)
  windSpeed: number; // 풍속 (m/s)
  precipitationProbability: number; // 강수확률 (%)
  skyCondition: SkyCondition; // 하늘 상태
  precipitationType: PrecipitationType; // 강수 형태
  baseDate: string;
  baseTime: string;
}

export type SkyCondition = 1 | 3 | 4; // 1: 맑음, 3: 구름많음, 4: 흐림

export type PrecipitationType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
// 0: 없음, 1: 비, 2: 비/눈, 3: 눈, 4: 소나기, 5: 빗방울, 6: 빗방울눈날림, 7: 눈날림

export interface WaterQualityData {
  waterTemperature: number; // 수온 (°C)
  stationName: string; // 관측소명
}

export type WeatherLoadingState = "idle" | "loading" | "success" | "error";
