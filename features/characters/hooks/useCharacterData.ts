import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../types/characterTypes';

const STORAGE_KEY = '@characters_data';

/**
 * Ein benutzerdefinierter Hook (`useCharacterData`) zum Abrufen und Speichern von Charakterdaten 
 * aus der Rick-and-Morty-API. Der Hook nutzt AsyncStorage, um die abgerufenen Daten lokal zu speichern, 
 * sodass sie auch offline oder nach einem Neustart verfügbar sind.
 * 
 * @returns Ein Objekt mit den folgenden Zuständen und Funktionen:
 * - `characters` (`Character[]`): Ein Array von Charakterdaten, geladen aus AsyncStorage oder der API.
 * - `loading` (`boolean`): Zeigt an, ob der Datenabruf derzeit läuft (`true`) oder abgeschlossen ist (`false`).
 * - `error` (`string | null`): Enthält eine Fehlermeldung, falls etwas schiefgeht, ansonsten `null`.
 * - `refreshCharacters` (`() => Promise<void>`): Eine Funktion, die den AsyncStorage leert 
 *   und die API erneut abruft, um die Charakterdaten zu aktualisieren.
 * 
 * Funktionsweise:
 * - Beim ersten Laden versucht der Hook, die Charakterdaten aus dem AsyncStorage zu laden.
 * - Falls keine gespeicherten Daten vorhanden sind, ruft der Hook die Daten von der API ab 
 *   und speichert sie im AsyncStorage.
 * - Die `refreshCharacters`-Funktion ermöglicht es, die Daten manuell zu aktualisieren. 
 *   Dabei werden die lokalen Daten aus dem AsyncStorage entfernt und neue Daten von der API geladen.
 * - Der Ladezustand (`loading`) und Fehlerzustand (`error`) werden während des Abrufs entsprechend verwaltet.
 */
export function useCharacterData(): {
  characters: Character[];
  loading: boolean;
  error: string | null;
  refreshCharacters: () => Promise<void>;
} {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharactersFromApi = async () => {
    setLoading(true);
    try {
      console.log('Rufe Daten von der API ab.');
      const response = await fetch(`https://rickandmortyapi.com/api/character`);
      if (!response.ok) throw new Error(`HTTP-Fehler! Status: ${response.status}`);

      const result = await response.json();

      setCharacters(result.results);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(result.results));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten.');
    } finally {
      setLoading(false);
    }
  };

  const loadCharactersFromStorage = async (): Promise<boolean> => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        console.log('Lade Daten aus AsyncStorage.');
        setCharacters(JSON.parse(storedData));
        return true;
      }
    } catch (err) {
      console.error('Fehler beim Laden der gespeicherten Daten:', err);
    }
    return false;
  };

  const refreshCharacters = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY); 
    await fetchCharactersFromApi();
  };

  useEffect(() => {
    const loadData = async () => {
      const hasLocalData = await loadCharactersFromStorage();
      if (!hasLocalData) {
        await fetchCharactersFromApi();
      }
    };

    loadData();
  }, []);

  return { characters, loading, error, refreshCharacters };
}