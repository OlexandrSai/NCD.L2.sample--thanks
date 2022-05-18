<template>
<div id="nav" class="py-4 p-0 flex justify-end">
    <div class="flex w-1/2 justify-end items-center list-none">
    <Login/>
    </div>
  </div>
  <div class="py-16 bg-gray-50 overflow-hidden lg:py-24">
    <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
      <Header/>
      <div class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        <info/>
        <MessageForm/>
      </div>
      <Summarize v-if="owner==accountId"/>
      <div class="relative mt-12 sm:mt-16 lg:mt-24">
        <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
          <LearnSection/>
          <MessageHistory/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Header from '@/components/Header.vue'
import Info from '@/components/Info.vue'
import MessageForm from '@/components/MessageForm.vue'
import LearnSection from '@/components/LearnSection.vue'
import MessageHistory from '@/components/MessageHistory.vue'
import Summarize from '@/components/Summarize.vue'
import { watch } from 'vue'
import { useContracts } from "@/composables/near"
import { useWallet } from '@/composables/near.js'
import { onBeforeMount } from '@vue/runtime-core'
import { mockDonatesHistory } from '../constants/mockData.js'
import { wallet } from '../services/near.js'

export default {
  components: {
    Header,
    Info,
    MessageForm,
    Summarize,
    LearnSection,
    MessageHistory,
    Login,
  },
  setup() {
      const { accountId } = useWallet()
      const { getOwner, owner, messages, getMessages, recipients, getRecipients, summarizedInfo, getSummarizedInfo} = useContracts()

      onBeforeMount(async () => {
          accountId.value = await wallet.getAccountId()
          owner.value = await getOwner()
          recipients.value = await getRecipients()
          messages.value = mockDonatesHistory
          if (owner.value == accountId.value) {
              messages.value = await getMessages()
              summarizedInfo.value = await getSummarizedInfo()
            } 
      })

      watch(accountId, async ()=>{
        if (owner.value == accountId.value) {
            messages.value = await getMessages()
            return
        }
        messages.value = mockDonatesHistory
      }, {deep:true})
      
      return {
          accountId,
          getOwner,
          owner,
          messages,
          getMessages,
          recipients,
          getRecipients,
          summarizedInfo,
          getSummarizedInfo
      }
  }
}
</script>