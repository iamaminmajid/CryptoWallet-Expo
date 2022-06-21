import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { getNetwork } from '../lib/ethereum/network';

import logo from './logo.png';

export default function Welcome(props){
    return(
        <View style={styles.container}>
            <Image style={{width:130, height:120}} source={require('./logo.png')} />
            <Text style={styles.smallText}>{getNetwork()} Network</Text>
        </View>
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
    text:{
        color:"#333",
        textAlign:"center",
        fontSize:34,
        fontWeight:"600",
        textTransform:"uppercase"
    },
    smallText:{
        fontWeight:"300",
        textTransform:"capitalize"
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