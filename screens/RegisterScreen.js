import { StatusBar } from 'expo-status-bar'
import React,{useState,useLayoutEffect} from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import {Button,Input,Text} from 'react-native-elements'
import {db,auth} from '../firebase';
const RegisterScreen = ({navigation}) => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ImageUrl, setImageUrl] = useState("");
    const register =()=>{
auth.createUserWithEmailAndPassword(Email,Password).then((authUser) =>{
authUser.user.updateProfile({
    displayName:Name,
    photoURL:ImageUrl,
})
}).catch((err) => alert(err.message));
    };
    useLayoutEffect(() => {
       navigation.setOptions({
           headerBackTitle:"Login"
       });
    }, [navigation]);

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
           <StatusBar style="light" />
           <Text h3 style={{marginBottom: 50 }} >
           Create a Signal Account
           </Text>
           <View style={styles.inputContainer}>
           <Input placeholder="Full Name" autoFocus type="text" value={Name} onChangeText={(text)=>setName(text)}  />
           <Input placeholder="Email"  type="email" value={Email} onChangeText={(text)=>setEmail(text)}  />
           <Input placeholder="Password" secureTextEntry type="password" value={Password} onChangeText={(text)=>setPassword(text)}  />
           <Input placeholder="Profile picture Url"  type="text" value={ImageUrl} onChangeText={(text)=>setImageUrl(text)}
           onSubmitEditing={register}  />

           </View>
           <Button title="Register"
           onPress={register}
           raised containerStyle={styles.button} />
<View style={{height:100}} />
        </KeyboardAvoidingView>
      
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:"white",
    },
    button:{
        width:200,
        marginTop:10,

    },
    inputContainer:{
        width:300,

    }
})
