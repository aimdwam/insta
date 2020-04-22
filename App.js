import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';

// Insta app
// 2 pages, 1. taking picture, 2. display them

export default function App() {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    // const fn = async () => {
    //   console.log("first")
    //   const resolvedValue = await promise
    //   console.log("second")
    // }

    (async () => {
      const response = await Camera.requestPermissionsAsync()
      setGranted(response.granted)
    }) ()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40}}>hello world</Text>
      {
        granted &&
        <Camera style={{width: 100, height: 100}} />
      }
    </View>
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
