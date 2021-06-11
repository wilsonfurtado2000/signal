import React,{useLayoutEffect,useState,useEffect} from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import {auth,db} from '../firebase';
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomList from '../components/CustomList'
import { TouchableOpacity } from 'react-native';
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons';

const Home = ({navigation}) => {
   const [Chats,setChats]= useState([])
    const signOut = () =>{
        auth.signOut().then(()=>{
            navigation.replace("Login")
        })
    }
    useEffect(() => {
     const unsubcribe = db.collection("chats").onSnapshot((snapshot)=>{
         setChats(snapshot.docs.map((doc)=>({
             id:doc.id,
             data : doc.data(),
         })))
     })
     return unsubcribe;
    }, [])

 useLayoutEffect(() => {
  
    navigation.setOptions({
title:"Signal",
headerStyle:{backgroundColor:"#fff"},
headerTitleStyle:{color:"black"},
headerTintColor:"black",
headerLeft:() => <View style={{marginLeft: 20}}>
<TouchableOpacity onPress={signOut} activeOpacity={0.5}>
<Avatar
rounded 
source={{
    uri:auth?.currentUser?.photoURL
}} />
</TouchableOpacity>
</View>,
headerRight:() =>
    <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        width:80,
        marginRight:20,
    }}>
<TouchableOpacity activeOpacity={0.5}>
    <AntDesign name="camera" size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity activeOpacity={0.5} onPress={()=> navigation.navigate("AddChat")} >
<SimpleLineIcons name="pencil" size={24} color="black" />

</TouchableOpacity>
    </View>
,
    });
 }, [])

 const enterChat = (id,chatName) =>{
     navigation.navigate("Chats",{
         id:id,
         chatName:chatName,
     })
 }
    return (
        <SafeAreaView>
           <ScrollView style={styles.container}>
           
           {Chats.map(({id, data : {chatName} }) =>
               (
            <CustomList key={id} id={id} chatName={chatName} enterChat={enterChat}  />
           
           ))}

           </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        height:"100%",

    },

})
