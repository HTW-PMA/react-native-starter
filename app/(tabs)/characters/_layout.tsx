import { Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import CharactersScreen from '.';

export default function CharactersLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#A1CEDC' },
        headerTintColor: '#fff',
        headerTitle: () => <CustomHeader />,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="detailsModal"
        options={{
          presentation: 'modal'
        }}
      />
      <Stack.Screen name="details"/>
    </Stack>
  );
}

function CustomHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Characters</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});