import {getChatMessageList} from "@/common/home";
import {welcomeList} from "@/store/welcomeMessage";
import Vue from 'vue';


export const state = () => ({
  conversationId: null,
  messageList: [],
  welcomeList: welcomeList,
  welcomeIndex: 0,
  welcomeAddCoinFinish: false,
  isFinished: false  // 历史消息是否已经加载完
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
    Vue.set(state.messageList, index, message);
  },
  updateWelcomeAddCoinFinish(state, finish) {
    state.welcomeAddCoinFinish = finish
  },
  setConversationId(state, conversationId) {
    state.conversationId = conversationId
  },
  setFinished(state, isFinished) {
    state.isFinished = isFinished
  }
}

export const actions = {
  async fetchEarlierMessages({commit}, userNo) {
    console.log('fetchEarlierMessages')
    try {
      const oldestSeqNo = this.state.chat.messageList.length === 0 ? -1 : this.state.chat.messageList[0].seqNo;
      const res = await this.$axios.get(getChatMessageList, {params: {userNo, size: 10, oldestSeqNo}});
      if (res && res.data && res.data.data) {
        commit('prependMessages', res.data.data.messages)
        commit('setConversationId', res.data.data.conversationId)
        commit('setFinished', res.data.data.messages.length < 1)
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
  },
  pushSubscriptMessage({commit, state}, message) {
    let lastMsg = state.messageList[state.messageList.length - 1]
    if ((lastMsg && lastMsg.seqNo === message.seqNo && lastMsg.source === message.source) || lastMsg.loading) {
      const newMsg = {
        ...message,
        text: lastMsg.text + message.text,
        layers: lastMsg.layers.concat(message.layers)
      }
      commit('updateMessage', {index: state.messageList.length - 1, message: newMsg})
    } else {
      commit('addMessage', message)
    }
  }
}
