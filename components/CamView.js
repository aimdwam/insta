import React, { useState, useEffect, useRef } from "react"
import { Camera } from "expo-camera"
import { Dimensions, View } from "react-native"
import { Menu, Button } from "react-native-paper"


export default function CamView(props) {
    const [granted, setGranted] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)
    const [ratios, setRatios] = useState([])
    const [ratio, setRatio] = useState("4:3")
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
    const getHeight = (ratio, width) => {
      const [h, w] = ratio.split(':')   // split ratio string (eg. 4:3 => ["4", "3"])
      return width / Number(w) * Number(h)
    }

    const takePicture = async evt => {
      const result = await cameraRef.current.takePictureAsync()
      console.log('take picture result: ', result)
    }

    return (
      <View>
        {granted &&
          <Camera ref={cameraRef}
            onCameraReady={onReady}
            ratio={ratio}
            style={{width: screenWidth, height: getHeight(ratio, screenWidth)}} />
        }
        <Menu visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button mode="contained" onPress={() => setMenuVisible(true)}>ratio</Button>
        }>{
          ratios.map(r => <Menu.Item key={r} title={r} onPress={() => {
            setMenuVisible(false)
            setRatio(r)
          }} />)
        }
        </Menu>
        <Button icon="camera" mode="contained" onPress={takePicture}>
          Take a picture
        </Button>
      </View>)
}