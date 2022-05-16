<template>
  <div class="shadow overflow-hidden sm:rounded-md mt-4">
      <div class="px-4 py-5 bg-white sm:p-6">
          <div class="flex flex-col items-center">
                <button  @click="transferFunds" class="flex py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Transfer to owner (me)
                </button>
                    <div v-if="summarizedInfo">
                        <div v-for="(item, key) in summarizedInfo" :key="item" class="grid grid-cols-2 gap-2 mt-4">
                            <span className="text-right">{{key}}:</span> 
                            <span className="text-left">{{item}}</span>
                        </div>
                    </div>
                    <div v-else>
                        <svg class="w-8 h-8 text-indigo-600 animate-spin" fill="none"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"></path>
    </svg>
                    </div>
          </div>
      </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useContracts, useWallet } from '../composables/near'

export default {
    setup() {
        const { isOwner, transferFunds, summarizedInfo, setSummarizedInfo } = useContracts()

        onMounted(() => {
            console.log('onMounted summarize')
            setSummarizedInfo()
        })

        return {
            isOwner,
            transferFunds,
            summarizedInfo,
            setSummarizedInfo
        }
    }
}
</script>