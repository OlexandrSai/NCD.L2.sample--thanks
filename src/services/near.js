import { keyStores, Near, Contract, WalletConnection, utils } from "near-api-js";
import BN from "bn.js";

export const THANKS_CONTRACT_ID = process.env.VUE_APP_THANKS_CONTRACT_ID;
export const REGISTRY_CONTRACT_ID = process.env.VUE_APP_REGISTRY_CONTRACT_ID;
const gas = new BN(process.env.VUE_APP_gas);


// connecting to NEAR, new NEAR is being used here to awoid async/await
export const near = new Near({
    networkId: process.env.VUE_APP_networkId,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: process.env.VUE_APP_nodeUrl,
    walletUrl: process.env.VUE_APP_walletUrl,
});

//create wallet connection
export const wallet = new WalletConnection(near, "sample--Thanks--dapp");

function getThanksContract() {
    return new Contract(
        wallet.account(), // the account object that is connecting
        THANKS_CONTRACT_ID, // name of contract you're connecting to
        {
            viewMethods: ['get_owner'], // view methods do not change state but usually return a value
            changeMethods: ['say', 'list', 'summarize', 'transfer'] // change methods modify state
        }
    )
}

function getRegistryContract() {
    return new Contract(
        wallet.account(), // the account object that is connecting
        REGISTRY_CONTRACT_ID, // name of contract you're connecting to
        {
            viewMethods: ["list_all", "is_registered"], // view methods do not change state but usually return a value
            changeMethods: ['register'] // change methods modify state
        }
    )
}

const thanksContract = getThanksContract()
const registryContract = getRegistryContract()

// --------------------------------------------------------------------------
// functions to call contracts(Registry, Thanks) Public VIEW methods
// --------------------------------------------------------------------------

// functions to call REGISTRY contract public view methods
// --------------------------------------------------------------------------

// function to get all thanks contracts ids which were added to the registry contract
export const getRecipients = async () => {
    return await registryContract.list_all()
};

// function to check is the contract id registered inside REGISTRY contract state
export const isRegistered = async (contractId) => {
    return await registryContract.is_registered({ contract: contractId });
}


// functions to call THANKS contract public view methods
// --------------------------------------------------------------------------

//function to get owner of a thanks contract
export const getOwner = async () => {
    return await thanksContract.get_owner()
}

// --------------------------------------------------------------------------
// functions to call contracts(Registry, Thanks) Public CHANGE methods
// --------------------------------------------------------------------------

// functions to call THANKS contract public change methods
// --------------------------------------------------------------------------

//function to send a message anon or not anon
export const sendMessage = async ({ message, anonymous, attachedDeposit }) => {
    attachedDeposit = (utils.format.parseNearAmount(attachedDeposit.toString())) // converts yoctoNEAR (10^-24) amount into NEAR
    return await thanksContract.say(
        { anonymous: anonymous, message: message },
        gas,
        attachedDeposit
    )
}

// --------------------------------------------------------------------------
// functions to call contracts(Registry, Thanks) Owner CHANGE methods
// --------------------------------------------------------------------------

//function to get all messages from thanks contract
export const getMessages = async () => {
    return await thanksContract.list()
}

//function to get summarized info about thanks contract
export const getSummarizedInfo = async () => {
    return await thanksContract.summarize()
}

//function to trasfer funds to the owner of thanks smart contract
export const transferFundsToOwner = async () => {
    return await thanksContract.transfer()
}