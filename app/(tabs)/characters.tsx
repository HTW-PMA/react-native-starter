import { StyleSheet, View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import ThemedButton from '@/components/ThemedButton';
import { useCharacterData } from '@/components/characters/useCharacterData';
import { Character } from '@/components/characters/characterTypes';

export default function CharactersScreen() {
  const [page, setPage] = useState(1);
  const { characters, loading, error } = useCharacterData(page);

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <ThemedButton
          title="Next Character!"
          onPress={() => setPage(page + 1)}
        />
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error}</Text>}
        {characters.map((char: Character) => (
          <Text key={char.id}>{char.name}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    marginTop: 50,
  },
});