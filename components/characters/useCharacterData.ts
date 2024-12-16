import { useEffect, useState } from 'react';
import { Character } from './characterTypes';

/**
 * Ein benutzerdefinierter Hook (`useCharacterData`) zum Abrufen von Charakterdaten von der Rick-and-Morty-API.
 * 
 * @param page - Die Seitennummer, die abgerufen werden soll (Paginierung).
 * 
 * @returns Ein Objekt mit drei Zuständen:
 * - `characters`: Ein Array von Charakterdaten (erfolgreich abgerufene Ergebnisse).
 * - `loading`: Ein Boolean, der anzeigt, ob der Datenabruf derzeit läuft.
 * - `error`: Ein String mit einer Fehlermeldung oder `null`, wenn kein Fehler aufgetreten ist.
 * 
 * Funktionsweise:
 * - Der Hook führt eine Fetch-Anfrage aus, wenn sich die `page`-Nummer ändert.
 * - Während der Anfrage wird der `loading`-Status auf `true` gesetzt.
 * - Wenn die Anfrage erfolgreich ist, werden die Ergebnisse in den Zustand `characters` geschrieben und `error` auf `null` gesetzt.
 * - Bei einem Fehler wird `error` mit der entsprechenden Fehlermeldung gefüllt.
 * - Der Hook stellt sicher, dass keine Zustandsaktualisierungen erfolgen, wenn die Komponente, die den Hook verwendet, bereits unmontiert wurde.
 */
export function useCharacterData(page: number): {
  characters: Character[];
  loading: boolean;
  error: string | null;
} {
  const [characters, setCharacters] = useState<Character[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCharacters(): Promise<void> {
      setLoading(true);

      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);

        if (!response.ok) {
          throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }

        const result = await response.json();

        if (isMounted) {
          setCharacters(result.results); 
          setError(null); 
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCharacters();

    return () => {
      isMounted = false;
    };
  }, [page]); 

  return { characters, loading, error };
}