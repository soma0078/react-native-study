import { Alert, Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => Alert.alert('pressed!')}
        style={({pressed})=> [{
          backgroundColor: pressed ? 'orange' : 'yellow',
        },
          {
            padding: 10,
            borderRadius: 5,
            color: 'white',
          }]
        }
      >
        <Text>Press me</Text>
      </Pressable>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
