import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function CharacterDetailsScreen() {
  const { id, name, species } = useLocalSearchParams<{ id: string; name: string; species: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Character Details</Text>
      <Text style={styles.info}>ID: {id}</Text>
      <Text style={styles.info}>Name: {name}</Text>
      <Text style={styles.info}>Species: {species}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  details: { fontSize: 18, marginTop: 10 },
  info: { fontSize: 16, color: '#333' },
});