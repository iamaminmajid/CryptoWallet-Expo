import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Dashboard(props){
    return(
        <View style={styles.container}>
            <FontAwesome name="coins" fontSize={64} style={{paddingBottom:15}}/>
            <Text style={styles.text}>$44,940</Text>
            <Text style={styles.smallText}>Main Wallet</Text>
            <View style={styles.action}>
                <View style={styles.iconBox}>
                    <View style={styles.icon}>
                        <FontAwesome name="arrow-up" color="#fff" fontSize={22}/>
                    </View>
                    <Text style={styles.iconText}>Send</Text>
                </View>
                <View style={styles.iconBox}>
                    <View style={styles.icon}>
                        <FontAwesome name="arrow-down" color="#fff" fontSize={22}/>
                    </View>
                    <Text style={styles.iconText}>Receive</Text>
                </View>
                <View style={styles.iconBox}>
                    <View style={styles.icon}>
                        <FontAwesome name="credit-card" color="#fff" fontSize={22}/>
                    </View>
                    <Text style={styles.iconText}>Buy</Text>
                </View>
            </View>
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
        fontWeight:"300"
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