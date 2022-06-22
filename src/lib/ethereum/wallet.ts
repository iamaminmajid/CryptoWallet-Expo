import * as SecureStore from 'expo-secure-store'
import { ethers } from 'ethers'
import { AssetType, sendEther, sendToken } from './assets'
import { getNetwork } from './network'

// const bip39 = require('bip39')

// console.log('test');
const PRIVATE_KEY_STORAGE_KEY = 'Ethereum.privatekey'
import * as Random from 'expo-random';
export enum WalletStorageType {
  privateKey = 'PRIVATE_KEY',
  mnemonics = 'MNEMONICS'
}

const generateMnemonics = () => {
  
  return ethers.utils.entropyToMnemonic(Random.getRandomBytes(16)).split(' ')
  
}

const loadWalletFromMnemonics = async (mnemonics: string[]) => {
  if (!(mnemonics instanceof Array)) throw new Error('invalid mnemonic');
  // const provider = ethers.providers.
  const provider = ethers.getDefaultProvider(getNetwork(), { etherscan: '5MTJT2IR25UKZ9PHKSUSZQFQ7ZG34DBT2S', infura: '478c82d1a63f42c99b79813cd0578fac', quorum: 1})
  provider.getBalance = provider.getBalance.bind(provider)
  const wallet = ethers.Wallet.fromMnemonic(mnemonics.join(' ')).connect(provider)
  console.log(1)
  return wallet
}

const loadWalletFromPrivateKey = async (privateKey: string): Promise<ethers.Wallet> => {
  const provider = ethers.getDefaultProvider(getNetwork(), { etherscan: '5MTJT2IR25UKZ9PHKSUSZQFQ7ZG34DBT2S', infura: '478c82d1a63f42c99b79813cd0578fac', quorum: 1})
  provider.getBalance = provider.getBalance.bind(provider)
  const wallet = new ethers.Wallet(privateKey, provider)
  // console.log('tes ' + wallet)
  return wallet
}

export const createWallet = async (): Promise<ethers.Wallet> => {
  const mnemonics = generateMnemonics()
  const wallet = await loadWalletFromMnemonics(mnemonics)
  await SecureStore.setItemAsync(PRIVATE_KEY_STORAGE_KEY, JSON.stringify(wallet.privateKey))
  console.log(wallet.privateKey)
  return wallet
}

export const loadWallet = async (type: WalletStorageType, mnemonics?: string[]): Promise<ethers.Wallet> => {
  switch(type) {
    case WalletStorageType.privateKey:
      const privateKey = await SecureStore.getItemAsync(PRIVATE_KEY_STORAGE_KEY)
      if (!privateKey) throw new Error(`No private key in storage`)
      return loadWalletFromPrivateKey(JSON.parse(privateKey))
    case WalletStorageType.mnemonics:
      if (!mnemonics) throw new Error(`No mnemonics provided`)
      return loadWalletFromMnemonics(mnemonics)
  }
}

export const sendAsset = async (args: { wallet: ethers.Wallet, to: string, amount: number, type: AssetType }): Promise<ethers.providers.TransactionResponse> => {
  const { type } = args
  return type === AssetType.eth ? sendEther(args) : sendToken(args)
}