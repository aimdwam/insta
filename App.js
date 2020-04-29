import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Camera } from 'expo-camera';
import CamView from './components/CamView';
import PicView from './components/PicView';
import { Provider, Button } from 'react-native-paper';
import * as FileSystem from 'expo-file-system'

// Insta app
// 2 pages, 1. taking picture, 2. display them

export default function App() {
  const [pic, setPic] = useState(null)

  const onPicTaken = async pic => {
    console.log(pic)
    const photoId = Number( (await AsyncStorage.getItem('photoId')) || 0 )

    await AsyncStorage.setItem('photoId', "" + (photoId + 1))  // ignore the result, just make sure it happens
    const dest = FileSystem.documentDirectory + "photos/" + photoId + ".jpg"
    await FileSystem.copyAsync({from: pic.uri, to: dest})
    setPic({...pic, uri: dest})
  }

  return (
    <Provider>
    <View style={styles.container}>
      <Text style={{fontSize: 40}}>hello world</Text>
      {pic && <PicView pic={pic} onBack={() => setPic(null)} />}
      {!pic && <CamView onPicTaken={onPicTaken} />}
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
