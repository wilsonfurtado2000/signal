import React,{useLayoutEffect,useState} from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import {AntDesign,FontAwesome,  Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native';
import { db,auth } from '../firebase';
import * as firebase from 'firebase';
import { set } from 'react-native-reanimated';
const Chats = ({navigation,route}) => {

    const [Message,setMessage] = useState([]); 

    const sendMessage = () => {
Keyboard.dismiss();
db.collection("chats").doc(route.params.id).collection("messages").add({
    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    message:Input,
    displayName:auth.currentUser.displayName,
    photoURL:auth.currentUser.photoURL,
    email:auth.currentUser.email,
})


setInput("");
    }
    useLayoutEffect(() => {
     const unsubscribe = db.collection("chats").doc(route.params.id).collection("messages").orderBy("timestamp","desc").onSnapshot((snapshot)=>setMessage(
         snapshot.docs.map((doc)=>({
             id:doc.id,
             data:doc.data()
         }))
     ))
     return unsubscribe;
    }, [route])


    const [Input, setInput] = useState("");
    useLayoutEffect(() => {
   navigation.setOptions({
       title:"Chat",
       headerTitleAlign:"left",
       headerTitle: () =>
       <View 
       style={{
           flexDirection:"row",
           alignItems:"center",
       }}>
           <Avatar rounded source={{
               uri: Message[0]?.data.photoURL ,
             
           }} >

           </Avatar>
           <Text style={{color:"white",marginLeft:10,fontWeight:"700"}} >{route.params.chatName}</Text>
       </View>,
       headerLeft:() =>
       <TouchableOpacity 
       style={{marginLeft:10,
       }}
       onPress={navigation.goBack}>
<AntDesign name="arrowleft"  size={24} color="white"
/>
       </TouchableOpacity>,
       headerRight : () =>
       <View style={{
           flexDirection:"row",
           justifyContent:"space-between",
           width:80,
           marginRight:20,
       }}>
           <TouchableOpacity>
               <FontAwesome name="video-camera" size={24} color="white" />
           </TouchableOpacity>
           <TouchableOpacity>
               <Ionicons name="call" size={24} color="white" />
           </TouchableOpacity>
       </View>
   })
    }, [navigation,Message])
    return (
        <SafeAreaView style={{
            flex:1,backgroundColor:"white",
        }}>
        <StatusBar style="white"></StatusBar>
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios"?"padding":"height"}
        style={styles.container}
        keyboardVerticalOffset={90}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
 
            <ScrollView contentContainerStyle={{paddingTop:15,paddingRight:15, marginBottom:15}}>
            {Message.map(({id,data})=>
  data.email === auth.currentUser.email ? (
    <View key = {id} style={styles.rec}>
<Avatar
rounded

bottom={-15}
right={-5}
size={30}
containerStyle={{
    position:"absolute",
    bottom:-15,
    right:-5,
}}
source=
{{
    uri:data.photoURL,
}} />
<Text style={styles.recieverText}>{data.message}</Text>
    </View>
):(
    <View style={styles.send} >
    <Avatar
    rounded
position="absolute"
bottom={-15}
right={-5}
size={30}
containerStyle={{
    position:"absolute",
    bottom:-15,
    right:-5,
}}
source=
{{
    uri:data.photoURL,
}} />
<Text style={styles.senderText}>{data.message}</Text>
<Text style={styles.senderName}>{data.displayName}</Text>
    </View>
)
            )}

</ScrollView>
<View style={styles.footer}>
<TextInput value={Input} onChangeText={(text)=>setInput(text)} onSubmitEditing={sendMessage} placeholder="signal message" style={styles.textip} >

</TextInput>
<TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
<Ionicons name="send" size={24} color="#2868E6"></Ionicons>
</TouchableOpacity>
</View>
   

        </>

</TouchableWithoutFeedback>
        </KeyboardAvoidingView>
            <Text></Text>
        </SafeAreaView>
    )
}

export default Chats

const styles = StyleSheet.create({
    container:{flex:1,
    },
    footer:{ flexDirection:"row",
alignItems:"center",
width:"100%",
padding:15,},
    textip:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"transperant",
        backgroundColor:"#ECECEC",
        borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius:30,
    },
    rec:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    },
    send:{
        padding:15,
        backgroundColor:"#2868E6",
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
        maxWidth:"80%",
        position:"relative",
    },
    senderName:{
        left:10,
        paddingRight:10,
fontSize:10,
color:"white",
    },
    senderText:{
        color:"white",
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15,
    },
    recieverText:{
        color:"black",
        fontWeight:"500",
        marginLeft:10,
    },


})
