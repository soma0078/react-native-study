import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>호스트 소개</Text>
        <Text style={styles.subtitle}>프로필 카드 UI 화면</Text>

        <View style={styles.card}>
          <Image
            source={require('../../assets/images/profile.jpg')}
            style={styles.profileImage}
          />

          <Text style={styles.name}>아윤</Text>
          <Text style={styles.role}>UX/UI 디자이너</Text>
          <Text style={styles.desc}>
            집에 가고 싶은 사람. 바이브 코딩은 참 뭐가 뭔지 모르겠당 그냥 시키는대로 하고는 있다ㅠㅠ
          </Text>

          <View style={styles.tagWrap}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>🌸 파스텔</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>🎀 귀여운 UI</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>🥂 파티 호스트</Text>
            </View>
          </View>
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#4E3D52',
  },
  subtitle: {
    fontSize: 15,
    color: '#7D7082',
    marginTop: 6,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFF9FC',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFE5F0',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4E3D52',
    marginBottom: 6,
  },
  role: {
    fontSize: 15,
    color: '#E77FB3',
    fontWeight: '700',
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    lineHeight: 22,
    color: '#7D7082',
    textAlign: 'center',
    marginBottom: 16,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  tag: {
    backgroundColor: '#FFE5F0',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagText: {
    color: '#7A6170',
    fontWeight: '600',
  },
});