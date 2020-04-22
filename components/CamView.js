import React, { useState, useEffect, useRef } from "react"
import { Camera } from "expo-camera"
import { Dimensions } from "react-native"


export default function CamView() {
    const [granted, setGranted] = useState(false)
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
      console.log("rations: ", ratios)
    }

    const screenWidth = Dimensions.get("screen").width
    const height = screenWidth / 3 * 4

    return granted &&
           <Camera ref={cameraRef}
             onCameraReady={onReady}
             ratio={"4:3"}
             style={{width: screenWidth, height: height}} />
}