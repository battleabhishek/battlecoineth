import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
    state = { loaded: false, kycAddress: "0x123", tokenSaleAddress: "", userTokens: 0 };

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.listenToTokenTransfer();
            this.setState({ loaded: true, tokenSaleAddress: this.myTokenSale._address }, this.updateUserTokens);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    updateUserTokens = async () => {
        let userTokens = await this.myToken.methods.balanceOf(this.accounts[0]).call();
        this.setState({ userTokens: userTokens });
    }

    listenToTokenTransfer = async () => {
        this.myToken.events.Transfer({ to: this.accounts[0] }).on("data", this.updateUserTokens);
    }
    handleBuyToken = async () => {
        await this.myTokenSale.methods.buyTokens(this.accounts[0]).send({ from: this.accounts[0], value: 1 });
    }

    render() {
        if (!this.state.loaded) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div className="App">
                <h1>Capuccino Token for StarDucks</h1>

                <h2>Enable your account</h2>
                Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} />
                <button type="button" onClick={this.handleKycSubmit}>Add Address to Whitelist</button>
                <h2>Buy Cappucino-Tokens</h2>
                <p>Send Ether to this address: {this.state.tokenSaleAddress}</p>
                <p>You have: {this.state.userTokens}</p>
                <button type="button" onClick={this.handleBuyToken}>Buy more tokens</button>
            </div>
        );
    }
}
export default App;
