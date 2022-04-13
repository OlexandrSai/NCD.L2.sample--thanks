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

  export const useThanks = () => {
      const recipients = ref([]);
      const isRegistered = ref(null);
      const messages = ref([]);
      const summarizedInfo = ref(null)
      const err = ref(null);

      onMounted(async () => {
          try {
              recipients.value = await getRecipients()
              console.log(recipients.value)
              messages.value = await getMessages()
              console.log(messages.value)
              summarizedInfo.value = await getSummarizedInfo()
              console.log(summarizedInfo.value)
          }
          catch (e) {
              err.value = e;
              console.log(e.value);
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