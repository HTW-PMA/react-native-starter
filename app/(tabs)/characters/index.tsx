import { StyleSheet, Image, Text, FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useCharacterData } from '@/features/characters/hooks/useCharacterData';
import { Character } from '@/features/characters/types/characterTypes';
import CharacterCard from '@/features/characters/components/CharacterCard';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';

export default function CharactersScreen() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const { characters, loading, error, refreshCharacters } = useCharacterData();

  useEffect(() => {
    if (characters.length > 0) {
      setAllCharacters((prevCharacters) => {
        const existingIds = new Set(prevCharacters.map((char) => char.id));
        const newCharacters = characters.filter((char) => !existingIds.has(char.id));
        return [...prevCharacters, ...newCharacters];
      });
    }
  }, [characters]);

  const renderItem = ({ item }: { item: Character }) => (
    <Link
      href={`/characters/modal`} // Modal
      //href={`/characters/details?id=${item.id}&name=${item.name}&species=${encodeURIComponent(item.species)}`} // Stack
      style={styles.linkCard}>
      <CharacterCard name={item.name} species={item.species} />
    </Link>
  );

  return (
    <ThemedView style={styles.container}>
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
        refreshing={loading}
        onRefresh={refreshCharacters}
      />
    </ThemedView>
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
  },
  link: { marginTop: 10, fontSize: 18, color: 'blue' },
  linkCard: {
    marginBottom: 10,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});