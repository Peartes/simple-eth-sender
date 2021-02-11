// Here we define a hook to keep connection to our provider
// Get the ethers library
import { ethers } from 'ethers';
// Get react hooks
import { useState, useEffect, useContext } from 'react'
// Get the app state transaction context
import { AppContext } from '../../context/background/AppContext';

const useEtherProvider = () => {
  // The provider object
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | null>(null);
  // The signer object
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  // The eth wallet balance and public key
  const [balance, setBalance] = useState<string>("0");
  // Clean looking balance
  const [cleanBalance, setCleanBalance] = useState<number>(0);
  // The address of the user 
  const [address, setAddress] = useState<string>("");
  // CLean the address to display only a few strings
  const [pubk, setPubkey] = useState<string>("No wallet connected");
  // Get the context
  const transactions = useContext(AppContext);

  // Connect a provider to ethers
  const connectProvider = async () => {
    // Try to connect to etherum using metamask
    // Check etherum is injected into windows
    let ethProvider = null;
    let ethSigner = null;
    // @ts-ignore
    if (window.ethereum) {
      // @ts-ignore
      await window.ethereum.enable();
      // @ts-ignore
      ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      // Try and get the signer
      ethSigner = ethProvider.getSigner();
      // @ts-ignore
    } else if (window.web3) {
      // @ts-ignore
      await window.web3.enable();
      // @ts-ignore
      ethProvider = new ethers.providers.Web3Provider(window.web3);
      // Try and get the signer
      ethSigner = ethProvider.getSigner();
    } else {
      // No provider found. Use the localhost RPC
      ethProvider = new ethers.providers.JsonRpcProvider();
      // Get the signer
      ethSigner = ethProvider.getSigner();
    }
    // Set the provider
    setProvider(ethProvider);
    // Set the signer
    setSigner(ethSigner);
  }

  // Get the list of accounts associated with the connection
  const setAccountDetails = async () => {
    if (!signer) {
      // TODO:No provider yet, connect to one
      return;
    }
    let address = await signer?.getAddress();
    let balance = ethers.utils.formatUnits((await signer.getBalance()).toString(), 'ether');
    // Set the address
    setAddress(address);
    // Format the address string
    let formAddr = address.substr
      (0, 5) + '...' + address.substr(address.length - 4);
    setPubkey(formAddr);
    setBalance("" + balance);
    // Clean the balance and save it 
    setCleanBalance(Number(balance.replace('.', '')) / Math.pow(10, 18));
    // Set the app state
    // @ts-ignore
    transactions.setState({ address, balance: Number(balance.replace('.', '')) / Math.pow(10, 18), pubk: formAddr });
    // Set up a listener if account changes
    // @ts-ignore
    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccountDetails();
    })
  }
  // Send a transaction using the signer object
  const sendTransaction = async (address: string, amount: string): Promise<void> => {
    let amountToSend = ethers.utils.parseEther(amount);
    signer?.sendTransaction({
      to: address,
      value: amountToSend
    })
      .then(async (transaction) => {
        // Let's update the app state
        transactions.addTransaction({
          id: transaction.hash,
          to: address,
          from: pubk,
          value: Number(amount),
          date: new Date(),
          processed: false,
        }, undefined);
        // Alert the user
        alert('Transaction pending');
        // Wait till transaction is processed
        await transaction.wait();
        // get new account balance
        let remainingBalance = ethers.utils.formatUnits(ethers.utils.parseEther(balance).sub(amountToSend).toString(), 'ether');
        // Set the new balance
        setBalance("" + remainingBalance);
        // Clean the balance and save it 
        setCleanBalance(Number(remainingBalance.replace('.', '')) / Math.pow(10, 18));
        // Let's update the app state
        transactions.addTransaction(undefined, transaction.hash);
        // @ts-ignore
        transactions.setState({ balance: Number(remainingBalance.replace('.', '')) / Math.pow(10, 18) });
      })
      .catch(err => console.error(err))
  }

  // Get provider after loading page
  useEffect(() => {
    connectProvider();
    return () => {
      setProvider(null);
    }
  }, [])
  // Get all account upon connection change
  useEffect(() => {
    setAccountDetails()
    return () => {
      setPubkey("No wallet connected");
      setAddress("");
      setBalance("0");
      setCleanBalance(0);
    }
  }, [signer]);
  // Return the provider object
  return { pubk, address, balance, cleanBalance, provider, sendTransaction };
}
export default useEtherProvider;