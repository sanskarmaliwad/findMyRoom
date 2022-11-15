import React from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { COLORS, FONTS, SIZES } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const HomeHeader = ({ onSearch, onSelectRange }) => {
  const [range, setRange] = React.useState(10000);
  return (
    <View
      style={{
        margin: 10,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        padding: SIZES.font,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <Image
          source={assets.logo}
          resizeMode="contain"
          style={{ width: 90, height: 25 }}
        /> */}

        {/* <View style={{ width: 45, height: 45 }}>
          <Image
            source={assets.person01}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
          <Image
            source={assets.badge}
            resizeMode="contain"
            style={{
              position: "absolute",
              width: 15,
              height: 15,
              bottom: 0,
              right: 0,
            }}
          />
        </View> */}
      </View>

      <View style={{ marginVertical: SIZES.font }}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 2,
            textAlign: "center",
          }}
        >
          Find Your Perfect Room
        </Text>
      </View>

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          {/* <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          /> */}
          <TextInput
            placeholder="Search by Price or Landmark or Capacity..."
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
          </View>
          <View style={styles.container}>
            <Slider
              step={500}
              thumbTintColor="#DDE2E5"
              minimumTrackTintColor="#DDE2E5"
              maximumTrackTintColor="grey"
              value={range}
              containerStyle={{color:"#DDE2E5"}}
              maximumValue={20000}
              onValueChange={(value) => setRange(value)}
              onSlidingComplete={onSelectRange}
            ></Slider>
            <Text style={{color:"#DDE2E5"}}>Your Budget is not more than: {Math.floor(range)} Rs.</Text>
          </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: 'space-between',
  },
});

export default HomeHeader;
