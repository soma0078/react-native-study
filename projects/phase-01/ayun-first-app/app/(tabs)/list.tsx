import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { attendees } from '../data';

export default function ListScreen() {
  const [listData, setListData] = useState(attendees);

  useFocusEffect(
    useCallback(() => {
      setListData([...attendees]);
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>참석자 목록 💗</Text>
        <Text style={styles.subtitle}>전송된 참석 응답 리스트</Text>

        {listData.length === 0 ? (
          <Text style={styles.empty}>아직 참석자가 없어요 🥲</Text>
        ) : (
          <FlatList
            data={listData}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.image} style={styles.avatar} />
                <Text style={styles.name}>{item.name}</Text>
              </View>
            )}
          />
        )}
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
    fontSize: 26,
    fontWeight: '800',
    color: '#4E3D52',
  },
  subtitle: {
    fontSize: 15,
    color: '#7D7082',
    marginTop: 6,
  },
  empty: {
    marginTop: 20,
    color: '#7D7082',
    fontSize: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9FC',
    borderRadius: 20,
    padding: 16,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4E3D52',
  },
});