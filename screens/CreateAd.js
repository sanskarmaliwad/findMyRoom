import React,{useState, useEffect} from 'react'
import {ScrollView, View, Text,StyleSheet,Alert,Dimensions,KeyboardAvoidingView} from 'react-native'
import { TextInput,Button} from 'react-native-paper'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { Camera, CameraType } from 'expo-camera';
// import * as ImagePicker from "expo-image-picker"
import * as ImagePicker from 'expo-image-picker'
import { store,auth,storage,firebaseConfig} from '../firebase';
import MapView, {Marker} from "react-native-maps";
import MapInput, { MapInputVariant } from 'react-native-map-input';
import * as Location from 'expo-location';
import Map from './Map';
import { Context } from '../Context';
import AsyncStorage from "@react-native-async-storage/async-storage";







const CreateAd = ({navigation}) => {

    const {pin,setPin} = React.useContext(Context);

    // useEffect((e)=>{
    //     e.preventDefault();
    //   },[])
      
    const [LandMrk,setLandMrk] = useState('')
    const [desc,setDesc] = useState('')
    const [size,setSize] = useState('')
    const [price,setPrice] = useState('')
    const [phone,setPhone] = useState('')
    const [maxCap,setMaxcap] = useState('')
    const [address,setAddress] = useState('')
    const [image,setImage] = useState("");

   

    const postData = async ()=>{
    
        try{
              await store.collection('ads')
          .add({
            LandMrk,
              desc,
              size,
              price,
              phone,
              maxCap,
              address,
              image,
              pin,
              uid:auth.currentUser.uid
          })
          
          Alert.alert("posted your Ad!");

          setLandMrk('');
          setDesc('');
          setSize('');
          setPrice('');
          setPhone('');
          setMaxcap('');
          setAddress('');
          setImage('');
        }catch(err){
            console.log(err);
          Alert.alert("something went wrong.try again")
        }       
    }

    const selectPhoto = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result.uri);
      
          if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri)
            
          }

          const uploadTask = storageRef.child(`/items/${Date.now()}`).putFile(result.uri)

          uploadTask.on('state_changed', 
            (snapshot) => {
               
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                 if(progress==100){alert("uploaded")}
            }, 
            (error) => {
               alert("something went wrong")
            }, 
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

                    setImage(downloadURL)
                });
            }
            );
       }

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
    
       
  return (

    

    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}>
            <TextInput style={styles.inputBox}
                label="Land Mark"
                value={LandMrk}
                mode="outlined"
                onChangeText={text => setLandMrk(text)}
                />
            
            <TextInput style={styles.inputBox}
                label="Full address"
                value={address}
                numberOfLines={3}
                multiline={true}
                mode="outlined"
                onChangeText={text => setAddress(text)}
                />
            <TextInput style={styles.inputBox}
                label="Describe room/place"
                value={desc}
                mode="outlined"
                numberOfLines={5}
                multiline={true}
                onChangeText={text => setDesc(text)}
                />
            <TextInput style={styles.inputBox}
                label="size of Room"
                value={size}
                mode="outlined"
                // keyboardType="numeric"
                onChangeText={text => setSize(text)}
                />
            <TextInput style={styles.inputBox}
                label="maximum capacity of room"
                value={maxCap}
                mode="outlined"
                keyboardType="numeric"
                onChangeText={text => setMaxcap(text)}
                />
            <TextInput style={styles.inputBox}
                label="price in INR"
                value={price}
                mode="outlined"
                // keyboardType="numeric"
                onChangeText={text => setPrice(text)}
                />
            <TextInput style={styles.inputBox}
                label="Your contact Number"
                value={phone}
                mode="outlined"
                keyboardType="numeric"
                onChangeText={text => setPhone(text)}
                />

                <Button style={styles.button}
                    onPress = {()=> {navigation.navigate('map');
                    }} title='Map' mode="contained"
                >
                    Set Location
                </Button>

                <Button style={styles.button} icon="camera"  mode="contained" onPress={() => selectPhoto()}>
                     upload Image
                 </Button>
                <Button style={styles.button} mode="contained" onPress={() => postData()}>
                     Post
                 </Button>
        </ScrollView>

  );
};

const styles = StyleSheet.create({
    inputBox:{
        margin:2,

    },
    button:{
        margin:4,
        
    },
    container:{
        flex:1,
        marginHorizontal:30,
        // justifyContent:"space-evenly",
        marginTop: 60,
    },
    text:{
        fontSize:24,
        textAlign:"center"
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
     });
     
     
export default CreateAd;