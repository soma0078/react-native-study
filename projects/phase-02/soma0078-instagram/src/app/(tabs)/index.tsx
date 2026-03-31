import { useState, useCallback } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import HighlightList from "../../components/HighlightList";
import ProfileTabs from "../../components/ProfileTabs";
import { MOCK_PROFILE, MOCK_HIGHLIGHTS } from "../../data/mockProfile";

export default function ProfileScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top"]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileHeader profile={MOCK_PROFILE} />
        <HighlightList highlights={MOCK_HIGHLIGHTS} />
        <ProfileTabs />
      </ScrollView>
    </SafeAreaView>
  );
}
