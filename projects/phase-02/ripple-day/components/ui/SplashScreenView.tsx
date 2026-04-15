import React, { useEffect, useRef, useCallback } from "react";
import { Animated, StyleSheet, Text, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

interface Props {
  dataReady: boolean;
  onFinish: () => void;
}

export function SplashScreenView({ dataReady, onFinish }: Props) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const ripple1Scale = useRef(new Animated.Value(0)).current;
  const ripple1Opacity = useRef(new Animated.Value(0.6)).current;
  const ripple2Scale = useRef(new Animated.Value(0)).current;
  const ripple2Opacity = useRef(new Animated.Value(0.4)).current;
  const ripple3Scale = useRef(new Animated.Value(0)).current;
  const ripple3Opacity = useRef(new Animated.Value(0.2)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;

  // ref로 최신 값을 항상 읽을 수 있게 유지
  const dataReadyRef = useRef(dataReady);
  const introFinished = useRef(false);
  const outroStarted = useRef(false);

  useEffect(() => {
    dataReadyRef.current = dataReady;
  }, [dataReady]);

  const startOutro = useCallback(() => {
    if (outroStarted.current) return;
    outroStarted.current = true;

    setTimeout(() => {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 300);
  }, [containerOpacity, onFinish]);

  // dataReady가 바뀔 때 인트로가 이미 끝났으면 아웃트로 시작
  useEffect(() => {
    if (dataReady && introFinished.current) {
      startOutro();
    }
  }, [dataReady, startOutro]);

  useEffect(() => {
    // 1단계: 로고 페이드인 + 스케일
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 2단계: 서브타이틀 + 리플 애니메이션
      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        createRippleSequence(ripple1Scale, ripple1Opacity, 0),
        createRippleSequence(ripple2Scale, ripple2Opacity, 200),
        createRippleSequence(ripple3Scale, ripple3Opacity, 400),
      ]).start(() => {
        // 인트로 완료 — ref로 최신 dataReady 값을 읽음
        introFinished.current = true;
        if (dataReadyRef.current) {
          startOutro();
        }
      });
    });
  }, []);

  const rippleSize = width * 1.2;

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
      <LinearGradient
        colors={["#0a1628", "#0d2147", "#1565c0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* 리플 원 */}
      <Animated.View
        style={[
          styles.ripple,
          {
            width: rippleSize,
            height: rippleSize,
            borderRadius: rippleSize / 2,
            opacity: ripple1Opacity,
            transform: [{ scale: ripple1Scale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ripple,
          {
            width: rippleSize,
            height: rippleSize,
            borderRadius: rippleSize / 2,
            opacity: ripple2Opacity,
            transform: [{ scale: ripple2Scale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ripple,
          {
            width: rippleSize,
            height: rippleSize,
            borderRadius: rippleSize / 2,
            opacity: ripple3Opacity,
            transform: [{ scale: ripple3Scale }],
          },
        ]}
      />

      {/* 로고 */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>🌊</Text>
        </View>
        <Text style={styles.appName}>ripple day</Text>
        <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
          오늘의 날씨와 함께하는 하루
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

function createRippleSequence(
  scale: Animated.Value,
  opacity: Animated.Value,
  delay: number,
): Animated.CompositeAnimation {
  return Animated.sequence([
    Animated.delay(delay),
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]),
  ]);
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  ripple: {
    position: "absolute",
    borderWidth: 1.5,
    borderColor: "rgba(100, 181, 246, 0.5)",
  },
  logoContainer: {
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  icon: {
    fontSize: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.55)",
    letterSpacing: 0.5,
  },
});
