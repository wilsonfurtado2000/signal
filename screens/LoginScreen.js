import React,{useState,useEffect} from 'react';
import { KeyboardAvoidingView, KeyboardAvoidingViewBase, StyleSheet, Text, View } from 'react-native';
import {Button,Input ,Image} from 'react-native-elements';
import {StatusBar} from 'expo-status-bar';
import {auth} from '../firebase';
const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) =>{
          if(authUser){
              navigation.replace("Home");
          }
      });
      return unsubscribe;
    }, []);

    const signIn = () =>{
auth.signInWithEmailAndPassword((email,password)).catch((err)=>alert(err));
    }
    return (
        <KeyboardAvoidingView behavior="padding"  style={styles.container}>
        <StatusBar style="light" />
            <Image source={{
                uri:"https://www.wired.com/wp-content/uploads/2016/10/Signal_TA-1024x769.jpg",
            }}
            
            style={{width:200,height:200,marginBottom: 50,}}
             />
      
        <View style={styles.inputContainer} >
<Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text)=>setEmail(text)} ></Input>
<Input placeholder="Password" secureTextEntry type="password" onSubmitEditing={signIn} value={password} onChangeText={(text)=>setPassword(text)} />
        </View>
        <Button containerStyle={styles.button} onPress={signIn} title="Login"
        onSubmitEditing={signIn} />
        <Button onPress={()=>navigation.navigate("Register")} containerStyle={styles.button}  type="outline" title="Register" />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({

    inputContainer:{
             width: 300,

    },
    button:{
        width:200,
        marginTop: 10,
    },
    container:{
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        padding: 10,
        backgroundColor:"white",

    },

})
