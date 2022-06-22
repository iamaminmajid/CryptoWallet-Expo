import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { ethers } from "ethers";
import { EthereumContext } from "./EthereumProvider";
import { Asset, AssetType } from "../lib/ethereum/assets";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

// function Wallet (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<WalletClass> & Readonly<{ assets: Asset[]; wallet: ethers.Wallet; createWallet: () => void; sendAsset: (to: string, amount: number, type: AssetType) => Promise<ethers.providers.TransactionResponse>; }> & Readonly<{ children?: React.ReactNode; }>){
//   const navigation = useNavigation();

//   return (<WalletClass {...props} navigation={navigation} />);
// }

class Wallet extends React.Component<{
  
  assets: Asset[];
  wallet: ethers.Wallet;
  createWallet: () => void
  sendAsset: (to: string, amount: number, type: AssetType) => Promise<ethers.providers.TransactionResponse>
}> {

  state = { network: '' };

  
  public componentDidMount = async () => {
    if (this.props.wallet) {
      const network = await this.props.wallet.provider.getNetwork()
      this.setState({ network: network.name })
    } 
  }
  
  
  public render() {
    // {console.log(this.props.navigation)}
    
    // const { nav } = this.props;

    const { network } = this.state
    const { assets, wallet, createWallet, sendAsset } = this.props;

    // const navigation = useNavigation();
    return !wallet ? (
      <View style={styles.centerContainer}>
        <TouchableOpacity onPress={createWallet}>
          <Text>Create Wallet</Text>
        </TouchableOpacity>
      </View>
    ) : (
      
      <View style={styles.listContainer}>
        {assets.map(asset => (
          <View key={asset.type}>
            {/* {console.log(wallet.address)} */}
            {/* onPress={() => this.navigation.navigate('Scan')} */}
            <WalletItem asset={asset} wallet={wallet} sendAsset={sendAsset}/>
          </View>
        ))}
      </View>
    );
  }
}

function WalletItem(props){
  const navigation = useNavigation();

  const [coinData, setCoinData] = React.useState();
  const [hourly, setHourly] = React.useState();

  React.useEffect(() => {
    axios.get('https://min-api.cryptocompare.com/data/price?fsym='+props.asset.type+'&tsyms=USD').then((e) => {
      setCoinData( (e.data.USD * props.asset.balance ).toFixed(4) ); 
      
    })

    axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym='+ props.asset.type +'&tsym=USD&limit=1').then((e) => {
      setHourly( (((e.data.Data.Data[1].close - e.data.Data.Data[0].close)/e.data.Data.Data[1].close ) * 100).toFixed(2)); 
      // console.log( (( e.data.Data.Data[0].close -  e.data.Data.Data[1].close )/e.data.Data.Data[0].close ) * 100 );
    })
    
  }, [])
  
  

  return(
    <TouchableOpacity key={props.asset.type} style={styles.row} onPress={() => navigation.navigate('Coin', {asset: props.asset, wallet: props.wallet, sendAsset: props.sendAsset}) } >
      <>
      <View style={styles.column20}>
          <Image style={{height:50, width:50}} source={{uri: 'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/128/color/'+ props.asset.type.toLocaleLowerCase() +'.png'}}/>
      </View>
      <View style={styles.column60}>
          <Text style={styles.listTitle}>{props.asset.type}</Text>
          <Text style={styles.balance}>${coinData} {hourly > 0 ? (<Text style={styles.up}>+{hourly}%</Text>) : (<Text style={styles.down}>{hourly}%</Text>) } </Text>
      </View> 
      <View style={styles.column20}>
          <Text style={styles.balance2}>{props.asset.balance.toFixed(4)}</Text>
          {/* <Text style={styles.asset}>{asset.type}</Text> */}
      </View>
      </>
    </TouchableOpacity>
  )
}

function WalletWithData() {

  return(
  <EthereumContext.Consumer>
    {({ assets, wallet, createWallet, sendAsset, loading }) =>
      loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <Text>Loading</Text>
        </View>
      ) : (
        <Wallet assets={assets} wallet={wallet} createWallet={createWallet} sendAsset={sendAsset}/>
      )
    }
  </EthereumContext.Consumer>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  centerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  row:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:10,
    borderBottomColor:"#d3d3d3",
    borderBottomWidth:1,
    paddingBottom:10
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
  balance:{
    color:"#333"
  },
  balance2:{
      color:"#333",
      fontSize:20,
      textAlign:"right"
  },
  asset:{
      color:"#333",
      textAlign:"right"
  }
});

export default WalletWithData;
