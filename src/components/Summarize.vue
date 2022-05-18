<template>
  <div class="shadow overflow-hidden sm:rounded-md mt-4">
      <div class="px-4 py-5 bg-white sm:p-6">
          <div class="flex flex-col items-center">
                <button  @click="handleTransfer" class="flex py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Transfer to owner (me) 
                    <div v-if="isTransferingToOwner">
      <svg class="w-5 h-5 ml-1 text-white-600 animate-spin" fill="none"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"></path>
    </svg>
  </div>
                </button>
                    <div v-if="summarizedInfo">
                        <div v-for="(item, key) in summarizedInfo.contributions" :key="item" class="grid grid-cols-2 gap-2 mt-4">
                            <span className="text-right">{{key}}:</span> 
                            <span className="text-left">
                                {{item.length > 10
                                    ? utils.format.formatNearAmount(item)
                                    : item.toString().match('e')
                                    ? item.toString().slice(0, 4)
                                    : item}}
                                </span>
                        </div>
                    </div>
                    <div v-else>
                        <svg class="w-20 h-20 mt-6 mb-6 text-indigo-600 animate-spin" fill="none"
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
import { ref, watch } from 'vue'
import { useContracts } from '../composables/near'
import { utils } from 'near-api-js';

export default {
    setup() {
        const { transferFunds, summarizedInfo, getSummarizedInfo } = useContracts()
        const isTransferingToOwner = ref(false)
        const onTransfer = ref(false)

        async function handleTransfer () {
            try {
                isTransferingToOwner.value = true
                const res = await transferFunds()
                console.log(res)
                onTransfer.value = true
            } catch (error) {
                console.log(error?.kind?.ExecutionError)
            }
            isTransferingToOwner.value = false
      }

      watch(onTransfer, async () => {
        summarizedInfo.value = await getSummarizedInfo()
        onTransfer.value = false
      }, {deep:true})

        return {
            isTransferingToOwner,
            handleTransfer,
            summarizedInfo,
            getSummarizedInfo,
            utils
        }
    }
}
</script>