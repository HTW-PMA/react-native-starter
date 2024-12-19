import { Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function CharactersLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#A1CEDC' },
        headerTintColor: '#fff',
        headerTitle: () => <CustomHeader />,        
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal', 
          title: 'Character Modal',
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          headerShown: false,
        }}
      />
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