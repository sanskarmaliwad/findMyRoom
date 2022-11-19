import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Linking,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { auth } from "../firebase";
import { store } from "../firebase";
import { COLORS, FONTS, SIZES } from "../constants";


const AccountScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const getDetails = async () => {
    const querySnap = await store
      .collection("ads")
      .where("uid", "==", auth.currentUser.uid)
      .get();
    const result = querySnap.docs.map((docSnap) => docSnap.data());
    console.log(result);
    setItems(result);
  };
  const openDial = (phone) => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };
  useEffect(() => {
    getDetails();
    return () => {
      console.log("cleanup");
    };
  }, []);



  const renderItem = (item, deletePost) => {
    return (
      <Card style={styles.card}>
        <Card.Title title={item.LandMrk} />
        <Card.Content>
          <Paragraph>Rs. {item.price}/-</Paragraph>
        </Card.Content>
        <Card.Cover
          style={{ borderRadius: 10, overflow: "hidden" }}
          source={{ uri: item.urls[0] }}
        />
        <Card.Actions>
        <TouchableOpacity
            style={styles.button}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item) => item.phone}
        renderItem={({ item }) => renderItem(item)}
        onRefresh={() => {
          setLoading(true);
          getDetails();
          setLoading(false);
        }}
        refreshing={loading}
        ListHeaderComponent={
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
              Hostel Entries Will Appear Here...
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDE2E5",
  },
  flatListHeaderStyle: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    padding: SIZES.font,
  },
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
    alignSelf: "center",
  },
  buttonText: {
    color: "#ffffff",
  },
});

export default AccountScreen;
