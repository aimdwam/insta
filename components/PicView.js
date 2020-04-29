import React from 'react'
import { Text, Card, Button } from 'react-native-paper'

export default PicView = ({onBack, pic}) => {

  return (
    <Card>
      <Card.Title title='Picture View' />
      <Card.Content>
        <Text>size: {pic.width} x {pic.height}</Text>
        <Text>path: {pic.uri}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onBack}>back</Button>
      </Card.Actions>
    </Card>
  )
}