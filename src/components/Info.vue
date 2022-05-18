<template>
  <div class="relative">
    <h3 class="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
      Say "Thanks!" like you mean it.
    </h3>
    <p class="mt-3 text-lg text-gray-500">
      There's always a good reason to say thank you to others. Whether someone helped you save some time, correct a
      mistake, learn something new or develop an idea ... just say "Thanks!".
    </p>

    <dl class="mt-10 space-y-10">
      <div v-for="item in transferFeatures" :key="item.id" class="relative">
        <dt>
          <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
          </div>
          <p class="ml-16 text-lg leading-6 font-medium text-gray-700">{{ item.name }}</p>
        </dt>
        <dd class="mt-2 ml-16 text-base text-gray-500">
          {{ item.description }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import { transferFeatures } from '../constants/mockData';
export default {
  setup() {
    return {
      transferFeatures
    }
  },
}
</script>