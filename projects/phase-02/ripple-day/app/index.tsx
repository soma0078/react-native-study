import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";
import { useWeather } from "@/hooks/useWeather";
import { useLocation } from "@/hooks/useLocation";
import { getGradientConfig } from "@/constants/gradient";
import { getRecommendedActivities } from "@/constants/activities";
import { WeatherSection } from "@/components/weather/WeatherSection";
import { ActivityList } from "@/components/activity/ActivityList";
import { ActivityBottomSheet } from "@/components/activity/ActivityBottomSheet";
import { WaveEffect } from "@/components/ui/WaveEffect";
import { Activity } from "@/types/activity";

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const { weather, waterQuality, state, error, reload } = useWeather();
  const { permissionStatus, isChecking } = useLocation();

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 권한 체크 후 온보딩 라우팅
  useEffect(() => {
    if (!isChecking && permissionStatus === "undetermined") {
      router.replace("/permission");
    }
  }, [isChecking, permissionStatus]);

  // 앱 준비 완료 시 Splash 숨기기 + 페이드인
  useEffect(() => {
    if (state === "success" || state === "error") {
      SplashScreen.hideAsync().then(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [state, fadeAnim]);

  const gradientConfig = weather
    ? getGradientConfig(weather.skyCondition, weather.precipitationType)
    : {
        colors: ["#0a1628", "#1565c0", "#1e88e5"],
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
      };

  const activities = weather
    ? getRecommendedActivities(
        weather.temperature,
        weather.precipitationProbability,
      )
    : [];

  const handleActivityPress = useCallback((activity: Activity) => {
    setSelectedActivity(activity);
  }, []);

  const handleBottomSheetClose = useCallback(() => {
    setSelectedActivity(null);
  }, []);

  if (state === "loading" || state === "idle") {
    return (
      <LinearGradient
        colors={["#0a1628", "#1565c0"]}
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color="rgba(255,255,255,0.8)" />
        <Text style={styles.loadingText}>날씨 정보를 불러오는 중...</Text>
      </LinearGradient>
    );
  }

  if (state === "error") {
    return (
      <LinearGradient
        colors={["#0a1628", "#1c2a3a"]}
        style={styles.loadingContainer}
      >
        <Text style={styles.errorEmoji}>🌥</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={reload}>
          <Text style={styles.retryText}>다시 시도</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.root, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={gradientConfig.colors as [string, string, ...string[]]}
          start={gradientConfig.start}
          end={gradientConfig.end}
          style={styles.root}
        >
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* 날씨 섹션 */}
            {weather && (
              <WeatherSection weather={weather} waterQuality={waterQuality} />
            )}

            {/* 활동 추천 섹션 */}
            <ActivityList
              activities={activities}
              onActivityPress={handleActivityPress}
            />

            <View style={styles.bottomPadding} />
          </ScrollView>

          {/* 물결 효과 */}
          <WaveEffect />
        </LinearGradient>
      </Animated.View>

      {/* 활동 상세 Bottom Sheet */}
      <ActivityBottomSheet
        activity={selectedActivity}
        onClose={handleBottomSheetClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
  },
  bottomPadding: {
    height: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
  },
  errorEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  retryButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 13,
  },
  retryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
