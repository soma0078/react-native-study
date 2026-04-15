import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet, StyleProp, TextStyle } from "react-native";

interface NumberTickerProps {
  value: number;
  duration?: number;
  suffix?: string;
  style?: StyleProp<TextStyle>;
  decimalPlaces?: number;
  shouldAnimate?: boolean;
}

export function NumberTicker({
  value,
  duration = 1500,
  suffix = "",
  style,
  decimalPlaces = 0,
  shouldAnimate = true,
}: NumberTickerProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [displayText, setDisplayText] = React.useState(
    shouldAnimate ? "0" + suffix : value.toFixed(decimalPlaces) + suffix,
  );

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayText(value.toFixed(decimalPlaces) + suffix);
      return;
    }
    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: false,
    }).start();
  }, [value, duration, animatedValue, shouldAnimate, decimalPlaces, suffix]);

  useEffect(() => {
    const listener = animatedValue.addListener(({ value: v }) => {
      setDisplayText(v.toFixed(decimalPlaces) + suffix);
    });
    return () => animatedValue.removeListener(listener);
  }, [animatedValue, suffix, decimalPlaces]);

  return <Text style={[styles.text, style]}>{displayText}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontVariant: ["tabular-nums"],
  },
});
