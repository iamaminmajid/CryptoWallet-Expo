import React from 'react';
import {View, Text, StyleSheet, Button, TouchableHighlight, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faCertificate, faCoins } from '@fortawesome/free-solid-svg-icons'

// const CoinMarketCap = require('coinmarketcap-api');


// const apiKey = 'a2892947-6d8c-44b2-9f64-aacfcd8f2972';
// const client = new CoinMarketCap(apiKey);

// client.getMetadata({symbol: 'BTC'}).then(console.log).catch(console.error)
 
// import CryptoIcon from 'react-native-crypto-icons';
 

// import axios from 'axios';
// const navigation = useNavigation(); 

export default function List(){
    
        return (
            <View style={styles.listContainer}>
                <TouchableHighlight style={styles.listItem} underlayColor={'#f1f0f0'} onPress={() => navigation.navigate('Party')}>
                    <View style={styles.row}>
                        <View style={styles.column20}>
                            <Image style={{height:50, width:50}} source={{uri: 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/128/color/btc.png'}}/>
                            {/* <FontAwesomeIcon icon={faCoins} size="42"/> */}
                            {/* <CryptoIcon name="btc" style={{ fontSize: 45, color: 'green' }} /> */}

                        </View>
                        <View style={styles.column60}>
                            <Text style={styles.listTitle}>Bitcoin</Text>
                            <Text style={styles.city}>$47,976.08 <Text style={styles.up}>+10.36%</Text> </Text>
                        </View> 
                        <View style={styles.column20}>
                            <Text style={styles.date}>1.25</Text>
                            <Text style={styles.month}>BTC</Text>
                        </View>
                    </View>
                    
                </TouchableHighlight>
                <View style={styles.listItem}>
                    <View style={styles.row}>
                        <View style={styles.column20}>
                            {/* <FontAwesomeIcon icon={faCoins} size="42"/> */}
                        </View>
                        <View style={styles.column60}>
                            <Text style={styles.listTitle}>Ethereum</Text>
                            <Text style={styles.city}>#3,327.81 <Text style={styles.down}>-10.36%</Text></Text>
                        </View>
                        <View style={styles.column20}>
                            <Text style={styles.date}>3</Text>
                            <Text style={styles.month}>ETH</Text>
                        </View>
                    </View>
                    
                </View>
            </View>
        )
    
}


const styles = StyleSheet.create({
    row:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    up:{
        color:"#336d35"
    },
    down:{
        color:"#98150b"
    },
    column80:{
        width:"80%"
    },
    column60:{
        width:"60%"
    },
    column20:{
        width:"20%"
    },
    listContainer: {
      display:"flex",
      flexDirection: "column",
      padding:20,
    },
    listItem:{
        backgroundColor:"#fff",
        width:"100%",
        padding:20,
        shadowColor:"#333",
        shadowOpacity:0.1,
        shadowRadius:1,
        shadowOffset:{width:0, height:3},
        borderRadius:6,
        marginBottom:20
        
    },
    listTitle:{
        fontSize:18,
        fontWeight:"600",
        // textTransform:'uppercase',
        marginBottom:2,
        color:"#333"
    },
    city:{
        color:"#333"
    },
    date:{
        color:"#333",
        fontSize:30,
        textAlign:"right"
    },
    month:{
        color:"#333",
        textAlign:"right"
    }
  });