import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
// import * as ImagePicker from "expo-image-picker"
import * as ImagePicker from "expo-image-picker";
import { store, auth, storage, firebaseConfig } from "../firebase";
import { Context } from "../Context";
import { COLORS, FONTS, SIZES } from "../constants";
import { Dropdown } from "react-native-element-dropdown";

const storageRef = storage.ref();

const CreateAd = ({ navigation }) => {
  const { pin, isAdmin} = React.useContext(Context);
  // useEffect((e)=>{
  //     e.preventDefault();
  //   },[])

  const data = [
    { label: "Boys", value: "Boys" },
    { label: "Girls", value: "Girls" },
    { label: "Common", value: "Common" },
  ];

  const [isAvailableFor, setIsAvailableFor] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [name, setName] = useState("");
  const [LandMrk, setLandMrk] = useState("");
  const [desc, setDesc] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  // const [maxCap, setMaxcap] = useState("");
  const [address, setAddress] = useState("");

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);


  const postData = async () => {
    try {
      var id = await store.collection("ads").add({
        name,
        LandMrk,
        desc,
        isAvailableFor,
        size,
        price,
        phone,
        // maxCap,
        urls,
        address,
        pin,
        uid: auth.currentUser.uid,
      });
      store.collection("ads").doc(id.id).set({
        id: id.id,
      }, { merge: true });

      Alert.alert("posted your Ad!");


      setName("");
      setLandMrk("");
      setDesc("");
      setSize("");
      setPrice("");
      setPhone("");
      setMaxcap("");
      setAddress("");
      setImages([]);
      setUrls([]);
      setIsAvailableFor("");

    } catch (err) {
      console.log(err);
      Alert.alert("something went wrong.try again");
    }
  };

  // start -------------------------

  const commonFun = async() => {
    pickImage1();
  }

  const pickImage1 = async () => {

    

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 5,
      aspect: [4, 3],
      quality: 1,
    });

    var target = [];
    if(!result.hasOwnProperty("selected")) {
      target = [result];
    } else {
      target = result.selected;
    }

    for (let i = 0; i < target.length; i++) {
      // console.log(target);
      const newImage = target[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const uplaod1New = async () => {
    let cnt = 1;
    setLoading(true);
    images.map(async (image) => {

      const response = await fetch(image.uri)
      const blob = await response.blob();
      const filename = Date.now();
      var ref = storageRef.child(`/images/${filename}`).put(blob);

      ref.then((snapshot) => {
        ref.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setUrls((prevState) => [...prevState, downloadURL]);
        });

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        var message = "uploaded image" + cnt;
        if (progress == 100) { console.log(message); cnt++; }
        if (cnt === images.length + 1) {
          console.log("all done."); alert("All Images Uploaded"); setLoading(false);}
      }
      );
    }
    );
  }


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

      {loading ?
        (<View style={styles.loader}><ActivityIndicator size="large" color="violet"/>
        <Text>Uploading Images ...</Text></View>)
        : (
          <View>

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
                  console.log(item);
                  setIsAvailableFor(item.value);
                  setIsFocus(false);
                }}
              />
            </View>

            <TextInput
              style={styles.inputBox}
              label="Size of Room (Number of Beds)"
              value={size}
              // keyboardType="numeric"
              onChangeText={(text) => setSize(text)}
            />
            
            <TextInput
              style={styles.inputBox}
              label="Price in INR"
              value={price}
              // keyboardType="numeric"
              onChangeText={(text) => setPrice(text)}
              underlineColorAndroid="#FFF"
              autoCorrect={false}
            />

            <TextInput
              style={styles.inputBox}
              label="Your Contact Number"
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
              onPress={() => commonFun()}
            >
              pick Images
            </Button>
            <Button
              style={styles.button}
              icon="camera"
              mode="contained"
              onPress={() => uplaod1New()}
            >
              upload Images
            </Button>

            <Button
              style={styles.button}
              mode="contained"
              onPress={() => postData()}
            >
              Post
            </Button>
          </View>
        )
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loader:{
    // position: 'absolute',
    marginTop:"50%",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
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

