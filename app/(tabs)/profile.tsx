import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

export default function ProfileScreen() {

  return (
    <View style={styles.container}>
      <Text style={{backgroundColor: 'yellow', flexGrow: 1}}>Item 1</Text>
      <Text style={{alignSelf: 'flex-end', backgroundColor: 'orange',  flexBasis:100}}>Item 2</Text>
      <Text style={{fontSize: 40, backgroundColor: 'lightblue'}}>Item 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        height: '100%'
      },
});
