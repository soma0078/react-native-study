import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import { SplashScreenView } from "@/components/ui/SplashScreenView";
import { Activity } from "@/types/activity";

void SplashScreen.preventAutoHideAsync().catch(() => {
  // 이미 호출되었거나 상태 불일치로 실패할 수 있으므로 무시
});

export default function HomeScreen() {
  const { permissionStatus, isChecking, coords, locationName } = useLocation();
  const { weather, waterQuality, state, error, reload } = useWeather(coords);

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const [showSplash, setShowSplash] = useState(true);
  const [dataReady, setDataReady] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 권한 체크 후 온보딩 라우팅
  useEffect(() => {
    if (!isChecking && permissionStatus === "undetermined") {
      router.replace("/permission");
    }
  }, [isChecking, permissionStatus]);

  // 데이터 준비 감지
  useEffect(() => {
    if (state === "success" || state === "error") {
      setDataReady(true);
    }
  }, [state]);

  // 네이티브 스플래시 숨기기 (커스텀 스플래시로 전환)
  useEffect(() => {
    void SplashScreen.hideAsync().catch(() => {
      // 이미 숨겨졌거나 상태 불일치로 실패할 수 있으므로 무시
    });
  }, []);

  // 커스텀 스플래시 종료 후 콘텐츠 페이드인 + 숫자 애니메이션 시작
  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
    setShouldAnimate(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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

  return (
    <View style={styles.root}>
      {/* 메인 콘텐츠 */}
      <Animated.View style={[styles.root, { opacity: fadeAnim }]}>
        {state === "error" ? (
          <LinearGradient
            colors={["#0a1628", "#1c2a3a"]}
            style={styles.errorContainer}
          >
            <Text style={styles.errorEmoji}>🌥</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={reload}>
              <Text style={styles.retryText}>다시 시도</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
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
              {weather && (
                <WeatherSection
                  weather={weather}
                  waterQuality={waterQuality}
                  shouldAnimate={shouldAnimate}
                  locationName={locationName}
                />
              )}
              <ActivityList
                activities={activities}
                onActivityPress={handleActivityPress}
              />
              <View style={styles.bottomPadding} />
            </ScrollView>
            <WaveEffect />
          </LinearGradient>
        )}
      </Animated.View>

      {/* 커스텀 스플래시 스크린 */}
      {showSplash && (
        <SplashScreenView dataReady={dataReady} onFinish={handleSplashFinish} />
      )}

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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
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
