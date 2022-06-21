import React from 'react';
import {View, 
    Text,
    SafeAreaView,
    ScrollView,
    StatusBar
} from 'react-native'


import FontAwesome from '@expo/vector-icons/FontAwesome';

import List from '../blocks/list.js'
import Welcome from '../blocks/welcome.js';

import ItemScreen from './ItemScreen.js'

import ProfileScreen from './ProfileScreen.js'

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import BTC from '../tokens/btc/btc.js';

import CryptoContainer from '../blocks/CryptoContainer.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function HomeScreen(){
    return(<>
     <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}} />
        <Stack.Screen name="Coin" component={ItemScreen} options={{headerShown: false}} />
        
    </Stack.Navigator>
    </>)
}

import WalletProvider from '../components/EthereumProvider'
import Wallet from '../components/Wallet'
import LoginScreen from './LoginScreen.js';
export function MainScreen(){

    const navigation = useNavigation();

    return (
        
        <SafeAreaView style={{height:"100%"}}>
            <StatusBar/>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Welcome />   
                <WalletProvider>
                  <Wallet nav={useNavigation}/>
                </WalletProvider>
                {/* <Text>e</Text>  */}
                {/* <CryptoContainer /> */}
                {/* <BTC/> */}
                {/* <List /> */}
                
            </ScrollView>
        </SafeAreaView>
    )
}
