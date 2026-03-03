import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
  <Tabs
   screenOptions={{
    tabBarActiveTintColor:'purple',
    headerStyle: {
        backgroundColor: 'lavender'
    },
    headerShadowVisible: false,
    tabBarStyle: {
        backgroundColor: 'silver'
    }
   }}
>
      <Tabs.Screen name="index" options={{title: 'Home'}} />
      <Tabs.Screen name="about" options={{title: 'About'}} />
      <Tabs.Screen name="profile" options={{ title: 'Profile'}} />
    </Tabs>
  );
}