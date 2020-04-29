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

    /* no good
    useEffect(async () => {
        const response = await Camera.requestPermissionsAsync()
        setGranted(response.granted)
    }, [])
    */

    // main point: why we can't use async function directly as 1st param for useEffect
    /*
    function useEffect(someFn, deps) {
      // some logic
      
      someFn(evt)    // ignore any result from the someFn, then any kind of function will do
      
      const cleanUpFn = someFn()  // this is the expectation, normal function returning a cleanup function

      const cleanUpFn = asyncFn()  // the problem is cleanUpFn is no longer a normal function, it will be a Promise

      // some other code

      if (cleanUpFn)
        cleanUpFn()   // only make sense if cleanUpFn is really a function, not a Promise
    }
    */

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