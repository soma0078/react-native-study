import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import { attendees } from '../data';

type Heart = {
  id: number;
  top: number;
  left: number;
  emoji: string;
};

const inviteImages = [
  require('../../assets/images/invite1.jpg'),
  require('../../assets/images/invite2.jpg'),
  require('../../assets/images/invite3.jpg'),
];

export default function InviteScreen() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [attendance, setAttendance] = useState<'참여' | '불참' | ''>('');
  const [reason, setReason] = useState('');
  const [guestName, setGuestName] = useState('');

  const handleHostPress = () => {
    const emojis = ['💗', '💕', '💖', '💘', '💞'];
    const newHearts: Heart[] = Array.from({ length: 8 }).map((_, index) => ({
      id: Date.now() + index,
      top: 10 + Math.random() * 90,
      left: 10 + Math.random() * 110,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setHearts(newHearts);

    setTimeout(() => {
      setHearts([]);
    }, 1200);
  };

  const handleSubmit = () => {
    if (!attendance) {
      alert('참석 여부를 선택해주세요 💭');
      return;
    }

    if (attendance === '불참' && !reason.trim()) {
      alert('불참 사유를 입력해주세요 💌');
      return;
    }

    if (attendance === '참여') {
      const randomImage =
        inviteImages[Math.floor(Math.random() * inviteImages.length)];

      attendees.push({
        id: Date.now().toString(),
        name: guestName.trim() ? guestName : '이름 미입력 참석자',
        image: randomImage,
      });
    }

    alert('응답이 전송되었어요 💗');
    setAttendance('');
    setReason('');
    setGuestName('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>퇴사 파티 초대장 🎀</Text>
        <Text style={styles.subtitle}>퇴사를 언제할지는 모르지만 일단 초대하기🎂</Text>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.profileWrap}
          onPress={handleHostPress}
        >
          <Image
            source={require('../../assets/images/profile.jpg')}
            style={styles.mainProfile}
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>host</Text>
          </View>

          {hearts.map((heart) => (
            <Text
              key={heart.id}
              style={[
                styles.heartPop,
                {
                  top: heart.top,
                  left: heart.left,
                },
              ]}
            >
              {heart.emoji}
            </Text>
          ))}
        </TouchableOpacity>

        <View style={styles.heroCard}>
          <Text style={styles.emoji}>💌 🥂 🌸</Text>
          <Text style={styles.heroTitle}>퇴사 파티에 초대합니다</Text>
          <Text style={styles.heroText}>
            퇴사 파티에 초대해요 물론 아직 퇴사는 못 했어요 ㅎㅎㅎ
          </Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.smallCard, { backgroundColor: '#FFE4F0' }]}>
            <Text style={styles.smallLabel}>날짜</Text>
            <Text style={styles.smallValue}>금요일 7시</Text>
          </View>

          <View style={[styles.smallCard, { backgroundColor: '#EADFFF' }]}>
            <Text style={styles.smallLabel}>드레스 코드</Text>
            <Text style={styles.smallValue}>핑크 무드</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>초대 메시지</Text>
          <Text style={styles.infoText}>사실 퇴사한다는건 뻥이에요</Text>
          <Text style={styles.infoText}>
            하지만 퇴사파티는 하고싶어 💗 엽떡 먹어야지
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>참석 여부</Text>

          <Text style={styles.inputLabel}>이름</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="이름을 입력해주세요"
            placeholderTextColor="#B1A4B5"
            value={guestName}
            onChangeText={setGuestName}
          />

          <View style={styles.choiceRow}>
            <TouchableOpacity
              style={[
                styles.choiceButton,
                attendance === '참여' && styles.choiceButtonActive,
              ]}
              onPress={() => setAttendance('참여')}
            >
              <Text
                style={[
                  styles.choiceText,
                  attendance === '참여' && styles.choiceTextActive,
                ]}
              >
                참여
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.choiceButton,
                attendance === '불참' && styles.choiceButtonActive,
              ]}
              onPress={() => setAttendance('불참')}
            >
              <Text
                style={[
                  styles.choiceText,
                  attendance === '불참' && styles.choiceTextActive,
                ]}
              >
                불참
              </Text>
            </TouchableOpacity>
          </View>

          {attendance === '불참' && (
            <View style={styles.reasonWrap}>
              <Text style={styles.inputLabel}>불참 사유</Text>
              <TextInput
                style={styles.input}
                placeholder="불참 사유를 입력해주세요"
                placeholderTextColor="#B1A4B5"
                value={reason}
                onChangeText={setReason}
                multiline
              />
            </View>
          )}

          {attendance === '참여' && (
            <Text style={styles.confirmText}>참여로 선택했어요 💗</Text>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>전송하기</Text>
          </TouchableOpacity>
        </View>

        <Link href="/party-detail" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>파티 상세 보기</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FDF3F8',
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#4E3D52',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#7D7082',
    marginBottom: 16,
  },
  profileWrap: {
    alignSelf: 'center',
    marginBottom: 20,
    position: 'relative',
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainProfile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFE4F0',
    shadowColor: '#F8BBD9',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  badge: {
    position: 'absolute',
    right: 6,
    bottom: 18,
    backgroundColor: '#FFB8D7',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#4E3D52',
    fontSize: 12,
    fontWeight: '800',
  },
  heartPop: {
    position: 'absolute',
    fontSize: 20,
  },
  heroCard: {
    backgroundColor: '#FFF9FC',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  emoji: {
    fontSize: 26,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4E3D52',
    marginBottom: 8,
  },
  heroText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#7D7082',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  smallCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
  },
  smallLabel: {
    fontSize: 14,
    color: '#7D7082',
    marginBottom: 8,
  },
  smallValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4E3D52',
  },
  infoCard: {
    backgroundColor: '#FFF9FC',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4E3D52',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#7D7082',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4E3D52',
    marginBottom: 8,
  },
  nameInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    color: '#4E3D52',
    marginBottom: 16,
  },
  choiceRow: {
    flexDirection: 'row',
    gap: 12,
  },
  choiceButton: {
    flex: 1,
    backgroundColor: '#F6EDF3',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  choiceButtonActive: {
    backgroundColor: '#FFB8D7',
  },
  choiceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6F6273',
  },
  choiceTextActive: {
    color: '#4E3D52',
  },
  reasonWrap: {
    marginTop: 16,
  },
  input: {
    minHeight: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    textAlignVertical: 'top',
    color: '#4E3D52',
  },
  confirmText: {
    marginTop: 16,
    fontSize: 15,
    color: '#7D7082',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#FFB8D7',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4E3D52',
  },
  button: {
    backgroundColor: '#F4DDE8',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#4E3D52',
  },
});