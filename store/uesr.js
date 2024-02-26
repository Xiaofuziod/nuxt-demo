import {defineStore} from "pinia";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: '',
    uid: ''
  }),
  actions: {
    async fetch() {
    }
  }
})
