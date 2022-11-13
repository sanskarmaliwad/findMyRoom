import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, Dimensions, KeyboardAvoidingView,Title} from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import MapView, { Marker } from "react-native-maps";


const CurrLocation = ({route}) => {
    const {pin} = route.params
  return (
    <MapView style={styles.map}
    initialRegion={{
      latitude: 22.724713889937046,
      longitude: 75.87278936058283,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }}
  >
    <Marker coordinate={{ latitude : pin.latitude , longitude : pin.longitude}} />
  </MapView>
  )
}

const styles = StyleSheet.create ({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
 })

export default CurrLocation