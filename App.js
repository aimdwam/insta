import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Camera } from 'expo-camera';
import CamView from './components/CamView';
import { Provider, Button } from 'react-native-paper';
import * as FileSystem from 'expo-file-system'

// Insta app
// 2 pages, 1. taking picture, 2. display them

export default function App() {
  const onPicTaken = async pic => {
    console.log(pic)
    const photoId = Number( (await AsyncStorage.getItem('photoId')) || 0 )

    // 3 strings in javascript
    `some string ${photoId + 1}.`    // can resolve variables // if photo id is 1 => 'some string 2.'
    'no escape "" '
    " ' "
    await AsyncStorage.setItem('photoId', `${photoId + 1}`)  // ignore the result, just make sure it happens

    const dest = FileSystem.documentDirectory + `photos/${photoId}.jpg`
    await FileSystem.copyAsync({from: pic.uri, to: dest})
  }

  return (
    <Provider>
    <View style={styles.container}>
      <Text style={{fontSize: 40}}>hello world</Text>
      <CamView onPicTaken={onPicTaken} />
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
