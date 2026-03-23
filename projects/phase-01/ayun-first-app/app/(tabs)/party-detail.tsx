import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function PartyDetailScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>파티 상세 정보 💌</Text>
          <Text style={styles.text}>6:00pm - 8:00pm 랜덤 배달 음식 시키기</Text>
          <Text style={styles.text}>8:00pm - 9:00pm 퇴사 후 여행 계획 짜기</Text>
          <Text style={styles.text}>9:00pm - 11:00pm 보드게임 및 노래방 즐기기</Text>
          <Text style={styles.text}>11:00pm - 자기 전 까지 행복하기</Text>
          <Text style={styles.text}>✨ 파티의 드레스 코드는 핑크입니당 🎀 ✨</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FDF3F8',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF9FC',
    borderRadius: 24,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4E3D52',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#7D7082',
    marginBottom: 8,
  },
});