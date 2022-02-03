import {Injectable} from '@angular/core';
import {keyStores, Near, utils, WalletConnection} from 'near-api-js';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NearService {
  public near: Near;
  public wallet: WalletConnection;

  constructor() {
    this.near = new Near({
      networkId: "testnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: environment.NODE_URL,
      walletUrl: environment.WALLET_URL,
      headers: {}
    });
    this.wallet = new WalletConnection(this.near, "thankyou");
  }

  //function to get all recipients from registry contract
  getRecipients = () => {
    return this.wallet.account().viewFunction(environment.REGISTRY_CONTRACT_ID, "list_all");
  };

  //function to get all messages from thankyou contract
  getMessages = () => {
    return this.wallet.account().viewFunction(environment.CONTRACT_ID, "list")
  }

  //function to transfer funds to  owner
  transfer = () => {
    return this.wallet.account().viewFunction(environment.CONTRACT_ID, "transfer")
  }

  //function to sendMessage
  sendMessage = ({message, anonymous, attachedDeposit}: { message: any, anonymous: any, attachedDeposit: any }) => {
    attachedDeposit = utils.format.parseNearAmount(attachedDeposit) ?? utils.format.parseNearAmount("0");
    console.log(attachedDeposit);
    return this.wallet.account().functionCall({
      contractId: environment.CONTRACT_ID,
      methodName: "say",
      args: {message, anonymous},
      attachedDeposit: attachedDeposit
    })
  }
}
