import { useEffect, useState } from "react";
import axios from "axios";
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, ActivityIndicator } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ethers } from "ethers";
import { TOKENS } from "../lib/ethereum/assets";
import { getNetwork, Networks } from "../lib/ethereum/network";
export default function Transactions(props){

    const [history, setHistory] = useState();
    const [inthistory, setIntHistory] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('trx');

    useEffect(()=> {
        if(props.coin.type == 'ETH'){
            axios.get('https://api-ropsten.etherscan.io/api?module=account&action=txlist&address='+props.wallet.address+'&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=5MTJT2IR25UKZ9PHKSUSZQFQ7ZG34DBT2S').then((e) => {
                setHistory( e.data ); 
                axios.get('https://api-ropsten.etherscan.io/api?module=account&action=txlistinternal&address='+props.wallet.address+'&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=5MTJT2IR25UKZ9PHKSUSZQFQ7ZG34DBT2S').then((e) => {
                    setIntHistory( e.data ); 
                    setLoading(false);
                })
            })
        }else{
            let token = TOKENS[getNetwork()][props.coin.type]
            // console.log(props.coin.type)
            axios.get('https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress='+token+'&address='+props.wallet.address+'&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=5MTJT2IR25UKZ9PHKSUSZQFQ7ZG34DBT2S').then((e) => {
                setHistory( e.data ); 
                setLoading(false);
            })
        }
    }, [])


    const NormalTransactions = () => (
    
        <View style={[styles.contents, styles.redContents]}>
          {/* <Text style={styles.contentsText}>red tab contents</Text> */}
          {/* {console.log(history.result[0])} */}
            {history.result.map((trx , key) => {
                
                let tokenBalance = ethers.BigNumber.from(trx.value);
                let e = Number(ethers.utils.formatEther(tokenBalance));
                if(trx.to == props.wallet.address.toLocaleLowerCase()){
                    return(
                        <View style={styles.tran} key={key}>
                            <View style={styles.traninner}>
                                <View style={styles.icontrx}>
                                    <FontAwesome name="angle-down" size={25} color="#2196f3"/>
                                </View>
                                <View style={styles.maininfo}>
                                    <View><Text style={styles.textlabel}>Receive</Text></View>
                                    <View><Text style={styles.time}>{new Date(trx.timeStamp * 1000).toDateString()}</Text></View>
                                </View>
                            </View>
                            <View style={styles.valu}>
                                <Text style={styles.val}>{props.coin.type == 'ETH'? e : trx.value/1000000}</Text>
                            </View>
                        </View> 
                    )
                }else{
                    return( 
                        <View style={styles.tran} key={key}>
                            <View style={styles.traninner}>
                                <View style={styles.icontrx2}>
                                    <FontAwesome name="angle-up" size={25} color="#8bc34a"/>
                                </View>
                                <View style={styles.maininfo}>
                                    <View><Text style={styles.textlabel}>Send</Text></View>
                                    <View><Text style={styles.time}>{new Date(trx.timeStamp * 1000).toDateString()}</Text></View>
                                </View>
                            </View>
                            <View style={styles.valu}>
                                <Text style={styles.val}>{props.coin.type == 'ETH'? e : trx.value/1000000}</Text>
                            </View>
                        </View> 
                    )
                }
              })
            }
          
          {history.result.length == 0 ? <Text>No Transactions Found</Text> : <></>}
        </View>
    );

    const InternalTransactions = () => (
        <View style={[styles.contents, styles.redContents]}>
          {/* <Text style={styles.contentsText}>red tab contents</Text> */}
          <ScrollView>
          {/* {console.log(inthistory.result)} */}
            {inthistory.result.map((trx) => {
                
                let tokenBalance = ethers.BigNumber.from(trx.value);
                let e = Number(ethers.utils.formatEther(tokenBalance));
                if(trx.to == props.wallet.address.toLocaleLowerCase()){
                    return(
                        <View style={styles.tran} key={key}>
                            <View style={styles.traninner}>
                                <View style={styles.icontrx}>
                                    <FontAwesome name="angle-down" size={25} color="#2196f3"/>
                                </View>
                                <View style={styles.maininfo}>
                                    <View><Text style={styles.textlabel}>Receive</Text></View>
                                    <View><Text style={styles.time}>{new Date(trx.timeStamp * 1000).toDateString()}</Text></View>
                                </View>
                            </View>
                            <View style={styles.valu}>
                                <Text style={styles.val}>{e}</Text>
                            </View>
                        </View> 
                    )
                }else{
                    return( 
                        <View style={styles.tran} key={key}>
                            <View style={styles.traninner}>
                                <View style={styles.icontrx2}>
                                    <FontAwesome name="angle-up" size={25} color="#8bc34a"/>
                                </View>
                                <View style={styles.maininfo}>
                                    <View><Text style={styles.textlabel}>Send</Text></View>
                                    <View><Text style={styles.time}>{new Date(trx.timeStamp * 1000).toDateString()}</Text></View>
                                </View>
                            </View>
                            <View style={styles.valu}>
                                <Text style={styles.val}>{e}</Text>
                            </View>
                        </View> 
                    )
                }
              })
            }
            {inthistory.result.length == 0 ? <Text>No Transactions Found</Text> : <></>}
          
            </ScrollView>
        </View>
      );

    return (
    
    <View style={styles.container}>
            
        {props.coin.type == 'ETH' ? (<>
            
            <View style={styles.tabs}>
                <View style={selectedTab === 'trx' ? styles.underline : styles.normalTab}>
                    <TouchableOpacity style={styles.tab} onPress={() => { setSelectedTab('trx'); }} ><Text>Transactions</Text></TouchableOpacity>
                </View>
                <View style={selectedTab === 'itrx' ? styles.underline : styles.normalTab}>
                    <TouchableOpacity style={styles.tab} onPress={() => { setSelectedTab('itrx' ); }}><Text>Internal Trnx</Text></TouchableOpacity>
                </View>
            </View>
            <ScrollView>
            
            {loading == false ? 
            
                selectedTab === 'trx'
                    ? 
                        NormalTransactions()
                    : 
                loading == false 
                        ? InternalTransactions() : <ActivityIndicator/> : <ActivityIndicator/> }

            </ScrollView>
            
        
        </>) : <>
            {loading == false ? NormalTransactions() : <ActivityIndicator/>}
        </>} 
        
        
    </View>
    )
}

