import { StyleSheet, View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import ThemedButton from '@/components/ThemedButton';
import { useCharacterData } from '@/features/characters/hooks/useCharacterData';
import { Character } from '@/features/characters/types/characterTypes';
import CharacterCard from '@/features/characters/components/CharacterCard';

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
          <CharacterCard key={char.id} name={char.name} species={char.species} />
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
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 50,
    marginBottom: 20,
  },
});