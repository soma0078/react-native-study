import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Keyboard } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenListeners={{
        tabPress: () => {
          Keyboard.dismiss();
        },
      }}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F6FBF1',
        },
        headerTitleStyle: {
          color: '#6A7B63',
          fontWeight: '700',
        },
        headerShadowVisible: false,
        tabBarActiveTintColor: '#F29AB2',
        tabBarInactiveTintColor: '#9FB2A6',
        tabBarStyle: {
          backgroundColor: '#FCFFFB',
          borderTopWidth: 0,
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '일기 목록',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'list' : 'list-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: '일기 쓰기',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'create' : 'create-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '앱 소개',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}