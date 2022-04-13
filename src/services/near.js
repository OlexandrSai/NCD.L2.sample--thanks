import { keyStores, Near, WalletConnection, utils } from "near-api-js";
import BN from "bn.js";

export const THANKS_CONTRACT_ID = process.env.VUE_APP_THANKS_CONTRACT_ID;
export const REGISTRY_CONTRACT_ID = process.env.VUE_APP_REGISTRY_CONTRACT_ID;
const gas = new BN(process.env.VUE_APP_gas);


// new NEAR is using  here to  awoid  async/await
export const near = new Near({
    networkId: process.env.VUE_APP_networkId,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: process.env.VUE_APP_nodeUrl,
    walletUrl: process.env.VUE_APP_walletUrl,
});

export const wallet = new WalletConnection(near, "thankyou");

// --------------------------------------------------------------------------
// functions to call contracts(Registry, Thanks) Public VIEW methods
// --------------------------------------------------------------------------

// functions to call REGISTRY contract public view methods
// --------------------------------------------------------------------------

// function to get all thanks contracts ids which were added to the registry contract
export const getRecipients = () => {
    return wallet.account().viewFunction(REGISTRY_CONTRACT_ID, "list_all");
};  

// function to check is the contract id registered inside REGISTRY contract state
export const isRegistered = (contractId) => {
    return wallet.account().viewFunction(REGISTRY_CONTRACT_ID, "is_registered", {contract: contractId});
}

// --------------------------------------------------------------------------
// functions to call contracts(Registry, Thanks) Public CHANGE methods
// --------------------------------------------------------------------------

// functions to call THANKS contract public change methods
// --------------------------------------------------------------------------

//
export const registerNewThanksContract = ({ message, anonymous, attachedDeposit }) => {
    attachedDeposit = utils.format.parseNearAmount(attachedDeposit)
    return wallet.account().functionCall({
        contractId: CONTRACT_ID,
        methodName: "say",
        args: { message, anonymous },
        attachedDeposit: attachedDeposit
    })
}

//function to get all messages from thankyou contract
export const getMessages = () => {
    return wallet.account().viewFunction(CONTRACT_ID, "list")
}

//function to transfer funds to  owner

export const transfer = () => {
    return wallet.account().viewFunction(CONTRACT_ID, "transfer")
}

//function to sendMessage
export const sendMessage = ({ message, anonymous, attachedDeposit }) => {
    attachedDeposit = utils.format.parseNearAmount(attachedDeposit)
    return wallet.account().functionCall({
        contractId: CONTRACT_ID,
        methodName: "say",
        args: { message, anonymous },
        attachedDeposit: attachedDeposit
    })
}
