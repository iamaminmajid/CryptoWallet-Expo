import React, { useState } from "react"
import { View } from "react-native"
import { useEffect } from "react"
import { LineChart } from "react-native-chart-kit"
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native'
import axios from "axios"
import { ScrollView } from "react-native-gesture-handler"

export default function Chart(props){

    const [history, setHistory] = useState([])
    const [historyTime, setHistoryTime] = useState([]);

    const [history24, setHistory24] = useState([])
    const [historyTime24, setHistoryTime24] = useState([]);

    const [loading, setLoading] = useState(true);


    const [selectedTab, setSelectedTab] = useState('one');

    useEffect(() => {
        if(loading == true){
            axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym='+ props.asset.type +'&tsym=USD&limit=30').then((e) => {
                e.data.Data.Data.forEach(element => {
                    
                    setHistory(history => [...history, element.close])

                    setHistoryTime(historyTime => [...historyTime,  new Date(element.time * 1000).getDate() ]);
                    
                    setLoading(false);  

                });
                console.log(historyTime)
                
            })

            axios.get('https://min-api.cryptocompare.com/data/v2/histohour?fsym='+ props.asset.type +'&tsym=USD&limit=24').then((e) => {
                e.data.Data.Data.forEach(element => {
                    
                    setHistory24(history24 => [...history24, element.close])
                    setHistoryTime24(historyTime24 => [...historyTime24,  new Date(element.time * 1000).getUTCHours() ]);
                    setLoading(false);
                });
            })

            // axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym='+ props.asset.type +'&tsym=USD&limit=5').then((e) => {
            //     e.data.Data.Data.forEach(element => {
                    
            //         setHistory(history => [...history, element.close])
            //         setLoading(false);
            //     });
            // })
    }

    }, [])


    if(loading){
        return <ActivityIndicator/>
    }else{
    return(<View><View>
        
        <View style={styles.tabs}>
            <View style={selectedTab === 'one' ? styles.underline : styles.normalTab}>
                <TouchableOpacity style={styles.tab} onPress={() => { setSelectedTab('one'); }} ><Text>Last 30 Days</Text></TouchableOpacity>
            </View>
            <View style={selectedTab === 'two' ? styles.underline : styles.normalTab}>
                <TouchableOpacity style={styles.tab} onPress={() => { setSelectedTab('two' ); }}><Text>Last 24 Hours</Text></TouchableOpacity>
            </View>
        </View>
    {selectedTab == "one" ? (
        <View>
            <ScrollView horizontal={true}>
            <LineChart
                data={{
                labels: historyTime,//['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    data: history
                }]
                }}
                
                width={Dimensions.get('window').width + 320} // from react-native
                height={220}
                chartConfig={{
                // backgroundColor: 'transparent',
                decimalPlaces: 3, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 15,
                    overflow:'scroll'
                }
                }}
                
                style={{
                // marginVertical: 8,
                borderRadius: 16,
                padding:15
                }}
            />
            </ScrollView> 
        </View> ): (<View>
            <ScrollView horizontal={true}>
            <LineChart
                data={{
                labels: historyTime24,//['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    data: history24
                }]
                }}
                
                width={Dimensions.get('window').width + 320} // from react-native
                height={220}
                chartConfig={{
                // backgroundColor: 'transparent',
                decimalPlaces: 3, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 15,
                    overflow:'scroll'
                }
                }}
                
                style={{
                // marginVertical: 8,
                borderRadius: 16,
                padding:15
                }}
            />
            </ScrollView> 
        </View>) }</View></View>)
    }
}


const styles = StyleSheet.create({

    container:{
        padding:20,
        paddingTop:0
    },
    tabs:{
        display:"flex",
        flexDirection:"row",
        marginLeft:20,
        marginRight:20
    },
    underline:{
        // width:"50%",
        backgroundColor:"#dfdfdf",
        borderRadius:50,
        width:"50%",
        padding:10,
        // paddingBottom:/10
        textAlign:"center",
    },
    normalTab:{
        width:"50%",
        padding:10,
        textAlign:"center",
        // paddingBottom:10
        // borderBottomColor:"#333",
        // borderBottomWidth:1,
    },
    tab:{
        // padding:10,
        // paddingLeft:25
    },
    
})