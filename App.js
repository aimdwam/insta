import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import CamView from './components/CamView';
// import { Provider as PaperProvider } from 'react-native-paper';

// Insta app
// 2 pages, 1. taking picture, 2. display them

export default function App() {
  return (
    // <PaperProvider>
    <View style={styles.container}>
      <Text style={{fontSize: 40}}>hello world</Text>
      <CamView/>
    </View>
    // </PaperProvider>
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
