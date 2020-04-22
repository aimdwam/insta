import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';

// Insta app
// 2 pages, 1. taking picture, 2. display them

export default function App() {

  // [theState, theSetStateFunction] = useState(initialState)
  const [granted, setGranted] = useState(false)

  // please execute the function I provide when first mount/render this component (App)
  // also whenever the dependencies changed (2nd param array)
  useEffect(() => {
    // use effect
    const x = // a promise of number
    Camera.requestPermissionsAsync().then(response => {
      setGranted(response.granted)
    }, reason => {
      console.log(reason)
    })
    console.log('use effect')
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40}}>hello world</Text>
      {
        // JS expression
        // must be JSX (elem/node)
        // if this expression is falsy (false, "", []), will be skipped
      }
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
