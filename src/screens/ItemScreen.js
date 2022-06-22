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
import { AssetType, Asset, sendEther, loadAssets, AssetName } from '../lib/ethereum/assets';

import Chart from './Chart';

import * as SecureStore from 'expo-secure-store'
import { ASSETS } from '../components/EthereumProvider';
import Transactions from '../blocks/Transactions';


export default function ItemScreen(props){
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);

    
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
        setScanned(false);
        setWaitVerification(false)
        setAddress(null)
        setWaiting(false);
    }
    function handleModal3(){
        setModalVisible3(false)
    }
    function handleModalOn3(){
        setModalVisible3(true)
    }

    function SendTransaction(){
        
        // handleModal2()
        setWaiting(true);
        console.log('sending')
        // console.log(Number(ethers.utils.formatEther(gas)) );
        try{
            props.route.params.sendAsset(Address, Amount, coin.type);
            alert('Transaction in progress, check back in a bit.')
        }catch(e){
            alert('Gas fee is too high right now and your balance is low.')
        }
        // return 
    }

    const [wait, setWaiting] = useState(false);
    const coin = props.route.params.asset;
    const wallet = props.route.params.wallet;

    const [coinData, setCoinData] = useState();

    



    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    
    const [asset, setAsset] = useState();
    
    const [gas, setGas] = useState(4)

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

      useEffect(() => {
        // console.log(assets)
        // {}
        console.log(wallet.address)

        axios.get('https://min-api.cryptocompare.com/data/price?fsym='+coin.type+'&tsyms=USD').then((e) => {
            setCoinData( (e.data.USD * coin.balance ).toFixed(6) ); 
        })
        // console.log(wallet)
        
    
    
      }, []);
    const [waitVerification, setWaitVerification] = useState(false);
    const handleBarCodeScanned = ({ type, data }) => {
        let c = data.split(":")[0];
        console.log(data.split(":")[1])
        // console.log(AssetName[coin.type]);
        
        if(c != AssetName[coin.type] && typeof(data.split(":")) == Array){
            alert('This is not a ' + AssetName[coin.type] + ' Address')
        }else if(data.split(":")[1] != undefined){
            console.log("a")
            setScanned(true);
            setWaitVerification(true)
            setAddress(data.split(":")[1]);
            
        }else{
            console.log("e")
            setScanned(true);
            setWaitVerification(true)
            setAddress(data) ;
        }
        
      };
      

      const [Address, setAddress] = useState(null);
      const [Amount, setAmount] = useState(null);

      const [High, setHigh] = useState(null);
      const [Low, setLow] = useState(null);

    //   const [Alert, setAlert] = useState(null);
    async function setAlert(h, l, token){
        // let e = await SecureStore.setItemAsync('alert-' + token, JSON.stringify([l,h,token]))
        alert('Price Alert Added')
        handleModal3()
    }

    

    return(
        
        <SafeAreaView>
            <StatusBar/>
            <ScrollView>
            <View style={styles.containerTop}>

                <Image style={{height:50, width:50, marginBottom:5}} source={{uri: 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/128/color/'+ coin.type.toLocaleLowerCase() +'.png'}}/>
                <Text style={styles.smallText}>{coin.balance}</Text>
                <Text style={styles.text}>${coinData}</Text>
                <Text style={styles.smallText}>{getNetwork()} Network</Text>

                {/* <Text style={styles.smallText}>Min Gas {gas}</Text> */}
                <View style={styles.action}>
                    <View style={styles.iconBox}>
                        <TouchableOpacity style={styles.icon} onPress={handleModalOn2}>
                            <FontAwesome name="arrow-up" color="#fff" size={22}/>
                        </TouchableOpacity>
                        <Text style={styles.iconText}>Send</Text>
                    </View>
                    <View style={styles.iconBox}>
                        <TouchableOpacity style={styles.icon} onPress={handleModalOn}>
                            <FontAwesome name="arrow-down" color="#fff" size={22}/>
                        </TouchableOpacity>
                        <Text style={styles.iconText}>Receive</Text>
                    </View>
                    <View style={styles.iconBox}>
                        <TouchableOpacity style={styles.icon}  onPress={handleModalOn3}>
                            <FontAwesome name="comment" color="#fff" size={22}/>
                        </TouchableOpacity>
                        <Text style={styles.iconText}>Setup Alert</Text>
                    </View>
                </View>
            </View>
            
            <Chart asset={coin}/>
            
            <Transactions wallet={wallet} coin={coin}/>
            
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
                        {wait == false ?
                        <TouchableOpacity style={styles.button} onPress={SendTransaction}>
                            <FontAwesome name="send" color={"#fff"}/> 
                            <Text style={{color:"#fff", marginLeft:12}}>Send</Text>
                        </TouchableOpacity> : <><ActivityIndicator/><Text>Transaction in progres</Text></>}
                    </View>
                </View>
            </Modal>
            <Modal isVisible={isModalVisible3} onBackdropPress={handleModal3}>
                <View style={styles.Modal}>
                    <View style={styles.ModalInner}>
                        <Text style={styles.label}>Setup Alerts</Text>
                        
                        <Text style={styles.label2}>When price is lower than:</Text>
                        <TextInput style={styles.input} onChangeText={(value) => setLow(value)} value={Address}/>
                        <Text style={styles.label2}>When price is higher than:</Text>
                        <TextInput style={styles.input} onChangeText={(value) => setHigh(value)}/>
                        <TouchableOpacity style={styles.button} onPress={() => {setAlert(Low, High, coin.type)}}>
                            <FontAwesome name="send" color={"#fff"}/> 
                            <Text style={{color:"#fff", marginLeft:12}}>Save</Text>
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
    

})