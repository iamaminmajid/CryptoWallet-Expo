import React, { useState, useEffect } from 'react';
import {
    Text,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Image,
    ActivityIndicator,
    useWindowDimensions
} from 'react-native'
// import Welcome from '../blocks/welcome';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getNetwork } from '../lib/ethereum/network';
import axios from "axios";

import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer } from '@react-navigation/native';
import { ethers, Wallet } from 'ethers';
import { sendAsset } from '../lib/ethereum/wallet';
import { sendEther } from '../lib/ethereum/assets';

import Chart from './Chart';

export default function ItemScreen(props){
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);

    
    function handleModal(){
        setModalVisible(false)
    }
    function handleModalOn(){
        setModalVisible(true)
    }
    function handleModal2(){
        setModalVisible2(false)
    }
    function handleModalOn2(){
        setModalVisible2(true)
    }
    const coin = props.route.params.asset;
    const wallet = props.route.params.wallet;

    const [coinData, setCoinData] = useState();

    const [history, setHistory] = useState();
    const [inthistory, setIntHistory] = useState();



    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

      useEffect(() => {
        // console.log(wallet.address)

        axios.get('https://min-api.cryptocompare.com/data/price?fsym='+coin.type+'&tsyms=USD').then((e) => {
            setCoinData( (e.data.USD * coin.balance ).toFixed(4) ); 
        })
    // console.log(wallet)
    if(coin.type == 'ETH'){
        axios.get('https://api-ropsten.etherscan.io/api?module=account&action=txlist&address='+wallet.address+'&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=5MTJT2IR25UKZ9PHKSUSZQFQ7ZG34DBT2S').then((e) => {
            setHistory( e.data ); 
            axios.get('https://api-ropsten.etherscan.io/api?module=account&action=txlistinternal&address='+wallet.address+'&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=5MTJT2IR25UKZ9PHKSUSZQFQ7ZG34DBT2S').then((e) => {
                setIntHistory( e.data ); 
                setLoading(false);
            })
        })
    }else{
        axios.get('https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address='+wallet.address+'&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=5MTJT2IR25UKZ9PHKSUSZQFQ7ZG34DBT2S').then((e) => {
            setHistory( e.data ); 
            setLoading(false);
        })
    }
    
    
      }, []);
    const [waitVerification, setWaitVerification] = useState(false);
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setWaitVerification(true)
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setAddress(data);
      };
      
    
      const [selectedTab, setSelectedTab] = useState('red');

      const [Address, setAddress] = useState(null);
      const [Amount, setAmount] = useState(null);

  const renderRedContents = () => (
    
    <View style={[styles.contents, styles.redContents]}>
      {/* <Text style={styles.contentsText}>red tab contents</Text> */}
      {/* {console.log(history.result[0])} */}
        {history.result.map((trx) => {
            
            let tokenBalance = ethers.BigNumber.from(trx.value);
            let e = Number(ethers.utils.formatEther(tokenBalance));
            if(trx.to == wallet.address.toLocaleLowerCase()){
                return(
                    <View style={styles.tran}>
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
                            <Text style={styles.val}>{coin.type == 'ETH'? e : trx.value/1000000}</Text>
                        </View>
                    </View> 
                )
            }else{
                return( 
                    <View style={styles.tran}>
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
                            <Text style={styles.val}>{coin.type == 'ETH'? e : trx.value/1000000}</Text>
                        </View>
                    </View> 
                )
            }
          })
        }
      
      {history.result.length == 0 ? <Text>No Transactions Found</Text> : <></>}
    </View>
  );

  const renderBlueContents = () => (
    <View style={[styles.contents, styles.redContents]}>
      {/* <Text style={styles.contentsText}>red tab contents</Text> */}
      <ScrollView>
      {/* {console.log(inthistory.result)} */}
        {inthistory.result.map((trx) => {
            
            let tokenBalance = ethers.BigNumber.from(trx.value);
            let e = Number(ethers.utils.formatEther(tokenBalance));
            if(trx.to == wallet.address.toLocaleLowerCase()){
                return(
                    <View style={styles.tran}>
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
                    <View style={styles.tran}>
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

    return(
        <SafeAreaView>
            <StatusBar/>
            <ScrollView>
            <View style={styles.containerTop}>
            <Image style={{height:50, width:50, marginBottom:5}} source={{uri: 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/128/color/'+ coin.type.toLocaleLowerCase() +'.png'}}/>
                {/* <FontAwesome name="money" fontSize={64} style={{paddingBottom:15}}/> */}
                <Text style={styles.smallText}>{coin.balance}</Text>
                <Text style={styles.text}>${coinData}</Text>
                <Text style={styles.smallText}>{getNetwork()} Network</Text>
                <View style={styles.action}>
                    <View style={styles.iconBox}>
                        <TouchableOpacity style={styles.icon} onPress={handleModalOn2}>
                            <FontAwesome name="arrow-up" color="#fff" fontSize={22}/>
                        </TouchableOpacity>
                        <Text style={styles.iconText}>Send</Text>
                    </View>
                    <View style={styles.iconBox}>
                        <TouchableOpacity style={styles.icon} onPress={handleModalOn}>
                            <FontAwesome name="arrow-down" color="#fff" fontSize={22}/>
                        </TouchableOpacity>
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
            
            <Chart asset={coin}/>
            
            <View style={styles.container}>
            
                {coin.type == 'ETH' ? (<>
                    
                    <View style={styles.tabs}>
                        <View style={selectedTab === 'red' ? styles.underline : styles.normalTab}>
                            <TouchableOpacity style={styles.tab} onPress={() => { setSelectedTab('red'); }} ><Text>Transactions</Text></TouchableOpacity>
                        </View>
                        <View style={selectedTab === 'blue' ? styles.underline : styles.normalTab}>
                            <TouchableOpacity style={styles.tab} onPress={() => { setSelectedTab('blue' ); }}><Text>Internal Trnx</Text></TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView>
                    
                    {loading == false ? selectedTab === 'red'
                    ? renderRedContents()
                    : loading == false ? renderBlueContents() : <ActivityIndicator/> : <ActivityIndicator/> }

                    </ScrollView>
                    
                
                </>) : <>
                    {loading == false ? renderRedContents() : <ActivityIndicator/>}
                </>} 
                
                
            </View>
            

            <Modal isVisible={isModalVisible} onBackdropPress={handleModal}>
                <View style={styles.Modal}>
                    <View style={styles.ModalInner}>
                        <Text style={styles.label}>Scan QR Code to receive payments</Text>
                        <View style={styles.qr}>
                            <QRCode value={wallet.address} backgroundColor="transparent" size={220}/>
                        </View>
                        <Text style={styles.label}>{wallet.address}</Text>
                    </View>
                </View>
            </Modal>
{/* {console.log()} */}
            <Modal isVisible={isModalVisible2} onBackdropPress={handleModal2}>
                <View style={styles.Modal}>
                    <View style={styles.ModalInner}>
                        <Text style={styles.label}>Scan QR Code or Enter Address</Text>
                        {waitVerification == false ? 
                        <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{height:250, width:"100%", marginTop:0}}
                        type='back' /> : <></> }
                        <Text style={styles.label2}>Address</Text>
                        <TextInput style={styles.input} onChangeText={(value) => setAddress(value)} value={Address}/>
                        <Text style={styles.label2}>Amount</Text>
                        <TextInput style={styles.input} onChangeText={(value) => setAmount(value)}/>
                        <TouchableOpacity style={styles.button} onPress={() => props.route.params.sendAsset(0xD8342326ee0bCD0c9387ea6f5E3E19BcD597D999, 0.1, coin.type)}>
                            <FontAwesome name="send" color={"#fff"}/> 
                            <Text style={{color:"#fff", marginLeft:12}}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#1a4aba",
        padding:12,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        color:"#fff",
        borderRadius:50,
    },
    Modal:{
        position:"absolute",
        bottom:0, 
        width:"100%",
        // borderRadius:30,
        // overflow:"hidden",
        
    },
    pagerView: {
        flex: 1,
        backgroundColor:"#333"
      },
    input:{
        padding:12,
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"#d3d3d3",
        marginBottom:15,
        width:"100%",
        borderRadius:5
    },
    label2:{
        marginTop:15,
        textAlign:"left",
        textTransform:"uppercase",
        fontSize:10,
        fontWeight:"400"
    },
    ModalInner:{
        // margin:15,
        backgroundColor:"#fff",
        // height:50,
        padding:25,
        borderRadius:20,
    },

    container:{
        padding:20,
        paddingTop:0
    },
    heading:{
        fontSize:26,
        fontWeight:"700",
        color:"#1a4aba"
    },
    containerTop: {
        textAlign:"center",
        // height:"50%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:25
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
    },
    label:{
        marginBottom:25,
        textAlign:'center'
    },
    qr:{
        marginBottom:25,
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
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