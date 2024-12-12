import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

export default function ProfileScreen() {

  return (
    <View style={styles.container}>
      <Text style={{}}>Item 1</Text>
      <Text style={{alignSelf: 'flex-end'}}>Item 2</Text>
      <Text style={{fontSize: 40}}>Item 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
      },
});
