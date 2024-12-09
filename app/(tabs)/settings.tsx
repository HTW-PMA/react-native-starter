import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TextInput, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Dropdown } from 'react-native-element-dropdown';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useRole } from '@/hooks/useRole';
import { useState } from 'react';
import { globalStyles } from '@/styles';
import styled from 'styled-components/native';
import { ThemedTextInput } from '@/components/ThemedTextInput';

export default function SettingsScreen() {
  const { role, setRole } = useRole();
  const [text, setText] = useState('');

  console.log('Rendering SettingsScreen component!');

  const data = [
    { label: 'Student:in', value: 'Student:in' },
    { label: 'Angestellte:r', value: 'Angestellte:r' },
    { label: 'Gast', value: 'Gast' },
  ];

  // styled-components/native
  const StyledTextInput = styled.TextInput`
  border-width: 3px;
  border-color: red;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

  // styled-components/native
  const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: red
`;

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
      <Text style={{ color: 'green', fontSize: 18, fontWeight: 'bold' }}>Inline Styling</Text>
      <TextInput
        style={{ borderWidth: 3, borderColor: 'green', padding: 10, marginBottom: 20, borderRadius: 5 }}
        placeholder="Eingabe"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Text style={globalStyles.title}>Globale Styles in einer separaten Datei</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Eingabe"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Title>Styled-Components</Title>
      <StyledTextInput
        placeholder="Eingabe"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <ThemedText type="subtitle">Theme-basierte Lösungen</ThemedText>
      <ThemedTextInput
        type="default"
        placeholder="Eingabe"
        value={text}
        onChangeText={(text) => setText(text)}
      />
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
