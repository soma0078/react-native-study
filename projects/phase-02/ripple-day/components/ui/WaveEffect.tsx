import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

interface WaveProps {
  color?: string;
  speed?: number;
  amplitude?: number;
  verticalOffset?: number;
}

function SingleWave({
  color = "rgba(255,255,255,0.15)",
  speed = 2500,
  amplitude = 10,
  verticalOffset = 0,
  delay = 0,
}: WaveProps & { delay?: number }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopX = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(translateX, {
          toValue: -width * 0.5,
          duration: speed,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    const loopY = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: amplitude,
          duration: speed * 0.5,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -amplitude,
          duration: speed * 0.5,
          useNativeDriver: true,
        }),
      ]),
    );

    loopX.start();
    loopY.start();

    return () => {
      loopX.stop();
      loopY.stop();
    };
  }, [translateX, translateY, speed, amplitude, delay]);

  return (
    <Animated.View
      style={[
        styles.wave,
        {
          bottom: verticalOffset,
          transform: [{ translateX }, { translateY }],
        },
      ]}
    >
      <View
        style={[
          styles.waveShape,
          { backgroundColor: color, width: width * 2.5 },
        ]}
      />
    </Animated.View>
  );
}

export function WaveEffect() {
  return (
    <View style={styles.container} pointerEvents="none">
      <SingleWave
        color="rgba(255,255,255,0.08)"
        speed={3500}
        amplitude={12}
        verticalOffset={30}
        delay={0}
      />
      <SingleWave
        color="rgba(255,255,255,0.05)"
        speed={2800}
        amplitude={8}
        verticalOffset={15}
        delay={600}
      />
      <SingleWave
        color="rgba(255,255,255,0.1)"
        speed={4200}
        amplitude={15}
        verticalOffset={0}
        delay={1200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    overflow: "hidden",
  },
  wave: {
    position: "absolute",
    left: -width * 0.25,
  },
  waveShape: {
    height: 60,
    borderRadius: 30,
  },
});
