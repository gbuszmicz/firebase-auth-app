import React, { Alert } from 'react-native';

export function handleAlerts(
  title='',     // Alert box title
  message=null, // Message to show
  btn1=null,    // Button 1 text
  btn2=null,    // Button 2 text
  callback) {   // Returns 'btn1' if btn1 is pressed, or 'btn2' if btn2 is pressed

  Alert.alert(
    title, 
    message, 
    [
      {text: btn1, onPress:() => callback('btn1')},
      {text: btn2, onPress:() => callback('btn2')}
    ]
  )
}