const styles = StyleSheet.create({

    container:{
        padding:20,
        paddingTop:0
    },
    tabs:{
        display:"flex",
        flexDirection:"row"
    },
    underline:{
        // borderBottomColor:"#333",
        // borderBottomWidth:1,
        width:"50%",
        backgroundColor:"#dfdfdf",
        borderRadius:50
    },
    normalTab:{
        width:"50%"
    },
    tab:{
        padding:12,
        textAlign:"center",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
        // paddingLeft:25
    },
    tran:{
        display:"flex",
        flexDirection:"row",
        marginTop:15,
        justifyContent:"space-between",
        borderBottomWidth:1,
        paddingBottom:10,
        borderBottomColor:"#d3d3d3"
    },
    icontrx:{
        width:40,
        height:40,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
        borderWidth:1,
        borderColor: "#2196f3"
        
    },
    icontrx2:{
        width:40,
        height:40,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
        borderWidth:1,
        borderColor: "#8bc34a"
    },
    maininfo:{
        paddingLeft:15,
        display:"flex",
        justifyContent:"center",
    },
    textlabel:{
        fontSize:18
    },
    time:{
        fontSize:12,
        color:"#818181"
    },
    valu:{
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-end"
    },
    val:{},
    traninner:{
        display:"flex",
        flexDirection:"row"
    }
})