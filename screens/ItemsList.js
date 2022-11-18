import React, { useContext, useEffect, useState } from "react";
import {
  StatusBar,
  View,
  Text,
  FlatList,
  StyleSheet,
  Linking,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { store } from "../firebase";
import HomeHeader from "../components/HomeHeader";
import { COLORS } from "../constants";
import { useAnimatedScrollHandler } from "react-native-reanimated";
import codegenNativeCommands from "react-native/Libraries/Utilities/codegenNativeCommands";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../Context";
import * as Location from "expo-location";

const ItemsList = ({ navigation }) => {

  const { sortingOption, setSortingOption } = React.useContext(Context)


  const myitems = [
    {
      LandMrk: "abc mark",
      desc: "Sample Description .... here it is",
      size: "1BHK",
      price: "6000",
      phone: "9856483745",
      maxCap: "2",
      address: "abb nagar",
      image:
        "https://www.shutterstock.com/image-photo/word-link-serious-businessman-hands-600w-180015809.jpg",
    },
    {
      LandMrk: "abc mark",
      desc: "Sample Description .... here it is",
      size: "1BHK",
      price: "6000",
      phone: "8856483745",
      maxCap: "2",
      address: "abb nagar",
      image:
        "https://www.shutterstock.com/image-photo/word-link-serious-businessman-hands-600w-180015809.jpg",
    },
    {
      LandMrk: "abc mark",
      desc: "Sample Description .... here it is",
      size: "1BHK",
      price: "6000",
      phone: "7856483745",
      maxCap: "2",
      address: "abb nagar",
      image:
        "https://www.shutterstock.com/image-photo/word-link-serious-businessman-hands-600w-180015809.jpg",
    },
  ];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState(items);

  const getDetails = async () => {
    const querySnap = await store.collection("ads").get();
    const result = querySnap.docs.map((docSnap) => docSnap.data());
    //console.log(result);
    setItems(result);
    setNewData(result);
  };


  const openDial = (phone) => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };

  async function getLocation() {
    let { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      console.log(latitude + " " + longitude);
      //console.log(coords);

      // for (let item of response) {
      //   let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

      //   console.log(address);
      // }
    }

  }

  useEffect(() => {
    getDetails();
    getLocation();
    return () => {
      console.log("cleanup");
    };
  }, []);

  const handleRange = (range) => {
    const filteredData = items.filter((item) => {
      // item.LandMrk.toLowerCase().includes(value.toLowerCase())
      if (
        parseInt(item.price) <= range
      ) {
        return true;
      }
      return false;
    });

    setNewData(filteredData)
  }

  const handleSearch = (value) => {
    if (value.length === 0) {
      setNewData(items);
    }
    const filteredData = items.filter((item) => {
      // item.LandMrk.toLowerCase().includes(value.toLowerCase())
      if (
        item.address.toLowerCase().includes(value.toLowerCase()) ||
        item.price.toLowerCase().includes(value.toLowerCase()) ||
        item.address.toLowerCase().includes(value.toLowerCase()) ||
        item.desc.toLowerCase().includes(value.toLowerCase())
      ) {
        return true;
      }
      return false;
    });

    if (filteredData.length === 0) {
      setNewData(items);
    } else {
      setNewData(filteredData);
    }
  };

  const descAlert = (value) => {
    alert(value);
  };
  const renderItem = (item) => {
    return (
      <Card style={styles.card}>
        <Card.Title title={item.name} />

        <Card.Content>
          <Paragraph style={{ textAlign: "left" }}>Rs {item.price}/-</Paragraph>
          {/* <Paragraph>{item.desc}</Paragraph> */}
        </Card.Content>
        <TouchableHighlight style={{ borderRadius: 10 }}
          onPress={() => {
            navigation.navigate("description", {
              desc: item.desc,
              landMrk: item.LandMrk,
              size: item.size,
              price: item.price,
              maxCap: item.maxCap,
              tempImage: item.tempImage,
              address: item.address,
              phone: item.phone,
              pin: item.pin,
            });
          }}
        > 
          <Card.Cover
            style={{ borderRadius: 10, overflow: "hidden" }}
            source={{ uri: item.tempImage }}
          />

        </TouchableHighlight>
        <Card.Actions>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("description", {
                name: item.name,
                desc: item.desc,
                landMrk: item.LandMrk,
                size: item.size,
                isAvailableFor: item.isAvailableFor,
                price: item.price,
                maxCap: item.maxCap,
                tempImage: item.tempImage,
                address: item.address,
                phone: item.phone,
                urls: item.urls,
              });
            }}
            title="Description"
          >
            <Text style={styles.buttonText}>Description</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openDial(item.phone)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          {/* <Button style={styles.button} onPress={()=>(openDial(item.phone))}> call</Button> */}

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("currlocation", {
                pin: item.pin,
              });
            }}
            title="CurrLocation"
          >
            <Text style={styles.buttonText}>Location</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    );
  };

  const sortingMethod = (sortingOption) => {
    console.log(sortingOption);
    return (sortingOption.value ? newData.sort((a, b) => a.price.localeCompare(b.price)) : (newData.sort((a, b) => a.price.localeCompare(b.price)).reverse()));
  }

  return (
    <View style={{ backgroundColor: "#DDE2E5" }}>
      {/* <Buttom title="Show my location" /> */}
      <StatusBar backgroundColor="#DDE2E5" barStyle={"dark-content"} />
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}

        data={sortingMethod(sortingOption)}
        // data={newData.sort((a,b) => a.price.localeCompare(b.price))}
        keyExtractor={(item) => item.phone}
        renderItem={({ item }) => renderItem(item)}
        onRefresh={() => {
          setLoading(true);
          getDetails();
          setLoading(false);
        }}
        refreshing={loading}
        ListHeaderComponent={<HomeHeader onSearch={handleSearch} onSelectRange={handleRange} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    elevation: 10,
    borderRadius: 20,
    overflow: "hidden",
    padding: 10,
  },
  button: {
    margin: 6,
    backgroundColor: "#054367",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
  },
});

export default ItemsList;
