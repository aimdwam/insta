import React, { useState, useEffect, useRef } from "react"
import { Camera } from "expo-camera"
import { Dimensions, View } from "react-native"
import { Menu, Button } from "react-native-paper"


export default function CamView(props) {
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

    return (
      <View>
        {props.children('3:4')}
        {granted &&
          <Camera ref={cameraRef}
            onCameraReady={onReady}
            ratio={"4:3"}
            style={{width: screenWidth, height: height}} />
        }
        {
          // render props
          /*
          any props that used by the component to render something

          // Component
          Menu, Button, Text, View
          // vs Component Instance
          <Button />
          <View> <Text/> </View>

          // function
          (data/callback) => expects Compoent instance / node

          Special props
          // children
          props.children is the thing that is nested inside the tag
          */
        }
        <Menu anchor={
          <Button mode="contained">ratio</Button>
        }>
          <Menu.Item title={"1:1"} />
          <Menu.Item title={"4:3"} />
          <Menu.Item title={"16:9"} />
        </Menu>
      </View>)
}
/*
const DataList = (props) => {
  const data = props.data  // kind of array
  const Item = props.render  // function to use for render

return <View>{
    data.map(d => <Item data={d}/>)
  }</View>
}

<DataList data={[1, 2, 3]} render={item => <Text>Item: {item}</Text>}/>
<DataList data={[1, 2, 3]} render={item => <Text>different: {item}</Text>}/>
*/