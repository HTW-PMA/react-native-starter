import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Dropdown } from 'react-native-element-dropdown';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useState } from 'react';

export default function SettingsScreen() {

  const data = [
    { label: 'Studierende', value: 'students' },
    { label: 'Angestellte', value: 'employees' },
    { label: 'Gäste', value: 'guests' },
  ];

  let currentRole = ""; // Einfache Variable (kein State Management)
  const [role, setRole] = useState(""); // State Management I
  const [additionalRole, setAdditionalRole] = useState(""); // State Management II

  console.log('Rendering SettingsScreen component!');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'green', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="settings" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
      <ThemedText type="subtitle">
        Ohne State Management
      </ThemedText>
      <ThemedView style={styles.rowContainer}>
        <ThemedText style={styles.text}>Rolle</ThemedText>
        <Dropdown
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Wähle ..."
          onChange={item => {
            currentRole = item.value;
          }}
          value={
            currentRole
          }
          style={styles.dropdown}
          renderLeftIcon={() => (
            <TabBarIcon style={styles.icon} color="black" name={'people'} size={20} />
          )}
        />
      </ThemedView>
      <ThemedText type="subtitle">
        Mit State Management
      </ThemedText>
      <ThemedView style={styles.rowContainer}>
        <ThemedText style={styles.text}>Rolle</ThemedText>
        <Dropdown
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Wähle ..."
          onChange={item => {
            setRole(item.value);
          }}
          value={
            role
          }
          style={styles.dropdown}
          renderLeftIcon={() => (
            <TabBarIcon style={styles.icon} color="black" name={'people'} size={20} />
          )}
        />
      </ThemedView>
      <ThemedText type="subtitle">
        Auch mit State Management
      </ThemedText>
      <ThemedView style={styles.rowContainer}>
        <ThemedText style={styles.text}>Zusatzrolle</ThemedText>
        <Dropdown
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Wähle ..."
          onChange={item => {
            setAdditionalRole(item.value);
          }}
          value={
            additionalRole
          }
          style={styles.dropdown}
          renderLeftIcon={() => (
            <TabBarIcon style={styles.icon} color="black" name={'people'} size={20} />
          )}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 30
  },
  text: {
    marginRight: 10,
    fontSize: 16,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30
  },
  dropdown: {
    flex: 1,
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
});
