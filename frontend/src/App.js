import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import MyDriveAbi from "./artifacts/contracts/Drive.sol/MyDrive.json";
import Main from "./components/Main";
import "./App.css";
import FileDisplay from "./components/FileDisplay";
const App = () => {
  const [account, setAccount] = useState();
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    //the above line will connect u to metamask
    const wallet = async () => {
      if (provider) {
        let accounts = await provider.send("eth_requestAccounts", []);
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        setAccount(accounts[0]);

        const signer = await provider.getSigner();

        const address = await signer.getAddress();

        // console.log(accounts);
        let contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          MyDriveAbi.abi,
          signer
        );

        setContract(contract);
        setProvider(provider);
      } else {
        console.error("METAMASK NOT CONNECTED");
      }
    };

    provider && wallet();
  }, []);

  return (
    <div className="App">
      <Main contract={contract} account={account} />
      <FileDisplay contract={contract} account={account} />
    </div>
  );
};

export default App;
