import {welcomeList} from "@/store/welcomeMessage";

export const state = () => ({
  messageList: [],
  welcomeList: welcomeList,
  welcomeIndex: 0,
  welcomeAddCoinFinish: false,
})

export const mutations = {
  addMessage(state, message) {
    // console.log('addMessage', message)
    state.messageList.push(message)
  },
  setWelcomeIndex(state, index) {
    state.welcomeIndex = index
  },
  clearMessageList(state) {
    state.messageList = []
  },
  updateMessage(state, {index, message}) {
    console.log('updateMessage', index, message)
    state.messageList[index] = message
  },
  updateWelcomeAddCoinFinish(state, finish) {
    state.welcomeAddCoinFinish = finish
  }
}

export const actions = {
  addMessage({commit}, message) {
    commit('addMessage', message)
  },
  welcomeToNext({commit, state}) {
    commit('setWelcomeIndex', state.welcomeIndex + 1)
    commit('addMessage', state.welcomeList[state.welcomeIndex])
  },
  clearMessageList({commit}) {
    commit('clearMessageList')
  }
}
