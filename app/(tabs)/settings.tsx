import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Dropdown } from 'react-native-element-dropdown';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useRole } from '@/hooks/useRole';

export default function SettingsScreen() {
  const { role, setRole } = useRole();

  console.log('Rendering SettingsScreen component!');

  const data = [
    { label: 'Student:in', value: 'Student:in' },
    { label: 'Angestellte:r', value: 'Angestellte:r' },
    { label: 'Gast', value: 'Gast' },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'green', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="settings" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
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
    marginBottom: 5
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
