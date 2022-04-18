import { ref, onMounted } from "vue";
import {
    wallet,
    THANKS_CONTRACT_ID,
    REGISTRY_CONTRACT_ID,
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
      const recipients = ref([]);
      const isRegistered = ref(null);
      const messages = ref();
      const summarizedInfo = ref(null)
      const err = ref(null);

      onMounted(async () => {
          try {
              getOwner().then((response) => {
                isOwner.value = response==wallet.getAccountId()
                console.log(isOwner.value)

                if (isOwner.value) {

                    getMessages().then((response) =>
                    {
                      messages.value=response
                      console.log(messages.value)
                    })
  
                    getSummarizedInfo().then((response) =>
                    {
                      summarizedInfo.value=response
                      console.log(summarizedInfo.value)
                    })
                }

              })
              getRecipients().then((response) =>
              {
                recipients.value=response
                console.log(recipients.value)
              })
              
          }
          catch (e) {
              err.value = e;
              console.log(err.value);
          }
      })

      const handleSendMessage = ({message,anonymous,attachedDeposit}) => {
            console.log('inside composables')
            sendMessage({message,anonymous,attachedDeposit});
      };

      const handleTransfer = () => {
            transferFundsToOwner();
      }

      return {
          isOwner,
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