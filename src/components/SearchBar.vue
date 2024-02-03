<script lang="ts">

import { fetchAutocomplete } from '../composables/autoComplete';
import { handleAutocompleteSelect } from '../composables/autocompleteSelect';

export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '' as string,
      autocompleteResults: [] as string[],
      showAutocomplete: false as boolean,
    };
  },
  watch: {
    async searchQuery(newVal: string) {
      this.autocompleteResults = await fetchAutocomplete(newVal);
      this.showAutocomplete = this.autocompleteResults.length > 0;
    },
  },
  methods: {
    async handleSelect(selectedItem: string) {
      this.showAutocomplete = false;
      this.searchQuery = selectedItem;
      const weatherData = await handleAutocompleteSelect(selectedItem);
      this.$emit('weather-selected', weatherData);
    },
    handleInput() {
      this.showAutocomplete = true;
    },
    clearSearch() {
      this.searchQuery = '';
      this.showAutocomplete = false;
    },
  },
};
</script>

<template>
  <div class="relative mx-4 rounded-lg" data-te-input-wrapper-init>
    <div class="inline-flex flex-col justify-center relative text-black">
      <div class="relative">
        <input v-model="searchQuery" @input="handleInput" placeholder="Search location" type="text" class="p-2 pl-8 mr-60 md:mr-60 rounded-xl border 
         border-gray-200 bg-white/60  focus:bg-white placeholder-black
          focus:outline-none focus:ring-2 focus:ring-[#CECED0] focus:border-transparent w-full" />


        <div v-if="searchQuery" @click="clearSearch" class="cursor-pointer absolute top-1 right-5 text-red-500">
          <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>


        <svg class="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <ul v-if="showAutocomplete" class="bg-white rounded-xl w-full mt-2">
        <li v-for="item in autocompleteResults" :key="item" @mousedown.prevent="handleSelect(item)"
          class="pl-8 pr-2 py-2 rounded-xl relative cursor-pointer hover:bg-[#CECED0] hover:text-gray-900">
          <b>{{ searchQuery }}</b> - {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

