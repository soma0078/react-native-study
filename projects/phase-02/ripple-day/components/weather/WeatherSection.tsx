import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WeatherData, WaterQualityData } from "@/types/weather";
import { getMoodByTemperature } from "@/constants/mood";
import { NumberTicker } from "@/components/ui/NumberTicker";

interface WeatherSectionProps {
  weather: WeatherData;
  waterQuality: WaterQualityData | null;
  shouldAnimate?: boolean;
}

export function WeatherSection({ weather, waterQuality, shouldAnimate = true }: WeatherSectionProps) {
  const mood = getMoodByTemperature(weather.temperature);

  return (
    <View style={styles.container}>
      {/* Mood 이모지 & 메시지 */}
      <View style={styles.moodContainer}>
        <Text style={styles.moodEmoji}>{mood.emoji}</Text>
        <Text style={styles.moodMessage}>{mood.message}</Text>
        <Text style={styles.moodSubMessage}>{mood.subMessage}</Text>
      </View>

      {/* 메인 온도 */}
      <View style={styles.temperatureContainer}>
        <NumberTicker
          value={weather.temperature}
          suffix="°"
          style={styles.temperatureText}
          decimalPlaces={1}
          shouldAnimate={shouldAnimate}
        />
      </View>

      {/* 날씨 지표 그리드 */}
      <View style={styles.metricsGrid}>
        <MetricCard
          label="습도"
          value={weather.humidity}
          suffix="%"
          icon="💧"
          shouldAnimate={shouldAnimate}
        />
        <MetricCard
          label="풍속"
          value={weather.windSpeed}
          suffix="m/s"
          icon="💨"
          decimalPlaces={1}
          shouldAnimate={shouldAnimate}
        />
        <MetricCard
          label="강수확률"
          value={weather.precipitationProbability}
          suffix="%"
          icon="🌧"
          shouldAnimate={shouldAnimate}
        />
        {waterQuality && (
          <MetricCard
            label="수온"
            value={waterQuality.waterTemperature}
            suffix="°C"
            icon="🌊"
            decimalPlaces={1}
            shouldAnimate={shouldAnimate}
          />
        )}
      </View>
    </View>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
  suffix: string;
  icon: string;
  decimalPlaces?: number;
  shouldAnimate?: boolean;
}

function MetricCard({
  label,
  value,
  suffix,
  icon,
  decimalPlaces = 0,
  shouldAnimate = true,
}: MetricCardProps) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricIcon}>{icon}</Text>
      <NumberTicker
        value={value}
        suffix={suffix}
        style={styles.metricValue}
        decimalPlaces={decimalPlaces}
        duration={1200}
        shouldAnimate={shouldAnimate}
      />
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  moodContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  moodEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  moodMessage: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  moodSubMessage: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
  },
  temperatureContainer: {
    marginVertical: 12,
  },
  temperatureText: {
    fontSize: 88,
    fontWeight: "200",
    color: "#fff",
    letterSpacing: -4,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginTop: 8,
  },
  metricCard: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    minWidth: 80,
  },
  metricIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  metricLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    marginTop: 2,
  },
});
