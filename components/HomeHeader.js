import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { COLORS, FONTS, SIZES } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { block } from "react-native-reanimated";
import { Context } from "../Context";


const HomeHeader = ({ onSearch, onSelectRange }) => {
  const [range, setRange] = React.useState(10000);
  const [isFocus, setIsFocus] = useState(false);

  const { sortingOption, setSortingOption } = React.useContext(Context)

  const data = [
    { label: "Price: Low to High", value: true },
    { label: "Price: High to Low", value: false },
  ];

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
            />
            <Text style={{color:"#DDE2E5"}}>Your Budget is not more than: {Math.floor(range)} Rs.</Text>
          </View>

          <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Sort By" : "..."}
              value={sortingOption}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
              setSortingOption(item);
              setIsFocus(false);
            }}
          />
        
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
  dropdown: {
    height: 40,
    width:'60%',
    alignSelf:'center',
    borderRadius:20,
    textAlign:'center',
    borderColor: "#B2B2B2",
    borderBottomWidth: 0.5,
    paddingHorizontal: 8,
    marginHorizontal: 15,
    marginVertical: 5,
    elevation: 1,
    backgroundColor: "#74858C",
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
    color: "#4D626C",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#4D626C",
    textAlignVertical:'center',
    overflow:'hidden'
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor:'#4D626C',
  },
});

export default HomeHeader;
