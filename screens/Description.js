import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, Dimensions, KeyboardAvoidingView, ScrollView, Image } from 'react-native'
import { TextInput, Button, Title } from 'react-native-paper'

const Description = ({ route, navigation }) => {
  const { desc, landMrk, size, price, maxCap, tempImage, address, phone } = route.params;
  return (
    // <View style={{ flex: 1, justifyContent: 'center', padding: 12 }}>

    //     <Text style={styles.text}><Text style ={{fontSize:24}}>About</Text>: {desc}</Text>
    //     <Text style={styles.text}>LandMark: {landMrk}</Text>
    //     <Text style={styles.text}>Apartment Size: {size}</Text>
    //     <Text style={styles.text}>Price: Rs {price}</Text>
    //     <Text style={styles.text}>BHK: {maxCap}</Text>
    //     <Text style={styles.text}>Address: {address}</Text>
    //     <Text style={styles.text}>Contact No.: {phone}</Text>
    // </View>
    <ScrollView>
      <View>
        <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 3, resizeMode: 'cover', marginBottom: 10 }}
          source={{
            uri: tempImage,
          }}

        />
        <View style={{ marginBottom: 20, marginLeft: 5 }}>
          <Title style={{ padding: 5 }}>Description</Title>
          <Text style={styles.text}>{desc}</Text>
        </View>

        <View style={styles.lineStyle} />


        <View style={{ marginBottom: 20, marginLeft: 5 }}>
          <Title style={{ padding: 5 }}>Price</Title>
          <Text style={styles.text}>{price}/-</Text>
        </View>

        <View style={styles.lineStyle} />

        <View style={{ marginBottom: 20, marginLeft: 5 }}>
          <Title style={{ padding: 5 }}>Address</Title>
          <Text style={styles.text}>{address}</Text>
        </View>

        <View style={styles.lineStyle} />

        <View style={{ marginBottom: 20, marginLeft: 5 }}>
          <Title style={{ padding: 5 }}>LandMark</Title>
          <Text style={styles.text}>{landMrk}</Text>
        </View>

        <View style={styles.lineStyle} />

        <View style={{ marginBottom: 20, marginLeft: 5 }}>
          <Title style={{ padding: 5 }}>Contact No.</Title>
          <Text style={styles.text}>+91 {phone}</Text>
        </View>

        <View style={styles.lineStyle} />

        <View style={{ marginBottom: 20, marginLeft: 5 }}>
          <Title style={{ padding: 5 }}>No. of Rooms Available</Title>
          <Text style={styles.text}>{maxCap}</Text>
        </View>

        <View style={styles.lineStyle} />

        <View style={{ marginBottom: 20, marginLeft: 5 }}>
          <Title style={{ padding: 5 }}>Capacity</Title>
          <Text style={styles.text}>{maxCap} BHK</Text>
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    padding: 5,
    marginTop: -10
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'grey',
    marginRight: 80,
    marginBottom: 20
  },
});

export default Description
