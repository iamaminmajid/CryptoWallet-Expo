import './global'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';

import './shim.js';
import WalletProvider from './src/components/EthereumProvider';
import Wallet from './src/components/Wallet';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import HomeScreen from './src/screens/HomeScreen';
import Scanner from './src/screens/Scanner';
import ProfileScreen from './src/screens/ProfileScreen';
// import bip39 from 'bip39';

// console.log(bip39.entropyToMnemonic(e) );
const Tab = createBottomTabNavigator();

export default function App() {
//   var e = Random.getRandomBytes(16);
// console.log(e.join(' '));
// const mnemonic = bip39.entropyToMnemonic('133755ff')
// console.log(mnemonic)
// console.log(bip39.entropyToMnemonic(e) );
  // console.log(ethers.utils.HDNode.entropyToMnemonic(e))
  // console.log(ethers.utils.entropyToMnemonic(e))
  console.log("one")
  
  return (
    // <><Text>testasdf asdfasdfasdfa asdf asf </Text></>
    <NavigationContainer>
      
        <Tab.Navigator screenOptions={{
          // activeTintColor: '#1a4aba',
        }}>
            
          <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({color}) => (<FontAwesome name="home" size={18}/>)
            
          }}/>
              
          {/* <Tab.Screen name="Scan" component={HomeScreen} options={{
            tabBarLabel: 'Scan',
            headerShown: false,
            tabBarIcon: ({color}) => (<FontAwesome name="camera" size={18}/>)
            
          }}/> */}
              
            <Tab.Screen name="Settings" component={ProfileScreen} options={{
              tabBarLabel: 'Profile',
              headerShown: false,
              tabBarIcon: ({color}) => (<FontAwesome name="user" size={18}/>)
              
            }}/>

        </Tab.Navigator>
        
      </NavigationContainer>
     
    // <></>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
