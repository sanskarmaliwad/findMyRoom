import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Title,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";

const CurrLocation = ({ route, navigation }) => {
  const { pin } = route.params;
  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 22.724713889937046,
          longitude: 75.87278936058283,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
        />
      </MapView>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.goBack("list")}
        style={styles.touchableOpacityStyle}
      >
        <Image
          source={require("../assets/undo.png")}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 50,
    bottom: 50,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 35,
    height: 35,
    //backgroundColor:'black'
  },
});

export default CurrLocation;
