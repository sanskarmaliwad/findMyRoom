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
import { Card, Paragraph } from "react-native-paper";
import { auth } from "../firebase";
import { COLORS, SIZES } from "../constants";
import { store } from "../firebase";

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


  // function for deleting ad using ad's id.

  const deleteAd = (id) =>{ 
    store.collection("ads").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      alert("Ad deleted SuccessFully! Refresh the page.");
    }).catch((error) => {
      console.error("Error removing document: ", error);
  });}
  
  // **IMP**  This function is deleting the ad's data from firestore but the
  //  images stored in the firebase storage are yet to be deleted....

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
        <TouchableOpacity
            onPress={() => deleteAd(item.id)}
            // console.log(item.id)
            style={styles.delButton}
          >
            <Text style={styles.buttonText}>Delete Ad</Text>
        </TouchableOpacity>
        <Card.Content>
          <Paragraph>Ad_Id : {item.id}</Paragraph>
        </Card.Content>
        <Card.Cover
          style={{ borderRadius: 10, overflow: "hidden" }}
          source={{ uri: item.urls[0] }}
        />
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
            <Text style = {styles.emailId}>{auth.currentUser.email}</Text>
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
              Your Hostel Entries Will Appear Here...
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
  emailId:{
    color: "skyblue",
    textAlign: "center",
    paddingBottom: 14,
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
  delButton: {
    margin: 6,
    backgroundColor: "red",
    paddingHorizontal: 25,
    paddingVertical: 7,
    borderRadius: 25,
    alignSelf: "center",
  },
  buttonText: {
    color: "#ffffff",
  },
});

export default AccountScreen;
