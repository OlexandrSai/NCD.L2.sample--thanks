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

  export const useContracts = () => {
      const isOwner = ref(false)
      
      const recipients = ref(null)

      const updateRecipients = () => getRecipients().then((response) => {
        recipients.value = response
      })
              
      const isRegistered = ref(null);
      const messages = ref(null);
      const summarizedInfo = ref(null)
      const err = ref(null);

      // onMounted(async () => {
      //     try {
      //         getOwner().then((response) => {
      //           isOwner.value = response==wallet.getAccountId()

      //           if (isOwner.value) {

      //               messages.value??getMessages().then((response) =>
      //               {
      //                 messages.value=response
      //               })
  
      //               summarizedInfo.value?? getSummarizedInfo().then((response) =>
      //               {
      //                 for (const key in response.contributions) {
      //                   console.log(response.contributions[key])
      //                   response.contributions[key] = formatNearAmount(response.contributions[key].toLocaleString())
      //                   console.log(response.contributions[key])
      //               }

      //                 summarizedInfo.value= response.contributions
      //               })
      //           }

      //         })
      //         getRecipients().then((response) =>
      //         {
      //           recipients.value=response
      //         })
              
      //     }
      //     catch (e) {
      //         err.value = e;
      //         console.log(err.value);
      //     }
      // })

      const fetchSummarizedInfo = () => {
        getSummarizedInfo().then((response) => {
          summarizedInfo.value = response.contributions
        })
      }

      const fetchIsOwner = () => {
        getOwner().then((response) => {
          isOwner.value = response==wallet.getAccountId()
        })
      }

      const fetchMessages = () => {
        getMessages().then((response) => {
          messages.value=response
        })
      }

      const handleSendMessage = ({message,anonymous,attachedDeposit}) => {
            sendMessage({message,anonymous,attachedDeposit});
      };

      const handleTransfer = () => {
            transferFundsToOwner();
      }

      return {
          isOwner,
          setIsOwner:fetchIsOwner,
          recipients,
          updateRecipients,
          messages,
          setMessages:fetchMessages,
          summarizedInfo,
          setSummarizedInfo:fetchSummarizedInfo,
          sendMessage:handleSendMessage,
          transferFunds:handleTransfer
      };
  };

  export const useWallet = () => {
    const accountId = ref('')
    accountId.value = wallet.getAccountId()
    const err = ref(null)

    onMounted(async () => {
        try {
          console.log('on mounted from use wallet')
          accountId.value = wallet.getAccountId()
        } catch (e) {
          err.value = e;
          console.error(err.value);
        }
      });

    const handleSignIn = () => {
      wallet.requestSignIn({
        contractId: THANKS_CONTRACT_ID,
        methodNames: [] // add methods names to restrict access
      })
    }

    const handleSignOut = () => {
        wallet.signOut()
        accountId.value = wallet.getAccountId()
    }

    const format = (yoctoNear) => {
      return formatNearAmount(yoctoNear)
    }

    return {
        accountId,
        signIn: handleSignIn,
        signOut: handleSignOut,
        formatYoctoNear: format
    };
};