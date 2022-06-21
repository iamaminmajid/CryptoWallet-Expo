import * as SecureStore from 'expo-secure-store'
import { ethers } from 'ethers'
import { getNetwork, Networks } from './network'
import erc20ABI, { ERC20Contract } from './contracts/erc20'

export enum AssetType {
  eth = 'ETH',
  usdt = 'USDT',
  dai = 'DAI',
  wbtc = 'WBTC',
  mana = 'MANA',
  sand = 'SAND',
  uni = 'UNI',
  link = 'LINK'
}

export interface Asset {
  type: AssetType
  balance: number,
}

const TOKENS = {
  [Networks.ropsten]: {
    [AssetType.dai]: '0xad6d458402f60fd3bd25163575031acdce07538d',
    [AssetType.usdt]: '0xb404c51bbc10dcbe948077f18a4b8e553d160084',
    [AssetType.wbtc]: '0x15bb34e906836fbbbb5bfaeb6122ac2168da408d',
    [AssetType.mana]: '0xe5969d6592879b8ed89e77852595d434c44220ae',
    [AssetType.sand]: '0xa977d1c47d928ab0e55b5adea4c53ddfdb40fdea',
    [AssetType.uni]: '0xf3edabb60f83c29ef61fa1b31e2e0a2e6b09813f',
    [AssetType.link]: '0x39e4d3cacba1bdc19c35d0394e186a6c5b724ed3'
  },
  [Networks.mainnet]: {
    [AssetType.dai]: '0x6b175474e89094c44da98b954eedeac495271d0f',
    [AssetType.usdt]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    [AssetType.wbtc]: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    [AssetType.mana]: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
    [AssetType.sand]: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
    [AssetType.uni]: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    [AssetType.link]: '0x514910771af9ca656af840dff83e8264ecf986ca'
  }
}

export const sendEther = async (args: { wallet: ethers.Wallet, to: string, amount: number }): Promise<ethers.providers.TransactionResponse> => {
  const { wallet, to, amount } = args
  // const INFURA_PROJECT_ID = '478c82d1a63f42c99b79813cd0578fac';
  const SIGNER_PRIVATE_KEY = await SecureStore.getItemAsync('Ethereum.privatekey')
  // const provider = new ethers.providers.InfuraProvider(
  //   'ropsten',
  //   INFURA_PROJECT_ID
  // );
  console.log(JSON.parse(SIGNER_PRIVATE_KEY))
  // const signer = new ethers.Wallet(JSON.parse(SIGNER_PRIVATE_KEY), provider);
// console.log(signer)
  // const tx = await signer.sendTransaction({
  //   to,
  //   value: ethers.utils.parseEther("0.001"),
  // });
  // console.log("Mining transaction...");
  // console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
  // // Waiting for the transaction to be mined
  // const receipt = await tx.wait();
  // // The transaction is now on chain!
  // console.log(`Mined in block ${receipt.blockNumber}`);

  // return tx;

  const network = await wallet.provider.getNetwork()
  // console.log(wallet.provider)
  const transaction = await wallet.sendTransaction({
    to,
    value: ethers.utils.parseEther(amount.toString()),
    chainId: network.chainId
  });
  return transaction
}

export const sendToken = async (args: { wallet: ethers.Wallet, to: string, amount: number, type: AssetType }): Promise<ethers.providers.TransactionResponse> => {
  const { wallet, to, amount, type } = args
  
  if (type === AssetType.eth) throw new Error('Use sendEther function to send ETH')

  const network = await wallet.provider.getNetwork()
  const tokenAddress = TOKENS[network.name as Networks][type]
  const contract = new ethers.Contract(tokenAddress, erc20ABI, wallet) as ERC20Contract
  const decimals = await contract.decimals()
  const transaction = await contract.transfer(to, ethers.utils.parseUnits(amount.toString(), decimals))
  return transaction
}
import axios from 'axios';
import { WalletStorageType } from './wallet'
import erc20 from './contracts/erc20'
export const getEtherBalance = async (wallet: ethers.Wallet): Promise<number> => {

  let r = await axios.get('https://api-ropsten.etherscan.io/api?module=account&action=balance&address='+ wallet.address +'&apikey=5MTJT2IR25UKZ9PHKSUSZQFQ7ZG34DBT2S')
  const balance = ethers.BigNumber.from(r.data.result)
  
  return Number(ethers.utils.formatEther(balance))
}

export const getTokenBalance = async (tokenAddress: string, wallet: ethers.Wallet): Promise<number> => {
  
  await testFn(3000);
    let r = await axios.get('https://api-ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress='+ tokenAddress +'&address='+ wallet.address +'&apikey=5MTJT2IR25UKZ9PHKSUSZQFQ7ZG34DBT2S')
    // console.log(tokenAddress)
    // console.log(r.data)
    if(r.data.result > 0){
      
      return (r.data.result/1000000);

    }else{
      return 0 
    }
}
function testFn(expectedValue) {
  return new Promise(resolve => {
    setTimeout(() => {
      // console.log('wait 3 seconds');
      resolve(expectedValue);
    }, 3000);
  })
}

export const loadAssets = async (assets: AssetType[], wallet: ethers.Wallet): Promise<Asset[]> => {
  const network = await wallet.provider.getNetwork()
  const tokensAddresses = TOKENS[network.name as Networks]
  return await Promise.all(assets.map(async (asset: AssetType) => {
    if (asset === AssetType.eth) {
      // console.log(wallet.getAddress(asset));
      return {
        type: asset,
        balance: await getEtherBalance(wallet)
      }
      
    } else {
      // console.log(wallet.getAddress(asset));
      // setTimeout(async() => {
        // console.log(asset + ' : ' + tokensAddresses[asset]);
        // console.log(TOKENS)
      return {
        type: asset,
        balance: await getTokenBalance(tokensAddresses[asset], wallet)
      }
      // }, 3000);
  
    }
  }))
}