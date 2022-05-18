<template>
  <div class="lg:col-start-2">
            <h3 class="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              Learn to build this yourself!
            </h3>
            <p class="mt-3 text-lg text-gray-500">
              Check out <a href="https://near.university" class="text-blue-500">near.university</a> to learn how to build this decentralized app.
            </p>

            <dl class="mt-10 space-y-10">
              <div v-for="item in communicationFeatures" :key="item.id" class="relative">
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
import { AcademicCapIcon, DesktopComputerIcon } from '@heroicons/vue/outline'
import { communicationFeatures } from '../constants/mockData.js';

export default {
setup() {
    return {
      communicationFeatures
    }
  },
}
</script>