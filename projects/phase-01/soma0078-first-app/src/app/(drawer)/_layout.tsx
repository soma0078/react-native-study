import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Drawer } from "expo-router/drawer";
import { useWindowDimensions } from "react-native";

export default function DrawerLayout() {
  const dimensions = useWindowDimensions();

  const isMobile = dimensions.width < 768;
  return (
    <Drawer
      screenOptions={{
        drawerActiveBackgroundColor: "#fef3c7",
        drawerActiveTintColor: "orange",
        drawerInactiveTintColor: "gray",
        drawerStyle: { width: isMobile ? 240 : 80 },
        drawerType: isMobile ? "front" : "permanent",
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: isMobile ? "Home" : "",
          drawerIcon: ({ focused, color }) => (
            <Octicons
              name={focused ? "home-fill" : "home"}
              size={20}
              color={color}
            />
          ),
          title: "홈",
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: isMobile ? "Settings" : "",
          drawerIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings-sharp" : "settings-outline"}
              size={20}
              color={color}
            />
          ),
          title: "설정",
        }}
      />
    </Drawer>
  );
}
