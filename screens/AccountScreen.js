import React,{useState,useEffect} from 'react'
import { View, Text,FlatList,StyleSheet,Linking,Platform } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { auth } from '../firebase';
import { store } from '../firebase';


const AccountScreen = () => {
  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(false)
  const getDetails = async ()=>{
    const querySnap = await store.collection('ads')
    .where('uid','==',auth.currentUser.uid).get()
    const result =  querySnap.docs.map(docSnap=>docSnap.data())
    console.log(result)
    setItems(result)
  }
  const openDial = (phone)=>{
    if(Platform.OS ==='android'){
      Linking.openURL(`tel:${phone}`)
    }else{
      Linking.openURL(`telprompt:${phone}`)
    }
  }
  useEffect(()=>{
    getDetails()
    return ()=>{
      console.log("cleanup")
    }
  },[])

  const renderItem = (item)=>{
    return(
        <Card style={styles.card}>
      <Card.Title title={item.LandMrk}  />
      <Card.Content>
        <Paragraph>{item.desc}</Paragraph>
        <Paragraph>{item.size}</Paragraph>
        <Paragraph>{item.phone}</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Actions>
        {/* <Button onPress={()=>(openDial(item.phone))}>call seller</Button> */}
      </Card.Actions>
    </Card>  
    )
  }

  return (
    <View>
    <View style={{height:'30%',justifyContent:'space-evenly', alignItems:"center"}}>
    {/* <Text style={{fonstSize:22}}>{auth.currentUser.email}</Text> */}
      <Button mode ="contained" onPress={()=> auth.signOut()} >
        LogOut
      </Button>
      <Text style={{fontSize:25}}>Your Hostels!</Text>
    </View>
      <FlatList
        data={items}
        keyExtractor={(item)=>item.phone}
        renderItem={({item})=>renderItem(item)}
        onRefresh={()=>{
          setLoading(true)
          getDetails()
          setLoading(false)
        }}
        refreshing={loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
      margin:10,
      elevation:2
  }
   });

export default AccountScreen