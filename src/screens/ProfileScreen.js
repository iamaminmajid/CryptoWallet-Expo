import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, SectionList, Button, TextInput } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

// import auth from '@react-native-firebase/auth';

export default function ProfileScreen(){
    return(
        <SafeAreaView>
            
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