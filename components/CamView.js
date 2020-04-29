import React, { useState, useEffect, useRef } from "react"
import { Camera } from "expo-camera"
import { Dimensions, View } from "react-native"
import { Menu, Button } from "react-native-paper"


export default function CamView(props) {
    const [granted, setGranted] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)
    const [ratios, setRatios] = useState([])
    const cameraRef = useRef(null)    // create a box for us to be filled
    // cameraRef.current <-- to get the current value inside the box

    useEffect(() => {
      (async () => {
        const response = await Camera.requestPermissionsAsync()
        setGranted(response.granted)

      }) ()
    }, [])

    const onReady = async evt => {
      const ratios = await cameraRef.current.getSupportedRatiosAsync()
      console.log("ratios: ", ratios)
      setRatios(ratios)
    }

    const screenWidth = Dimensions.get("screen").width
    const height = screenWidth / 3 * 4

    return (
      <View>
        {granted &&
          <Camera ref={cameraRef}
            onCameraReady={onReady}
            ratio={"4:3"}
            style={{width: screenWidth, height: height}} />
        }
        <Menu visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button mode="contained" onPress={() => setMenuVisible(true)}>ratio</Button>
        }>{
          ratios.map(r => <Menu.Item key={r} title={r} />)
        }
        </Menu>
      </View>)
}