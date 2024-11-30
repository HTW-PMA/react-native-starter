import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";

function MyComponent() {
    const [data, setData] = useState(null);
  
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/data');
      const result = await response.json();
      setData(result);
    };
  
    fetchData(); // Das wird ausgeführt bei jedem rendern.
  
    return <ThemedText>{data ? JSON.stringify(data) : 'Loading...'}</ThemedText>;
  }

  function MyComponentWithUseEffect() {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      };
  
      fetchData(); // Das wird ausgeführt, wenn die Komponente das erste Mal aufgerufen wird.
    }, []); // Keine Anhängigkeit -> Wird nur ein einziges Mal aufgerufen.
  
    return <ThemedText>{data ? JSON.stringify(data) : 'Loading...'}</ThemedText>;
  }
  