import React, { useState } from "react"
import { useEffect } from "react"
import { LineChart } from "react-native-chart-kit"
import { ActivityIndicator, Dimensions } from 'react-native'
import axios from "axios"

export default function Chart(props){
    const screenWidth = Dimensions.get('window').width;

    const [history, setHistory] = useState([])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(loading == true){
        axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym='+ props.asset.type +'&tsym=USD&limit=5').then((e) => {
            e.data.Data.Data.forEach(element => {
                
                setHistory(history => [...history, element.close])
                setLoading(false);
            });
            console.log(history)
            // setHourly( (((e.data.Data.Data[1].close - e.data.Data.Data[0].close)/e.data.Data.Data[1].close ) * 100).toFixed(2)); 
        // console.log( (( e.data.Data.Data[0].close -  e.data.Data.Data[1].close )/e.data.Data.Data[0].close ) * 100 );
        })
    }

    }, [])

    if(loading){
        return <ActivityIndicator/>
    }else{
    return(
        <>
        <LineChart
            data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                data: history
            }]
            }}
            width={Dimensions.get('window').width - 30} // from react-native
            height={220}
            chartConfig={{
            // backgroundColor: 'transparent',
            decimalPlaces: 3, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16,
                // padding:20
            }
            }}
            bezier
            style={{
            // marginVertical: 8,
            borderRadius: 16,
            padding:15
            }}
        />
        </>
    )}
}