import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>💌 앱 소개</Text>
        <Text style={styles.subtitle}>오늘 있었던 이모저모</Text>

        <View style={styles.card}>
          <Image
            source={require('../../assets/images/diary-cover.jpg')}
            style={styles.image}
          />

          <Text style={styles.cardTitle}>오늘은 어떤 일이 있었나요?</Text>
          <Text style={styles.cardText}>
            오늘은 어떤 행복 한 입, 슬픔 한 조각이 있었는지 적어주세요.
            뭐든 좋아요!
          </Text>

          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>🌿 연두</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>☁️ 하늘</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>🌸 핑크</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5FAF1',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#6F7F67',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#8FA3B4',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FCFFFB',
    borderRadius: 28,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E3EFE0',
  },
  image: {
    width: '100%',
    height: 190,
    borderRadius: 22,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#6F7F67',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#64705F',
    marginBottom: 16,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#EAF6E1',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagText: {
    color: '#7D9077',
    fontWeight: '700',
  },
});