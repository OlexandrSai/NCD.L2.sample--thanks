import { ref, onMounted } from "vue";
import {
    wallet,
    THANKS_CONTRACT_ID,
    REGISTRY_CONTRACT_ID,
    getRecipients,
    isRegistered,
    sendMessage,
    getMessages,
    getSummarizedInfo,
    transferFundsToOwner
  } from "../services/near";

  export const useContracts = () => {
      const recipients = ref([]);
      const isRegistered = ref(null);
      const messages = ref();
      const summarizedInfo = ref(null)
      const err = ref(null);

      onMounted(async () => {
          try {
              recipients.value = await getRecipients()
              console.log(recipients.value)
              messages.value = await getMessages()
              console.log(messages.value)
              // summarizedInfo.value = await getSummarizedInfo()
              // console.log(summarizedInfo.value)
          }
          catch (e) {
              err.value = e;
              console.log(err.value);
          }
      })

      const handleSendMessage = async ({message,anonymous,attachedDeposit}) => {
            sendMessage({message,anonymous,attachedDeposit});
      };

      const handleTransfer = async  () => {
            transferFundsToOwner();
      }

      return {
          recipients,
          messages,
          summarizedInfo,
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
    };

    const handleSignOut = () => {
        wallet.signOut()
        accountId.value = wallet.getAccountId()
    };

    return {
        accountId,
        signIn: handleSignIn,
        signOut: handleSignOut
    };
};