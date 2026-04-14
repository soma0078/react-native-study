import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";

interface NumberTickerProps {
  value: number;
  duration?: number;
  suffix?: string;
  style?: object;
  decimalPlaces?: number;
}

export function NumberTicker({
  value,
  duration = 1500,
  suffix = "",
  style,
  decimalPlaces = 0,
}: NumberTickerProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const displayValue = useRef(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: false,
    }).start();
  }, [value, duration, animatedValue]);

  const [displayText, setDisplayText] = React.useState(
    value.toFixed(decimalPlaces) + suffix,
  );

  useEffect(() => {
    const listener = animatedValue.addListener(({ value: v }) => {
      displayValue.current = v;
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
