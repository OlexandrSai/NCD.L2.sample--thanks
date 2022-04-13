import { keyStores, Near, WalletConnection, utils, Account } from "near-api-js";
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

//function to send a message anon or not anon
export const sendMessage = ({ message, anonymous, attachedDeposit }) => {
    attachedDeposit = utils.format.parseNearAmount(attachedDeposit)
    return wallet.account().functionCall({
        contractId: THANKS_CONTRACT_ID,
        methodName: "say",
        args: { message, anonymous },
        attachedDeposit: attachedDeposit
    })
}

// --------------------------------------------------------------------------
// functions to call contracts(Registry, Thanks) Owner CHANGE methods
// --------------------------------------------------------------------------

//function to get all messages from thanks contract
export const getMessages = () => {
    return wallet.account().functionCall({
        contractId: THANKS_CONTRACT_ID,
        methodName: "list",
    })
}

//function to get summarized info about thanks contract
export const getSummarizedInfo = () => {
    return wallet.account().functionCall({
        contractId: THANKS_CONTRACT_ID,
        methodName: "summarize",
    })
}

//function to trasfer funds to the owner of thanks smart contract
export const transferFundsToOwner = () => {
    return wallet.account().functionCall({
        contractId: THANKS_CONTRACT_ID,
        methodName: "transfer",
    })
}