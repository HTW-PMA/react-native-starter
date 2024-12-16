import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Character } from '../types/characterTypes';

type CharacterCardProps = Pick<Character, 'name' | 'species'>; // Verwende nur die benötigten Felder

export default function CharacterCard({ name, species }: CharacterCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.species}>{species}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  species: {
    fontSize: 14,
    color: '#666',
  },
});