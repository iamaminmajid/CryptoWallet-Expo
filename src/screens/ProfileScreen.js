import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, SectionList, Button, TextInput } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

// import auth from '@react-native-firebase/auth';
import * as SecureStore from 'expo-secure-store';
export default function ProfileScreen(){
    async function clearData (){
        try {
            const val = await SecureStore.deleteItemAsync("storage_Key");
            // setRegistered(false);
            
          } catch (e) { 
            // saving error 
          }
      }

    return(
        <SafeAreaView>
            <SectionList style={styles.list} sections={[
                {title: 'Profile Settings', data:[{title: 'Logout', icon:'sign-out'}]},
                // {key: 'Settings'}
            ]}
            renderItem={({item}) => <Text onPress={() => clearData() } style={styles.listItem}> <FontAwesome style={{position:"absolute", paddingLeft:30, color:"#333"}} size={16} name={item.icon} /> {item.title}</Text>}
            renderSectionHeader={({section}) => <Text style={styles.heading}>{section.title}</Text>}
            keyExtractor={(item,index) => index}
            />  
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    heading:{
        fontSize:24,
        paddingBottom:10,
        fontWeight:"600"
    },
    list:{
        padding:20
    },
    listItem:{
        padding:12,
        backgroundColor: "#fff",
        fontWeight:"500",
        shadowOpacity:0.1,
        shadowRadius:1,
        shadowOffset:{width:0, height:3},
        borderRadius:6,
        borderBottomColor:"#333",
        borderBottomWidth:1,
        borderStyle:"solid",
        fontSize:16,
        paddingLeft:25
    }
})