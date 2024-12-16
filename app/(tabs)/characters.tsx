import { StyleSheet, View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useCharacterData } from '@/features/characters/hooks/useCharacterData';
import { Character } from '@/features/characters/types/characterTypes';
import CharacterCard from '@/features/characters/components/CharacterCard';

export default function CharactersScreen() {
  const [page, setPage] = useState(1);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const { characters, loading, error } = useCharacterData(page);

  useEffect(() => {
    if (characters.length > 0) {
      setAllCharacters((prevCharacters) => {
        const existingIds = new Set(prevCharacters.map((char) => char.id));
        const newCharacters = characters.filter((char) => !existingIds.has(char.id));
        return [...prevCharacters, ...newCharacters];
      });
    }
  }, [characters]);

  useEffect(() => {
    setAllCharacters([]);
  }, []);

  const renderItem = ({ item }: { item: Character }) => (
    <CharacterCard name={item.name} species={item.species} />
  );

  return (
    <View style={styles.container}>
      {loading && <Text style={styles.loading}>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      <FlatList
        data={allCharacters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading && !error ? <Text style={styles.empty}>No characters found.</Text> : null
        }
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.8}
        refreshing={loading}
        onRefresh={() => {
          setPage(0);
          setAllCharacters([]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    color: 'blue',
    marginVertical: 10,
  },
  error: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginVertical: 10,
  },
  listContent: {
    paddingVertical: 10,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  }
});