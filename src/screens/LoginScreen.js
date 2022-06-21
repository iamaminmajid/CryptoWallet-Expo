import react, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableHighlight, SafeAreaView, StatusBar, TextInput, Image} from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import * as SecureStore from 'expo-secure-store'

// import MainScreen from "./HomeScreen";

import { MainScreen } from "./HomeScreen";
import * as LocalAuthentication from 'expo-local-authentication';


function LoginScreen (){

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState();

    const onChangePassword = (e) => {
        setPassword(e);
    }
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e);
    }

    const [registered, setRegistered] = useState(false);
    const [logged, setLogged] = useState(false);
    const storeData = async () => {
        if(password == confirmPassword){
            try {
                const jsonValue = JSON.stringify(password)
                await SecureStore.setItemAsync('storage_Key', jsonValue)
                alert("Password Saved!");
                setRegistered(true);
              } catch (e) {
                console.log(e)
              }
        }else{
            alert("Password does not match.");
        }
        
      }
      
      const checkData = async () => {
        try {
            const value = await SecureStore.getItemAsync('storage_Key')
            const evalue = JSON.parse(value);
            // console.log(evalue + "-" + password)
            if(evalue == password) {
                setLogged(true);
                alert("Logged in!");
            }
            
            
            } catch (e) {
            // saving error
            }
        
      }

      async function clearData (){
        try {
            const val = await SecureStore.deleteItemAsync("storage_Key");
            setRegistered(false);
          } catch (e) { 
            // saving error 
          }
      }
    //   clearData()
 
      async function getData (){
        try {
            const value = await SecureStore.getItemAsync('storage_Key')
            if(value != null){
                setRegistered(true);
            }else{
                setRegistered(false);
            }
        } catch(e) {
        }
      }
      getData();
    //   useEffect(() => {
        
    //   });
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
          })();

    }, [])

    const handleBiometricAuth = async () => {  
        const biometricAuth = await LocalAuthentication.authenticateAsync({
              promptMessage: 'Login with Biometrics',
              disableDeviceFallback: true,
            });
      }
    
    if(logged == true){
        return(
           <MainScreen />
        )
    }else if(logged == false && registered == true){
        return (
            
            <SafeAreaView style={{height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <StatusBar/>
            <View style={styles.container}>
                <Image style={{width:130, height:120}} source={require('./../blocks/logo.png')} />
                <Text style={styles.text}>Login</Text>
                <Text style={styles.smallText}>To access your funds now!</Text>
                <View>
                    <TextInput secureTextEntry={true} style={styles.input} placeholder="Enter Password" onChangeText={onChangePassword}/>
                    {/* <CheckBox style={styles.checkbox} leftText={"Turn on Face/Touch ID"}/> */}
                    <TouchableHighlight style={styles.btn} onPress={checkData}><Text style={styles.btnText}>Login</Text></TouchableHighlight>

                    <TouchableHighlight onPress={handleBiometricAuth} style={{marginTop:25, textAlign:'center', width:"100%"}}><Text>Login with FaceId</Text></TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
        )
        

    }
      
      
 
    return (

        <SafeAreaView style={{height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <StatusBar/>
            <View style={styles.container}>
                <Image style={{width:130, height:120, marginBottom:25}} source={require('./../blocks/logo.png')} />
                <Text style={styles.text}>Setup Your Account</Text>
                <Text style={styles.smallText}>Choose a password to login into the wallet, This password cannot be recovered.</Text>
                <View>
                    <TextInput secureTextEntry={true} style={styles.input} placeholder="Enter Password" onChangeText={onChangePassword}/>
                    <TextInput secureTextEntry={true} style={styles.input} placeholder="Confirm Password" onChangeText={onChangeConfirmPassword}/>
                    {/* <CheckBox style={styles.checkbox} leftText={"Turn on Face/Touch ID"}/> */}
                    <TouchableHighlight style={styles.btn} onPress={storeData}><Text style={styles.btnText}>Set Password</Text></TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    container: {
        textAlign:"center",
        // height:"50%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:25
    },
    btn:{
        backgroundColor:"#333",
        marginTop:25,
        borderRadius:5,
        padding:12
    },
    checkbox:{
        marginTop:20
    },
    btnText:{
        color:"#fff",
        textAlign:"center"
    },
    input:{
        borderWidth:2,
        borderColor:"#333",
        borderStyle:"solid",
        width:180,
        padding:6,
        borderRadius:5,
        marginTop:25,
        fontSize:18

    },
    text:{
        color:"#333",
        textAlign:"center",
        fontSize:28,
        fontWeight:"600",
        textTransform:"uppercase",
        marginBottom:15
    },
    smallText:{
        fontWeight:"300",
        textAlign:"center",
        fontSize:18
    },
    action:{
        display:"flex",
        flexDirection:"row",
        padding:12
    },
    iconText:{
        textAlign:"center",
        fontWeight:"300",
        marginTop:4
    },
    icon:{
        // fontSize:14,
        // width:"33.33%",
        borderRadius:50,
        marginLeft:10,
        marginRight:10,
        padding:15,
        color:"#fff",
        backgroundColor:"#1a4aba"
    }
})
export default LoginScreen;