import {getChatMessageList} from "@/common/home";
import {welcomeList} from "@/store/welcomeMessage";

export const state = () => ({
  conversationId: null,
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
  prependMessages(state, messages) {
    state.messageList = messages.concat(state.messageList)
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
  },
  setConversationId(state, conversationId) {
    state.conversationId = conversationId
  }
}

export const actions = {
  async fetchEarlierMessages({commit}, userNo) {
    try {
      const oldestSeqNo = this.state.chat.messageList.length === 0 ? -1 :
          this.state.chat.messageList[0].seqNo;
      const res = await this.$axios.get(getChatMessageList, {params: {userNo, size: 5, oldestSeqNo}});
      if (res && res.data && res.data.data) {
        commit('prependMessages', res.data.data.messages)
        commit('setConversationId', res.data.data.conversationId)
      }
      console.log('fetchEarlierMessages', res.data.data.messages)
    } catch (e) {
      console.error('fetchChatMessageList error:', e);
    }
  },
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
