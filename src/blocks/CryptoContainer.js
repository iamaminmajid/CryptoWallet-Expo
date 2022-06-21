// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import Spinner from 'react-native-loading-spinner-overlay';

// import ListItem from './listItem';

// import FetchCoinData from '../src/Actions/FetchCoinData';

// class CryptoContainer extends Component {

//     componentWillMount() {
//         this.props.FetchCoinData();
//     }

//     renderListItem() {
//         const { crypto } = this.props;
//         return crypto.data.map((coin) => 
//             <ListItem 
//                 key={coin.name}
//                 coin_name={coin.name}
//                 symbol={coin.symbol}
//                 price_usd={coin.price_usd}
//                 percent_change_24h={coin.percent_change_24h}
//                 percent_change_7d={coin.percent_change_7d}
//             />
//         ) 
//     }


//     render() {

//         const { crypto } = this.props;
//         const { contentContainer } = styles;

//         if (crypto.isFetching) {
//             return (
//                 <View>
                    
//                     <Spinner
//                         visible={crypto.isFetching}
//                         textContent={"Loading..."}
//                         textStyle={{color: '#253145'}}
//                         animation="fade"
//                     />
//                 </View>
//             )
//         }

//         return (
//             <ScrollView contentContainerStyle={contentContainer}>
//                 {this.renderListItem()}
//             </ScrollView>
//         )
        

//     }
// }

// const styles = {
//     contentContainer: {
//         paddingBottom: 100,
//         paddingTop: 55
//     }
// }

// function mapStateToProps(state) {
//     return {
//         crypto: state.crypto
//     }
// }

// export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer)