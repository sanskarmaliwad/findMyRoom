import React,{useState, useEffect} from 'react'
import { View, Text,StyleSheet,Alert,Dimensions,KeyboardAvoidingView, ScrollView, Image, ImageStore} from 'react-native'
import { TextInput,Button,Title} from 'react-native-paper'

const Description = ({route, navigation}) => {
  // const images = ["https://www.shutterstock.com/image-photo/word-link-serious-businessman-hands-600w-180015809.jpg","https://www.shutterstock.com/image-photo/word-link-serious-businessman-hands-600w-180015809.jpg","https://www.shutterstock.com/image-photo/word-link-serious-businessman-hands-600w-180015809.jpg"];
  // const onchange = (nativeEvent) => {
  //   if(nativeEvent) {
  //     const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layiutMeasurement.width);
  //     if (slide != imgActive) {
  //       setimgActive(slide);
  //     }
  //   }
  // }
  const {name, desc, landMrk, size, isAvailableFor, price, maxCap, tempImage, address, phone, urls} = route.params;
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
    <ScrollView style={{backgroundColor:"#DDE2E5", padding:10}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
       <View style={{marginBottom:20}}>
        <View styles={{height:"40%", width:"100%"}}>
        <Image style={{height:Dimensions.get('window').height/3, borderRadius:20, marginBottom:20}}
          source={{
            uri : tempImage,
          }}
          
        />
          {/* <ScrollView
            onScroll={({nativeEvent}) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            paddingEnabled
            horizontal
            style={{height:"20%", width:"100%"}}
          >
            {
              images.map((e, index) =>
                <Image
                  key={e}
                  resizeMode='stretch'
                  source={{uri: e}}
                  style={{height:"40%", width:"100%"}}
                />
              )
            }

          </ScrollView> */}
        </View>
        <View style={{marginTop:5}}>
         <Title style={{padding:5}}>Name</Title>
         <Text style = {styles.text}>{name}</Text>
        </View>

        <View style = {styles.lineStyle} />

        <View style={{marginTop:5}}>
         <Title style={{padding:5}}>Description</Title>
         <Text style = {styles.text}>{desc}</Text>
        </View>
        
        <View style = {styles.lineStyle} />

        <View style={{marginTop:5}}>
         <Title style={{padding:5}}>For</Title>
         <Text style = {styles.text}>{isAvailableFor}</Text>
        </View>

        <View style = {styles.lineStyle} />
        

        <View style={{marginTop:5}}>
         <Title style={{padding:5}}>Price</Title>
         <Text style = {styles.text}>{price}/-</Text>
        </View>

        <View style = {styles.lineStyle} />

        <View style={{marginTop:5}}>
         <Title style={{padding:5}}>Address</Title>
         <Text style = {styles.text}>{address}</Text>
        </View>

        <View style = {styles.lineStyle} />

        <View style={{marginTop:5}}>
         <Title style={{padding:5}}>LandMark</Title>
         <Text style = {styles.text}>{landMrk}</Text>
        </View>

        <View style = {styles.lineStyle} />

        <View style={{marginTop:5}}>
         <Title style={{padding:5}}>Contact No.</Title>
         <Text style = {styles.text}>+91 {phone}</Text>
        </View>

        <View style = {styles.lineStyle} />

        <View style={{marginTop:5}}>
         <Title style={{padding:5}}>Capacity</Title>
         <Text style = {styles.text}>{maxCap} Beds</Text>
        </View>



       </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    text:{
        padding:5,
    },
    lineStyle:{
      borderWidth: 0.5,
      borderColor:'grey',
      marginRight:60,
      marginBottom:20
    },  
     });

export default Description
