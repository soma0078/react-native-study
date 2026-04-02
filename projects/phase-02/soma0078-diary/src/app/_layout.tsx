import { Stack } from "expo-router";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {/* initialWindowMetrics = { top: 47, bottom: 34, left: 0, right: 0 } */}
      {/* 처음부터 정확한 값으로 시작 → 레이아웃 깜빡임 없음 */}
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  );
}
