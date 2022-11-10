import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, Dimensions, KeyboardAvoidingView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Context } from '../Context';
// import { HeaderBackButton } from 'react-navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Map = ({route, navigation}) => {

  const {pin, setPin} = React.useContext(Context);
  console.log(pin);

  // const [ pin, setPin ] = useState({
	// 	latitude: 37.78825,
	// 	longitude: -122.4324
	// }) 

  const [mapRegion, setMapRegion] = useState({
    latitude: 22.724713889937046,
    longitude: 75.87278936058283,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  //stores the location of current pin
  // const [ pin, setPin ] = useState({
	// 	latitude: 37.78825,
	// 	longitude: -122.4324
	// })

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);

  }

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={{ marginTop: 50, flex: 1 }}>

      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true} //can
        GooglePlacesSearchQuery={{  //can
					rankby: "distance"
				}}
        // onPress={(data, details = null) => {
        //   // 'details' is provided when fetchDetails = true
        //   console.log(data, details);
        // }}
        query={{
          key: 'AIzaSyALHMMVH9g-PNcLlAheewqhZVs0v-RHKPQ',
          language: 'en',
          components: "country:in",
          types: "establishment",
          radius: 30000, //can
          location: `${mapRegion.latitude}, ${mapRegion.longitude}`

        }}

        styles={{
          container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
          listView: { backgroundColor: "white" }
        }}
      />


      <MapView style={styles.map}
        region={mapRegion}
        onPress={ (event) => {
          setPin(event.nativeEvent.coordinate);
          console.log(pin); 
          }
        }
        
      >
       <Marker coordinate={pin} title='Marker' />
      </MapView>
      <Button title='Get Location' onPress={userLocation} />

    </View>
  )
}

// <Marker coordinate={mapRegion} title='Marker' />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 0,
    justifyContent: "space-evenly"
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


export default Map