import { Tabs } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "orange",
        headerStyle: {
          backgroundColor: "lightgray",
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Octicons
              name={focused ? "home-fill" : "home"}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: "Recipes",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? "checkbox-multiple-marked-circle"
                  : "checkbox-multiple-marked-circle-outline"
              }
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name={focused ? "user-circle" : "user-circle-o"}
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
