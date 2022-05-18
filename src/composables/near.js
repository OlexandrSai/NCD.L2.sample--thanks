import { ref, onMounted, onBeforeMount } from "vue";
import {
    wallet,
    THANKS_CONTRACT_ID,
    REGISTRY_CONTRACT_ID,
    formatNearAmount,
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
    
      const setIsLoading = (value) => {isLoading.value = value}
      const setIsTransferingToOwner = (value) => {isTransferingToOwner.value = value}

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

      const handleSendMessage = ({message,anonymous,attachedDeposit}) => {
            return sendMessage({message,anonymous,attachedDeposit});
      };

      const handleTransfer = () => {
            return transferFundsToOwner();
      }

      return {
          isLoading,
          isTransferingToOwner,
          isRegistered,
          setIsLoading,
          setIsTransferingToOwner,
          owner,
          err,
          getOwner:handleGetOwner,
          recipients,
          getRecipients:handleGetRecipients,
          messages,
          getMessages:fetchMessages,
          summarizedInfo,
          getSummarizedInfo:handleGetSummarizedInfo,
          sendMessage:handleSendMessage,
          transferFunds:handleTransfer
      };
  };

  const accountId = ref(null)

  export const useWallet = () => {

    const handleSignIn = () => {
      wallet.requestSignIn({
        contractId: THANKS_CONTRACT_ID,
        methodNames: [] // add methods names to restrict access
      })
    }

    const handleSignOut = () => {
        wallet.signOut()
        accountId.value = wallet.getAccountId()
        console.log(accountId.value)
    }

    const format = (yoctoNear) => {
      return formatNearAmount(yoctoNear)
    }

    return {
        wallet,
        accountId,
        err,
        signIn: handleSignIn,
        signOut: handleSignOut,
        formatYoctoNear: format
    };
};