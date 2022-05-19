import { ref } from "vue";
import {
  wallet,
  THANKS_CONTRACT_ID,
  getRecipients,
  getOwner,
  isRegistered,
  sendMessage,
  getMessages,
  getSummarizedInfo,
  transferFundsToOwner
} from "../services/near";

const owner = ref(null)
const recipients = ref(null)
const isLoading = ref(false)
const isTransferingToOwner = ref(null)
const messages = ref(null)
const summarizedInfo = ref(null)
const err = ref(null)

export const useContracts = () => {

  const handleGetRecipients = () => {
    return getRecipients()
  }

  const handleGetSummarizedInfo = () => {
    return getSummarizedInfo()
  }

  const handleGetOwner = () => {
    return getOwner()
  }

  const fetchMessages = () => {
    return getMessages()
  }

  const handleSendMessage = ({ message, anonymous, attachedDeposit }) => {
    return sendMessage({ message, anonymous, attachedDeposit });
  };

  const handleTransfer = () => {
    return transferFundsToOwner();
  }

  return {
    isLoading,
    isTransferingToOwner,
    isRegistered,
    owner,
    err,
    getOwner: handleGetOwner,
    recipients,
    getRecipients: handleGetRecipients,
    messages,
    getMessages: fetchMessages,
    summarizedInfo,
    getSummarizedInfo: handleGetSummarizedInfo,
    sendMessage: handleSendMessage,
    transferFunds: handleTransfer
  };
};

const accountId = ref(null)

export const useWallet = () => {

  const handleSignIn = () => {
    // redirects user to wallet to authorize your dApp
    // this creates an access key that will be stored in the browser's local storage
    // access key can then be used to connect to NEAR and sign transactions via keyStore
    wallet.requestSignIn({
      contractId: THANKS_CONTRACT_ID,
      methodNames: [] // add methods names to restrict access
    })
  }

  const handleSignOut = () => {
    wallet.signOut()
    accountId.value = wallet.getAccountId()
  }

  return {
    wallet,
    accountId,
    err,
    signIn: handleSignIn,
    signOut: handleSignOut
  };
};