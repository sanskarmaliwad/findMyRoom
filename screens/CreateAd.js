import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Camera, CameraType } from "expo-camera";
// import * as ImagePicker from "expo-image-picker"
import * as ImagePicker from "expo-image-picker";
import { store, auth, storage, firebaseConfig } from "../firebase";
import MapView, { Marker } from "react-native-maps";
import MapInput, { MapInputVariant } from "react-native-map-input";
import * as Location from "expo-location";
import Map from "./Map";
import { Context } from "../Context";
import { COLORS, FONTS, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import { color } from "react-native-reanimated";

const storageRef = storage.ref();

const CreateAd = ({ navigation }) => {
  const { pin, setPin,
    isAdmin, setisAdmin} = React.useContext(Context);
  const [uploading, setUploading] = useState(false);
  // useEffect((e)=>{
  //     e.preventDefault();
  //   },[])

  const data = [
    { label: "Boys", value: "Boys" },
    { label: "Girls", value: "Girls" },
    { label: "Common", value: "Common" },
  ];

  const [isAvailableFor, setIsAvailableFor] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [name, setName] = useState("");
  const [LandMrk, setLandMrk] = useState("");
  const [desc, setDesc] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [maxCap, setMaxcap] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [tempImage, setTempImage] = useState("");


  const postData = async () => {
    try {
      await store.collection("ads").add({
        LandMrk,
        desc,
        size,
        price,
        phone,
        maxCap,
        address,
        tempImage,
        pin,
        uid: auth.currentUser.uid,
      });

      Alert.alert("posted your Ad!");
      
      
      setName("");
      setLandMrk("");
      setDesc("");
      setSize("");
      setPrice("");
      setPhone("");
      setMaxcap("");
      setAddress("");
      setImage("");
      setIsAvailableFor(null);

    } catch (err) {
      console.log(err);
      Alert.alert("something went wrong.try again");
    }
  };

  // start -------------------------

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    console.log(source);
    setImage(source);
    setTempImage(source.uri);
    console.log(source);
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = Date.now();
    var ref = storageRef.child(`${filename}`).put(blob);
    ref.then((snapshot) => {
      ref.snapshot.ref.getDownloadURL().then((downloadURL) => {
        setTempImage(downloadURL);
      });
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress == 100) {
        alert("uploaded");
        console.log("uploaded");
      }
    });

    try {
      await ref;
    } catch (e) {
      console.log(e);
    }
    setUploading(false);
    // Alert.alert('image uploaded..!!');
    console.log(tempImage);
  };

  const echoo = () => {
    console.log(tempImage);
  };

  // -------------------------
  // const selectPhoto = async ()=>{
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.All,
  //         allowsEditing: true,
  //         aspect: [4, 3],
  //         quality: 1,
  //       });

  //       console.log(result.uri);

  //       if (!result.cancelled) {
  //         setImage(result.uri);
  //         console.log(result.uri)

  //       }

  //       const uploadTask = storageRef.child(`${Date.now()}`).putFile(result.uri)

  //       uploadTask.on('state_changed',
  //         (snapshot) => {

  //             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //              if(progress==100){alert("uploaded")}
  //         },
  //         (error) => {
  //            alert("something went wrong")
  //         },
  //         () => {
  //             uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

  //                 setImage(downloadURL)
  //             });
  //         }
  //         );
  //    }

  //    --------------------------------------------

  // const openCamera = ()=>{
  //     launchImageLibrary({quality:0.5},(fileobj)=>{
  //         const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.uri)
  //         uploadTask.on('state_changed',
  //         (snapshot) => {

  //             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //              if(progress==100){alert("uploaded")}
  //         },
  //         (error) => {
  //            alert("something went wrong")
  //         },
  //         () => {
  //             // Handle successful uploads on complete
  //             // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //             uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

  //                 setImage(downloadURL)
  //             });
  //         }
  //         );
  //        })
  //    }

  //    --------------------------------------------
  if (!isAdmin)
    return (
      <View style={styles.container}>
        <View style={styles.flatListHeaderStyle}>
          {/* <Text style={{fonstSize:22}}>{auth.currentUser.email}</Text> */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => auth.signOut()}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "#DDE2E5",
              fontSize: 15,
              marginTop: 10,
              alignSelf: "center",
            }}
          >
            Post Your Entries Here..
          </Text>
        </View>
        <Text style={{ textAlign: "center" }}>
          Sorry Only Hostel Owner's Can Post Entries
        </Text>
      </View>
    );
  else
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.flatListHeaderStyle}>
          {/* <Text style={{fonstSize:22}}>{auth.currentUser.email}</Text> */}
          <Text style={{ color: "#DDE2E5", fontSize: 18, alignSelf: "center" }}>
            Post Your Entries Here..
          </Text>
        </View>

        <TextInput
          style={styles.inputBox}
          label="Name"
          value={name}
          numberOfLines={1}
          multiline={true}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.inputBox}
          label="Landmark/Locality"
          value={LandMrk}
          onChangeText={(text) => setLandMrk(text)}
        />

        <TextInput
          style={styles.inputBox}
          label="Full address"
          value={address}
          numberOfLines={3}
          multiline={true}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          style={styles.inputBox}
          label="Describe room/place"
          value={desc}
          numberOfLines={5}
          multiline={true}
          onChangeText={(text) => setDesc(text)}
        />
        <View>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Available for" : "..."}
            value={isAvailableFor}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setIsAvailableFor(item);
              setIsFocus(false);
            }}
          />
        </View>

        <TextInput
          style={styles.inputBox}
          label="size of Room"
          value={size}
          // keyboardType="numeric"
          onChangeText={(text) => setSize(text)}
        />
        <TextInput
          style={styles.inputBox}
          label="maximum capacity of room"
          value={maxCap}
          keyboardType="numeric"
          onChangeText={(text) => setMaxcap(text)}
        />
        <TextInput
          style={styles.inputBox}
          label="price in INR"
          value={price}
          // keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
          underlineColorAndroid="#FFF"
          autoCorrect={false}
        />

        <TextInput
          style={styles.inputBox}
          label="Your contact Number"
          value={phone}
          keyboardType="numeric"
          onChangeText={(text) => setPhone(text)}
        />

        <Button
          style={styles.button}
          onPress={() => {
            navigation.navigate("map");
          }}
          title="Map"
          mode="contained"
        >
          Set Location
        </Button>

        <Button
          style={styles.button}
          icon="camera"
          mode="contained"
          onPress={() => pickImage()}
        >
          pick Image
        </Button>

        <Button
          style={styles.button}
          icon="camera"
          mode="contained"
          onPress={() => uploadImage()}
        >
          upload Image
        </Button>

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => postData()}
        >
          Post
        </Button>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  inputBox: {
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: "#F7F7F7",
  },
  button: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#EFF5F5",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  flatListHeaderStyle: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    padding: SIZES.font,
  },
  dropdown: {
    height: 50,
    borderColor: "#B2B2B2",
    borderBottomWidth: 0.5,
    paddingHorizontal: 8,
    marginHorizontal: 15,
    marginVertical: 5,
    elevation: 1,
    backgroundColor: "#F7F7F7",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "grey",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "grey",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default CreateAd;
