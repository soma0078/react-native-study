import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{title: 'Not Found'}}/>
      <View><Link href="/">Go Home</Link></View>
    </>
  );
}