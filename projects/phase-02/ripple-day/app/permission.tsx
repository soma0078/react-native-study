import React, { useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useLocation } from "@/hooks/useLocation";

export default function PermissionScreen() {
  const { requestPermission } = useLocation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 12,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleAllow = async () => {
    await requestPermission();
    router.replace("/");
  };

  const handleSkip = () => {
    router.replace("/");
  };

  return (
    <LinearGradient
      colors={["#0a1628", "#1565c0", "#1e88e5"]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.icon}>📍</Text>
        <Text style={styles.title}>위치 정보 허용</Text>
        <Text style={styles.description}>
          현재 위치를 기반으로{"\n"}
          정확한 날씨 정보와{"\n"}
          최적의 활동을 추천해드려요
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.allowButton} onPress={handleAllow}>
            <Text style={styles.allowButtonText}>위치 허용하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>나중에 하기</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  icon: {
    fontSize: 72,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 17,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 48,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  allowButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  allowButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1565c0",
  },
  skipButton: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  skipButtonText: {
    fontSize: 15,
    color: "rgba(255,255,255,0.6)",
  },
});
