<template>
  <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
            <RadioGroup>
              <RadioGroupLabel class="sr-only">
                Message History
              </RadioGroupLabel>
              <div>
                <RadioGroupOption v-for="item in messages" :key="item.id">
                  <Message :item="item"/>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>
</template>

<script>
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import Message from './Message.vue'
import { useContracts } from '../composables/near'

export default {
  components: {
    Message
  },
  setup() {
    const { messages} = useContracts()

        return {
          messages,
          RadioGroup,
          RadioGroupDescription,
          RadioGroupLabel,
          RadioGroupOption
        }
  }
}
</script>