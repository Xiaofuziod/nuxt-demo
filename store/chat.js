import {getChatMessageList} from "@/common/home";
import {welcomeList} from "@/store/welcomeMessage";
import Vue from 'vue';
import robotAvatar from '@/assets/imgs/user/default.png'


let timer = null
export const state = () => ({
  conversationId: null,
  messageList: [],
  welcomeList: welcomeList,
  welcomeIndex: 0,
  welcomeAddCoinFinish: false,
  isFinished: false,  // 历史消息是否已经加载完
  lastUserQuestion: null,
  robot: {
    avatar: robotAvatar,
    text: 'Hi，需不需要我的帮忙呢？'
  }
})

export const mutations = {
  addMessage(state, message) {
    state.messageList.push(message)
    // console.log(state.messageList)
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
  },
  setLastUserQuestion(state, question) {
    state.lastUserQuestion = question
  },
  setRobot(state, robot) {
    state.robot = {...state.robot, ...robot}
  }
}

export const actions = {
  async fetchEarlierMessages({commit}, userNo) {
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
    // 如果是用户发送的消息，添加一条loading状态的消息
    if (message.source === 'USER') {
      commit('addMessage', {
        seqNo: message.seqNo + 1,
        source: "ASSISTANT",
        context: null,
        language: message.language,
        text: '',
        layers: [],
        loading: true
      })
      // 根据用户的问题，获取机器人的回答
      let text = "我需要思考下..."
      if (JSON.stringify(message).includes('FOCUS') || JSON.stringify(message).includes('SIGNAL_SOURCE')) {
        text = "我已收到您的请求～"
      }
      commit('setRobot', {text})
    }
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
      console.log('newMsg', newMsg)
      commit('updateMessage', {index: state.messageList.length - 1, message: newMsg})
    } else {
      commit('addMessage', message)
    }
    if (!message.more) {
      commit('setRobot', {text: "好啦，已经有答案了～"})
    }
    // 测试用 三秒后默认回答我完毕
    clearTimeout(timer)
    timer = setTimeout(() => {
      commit('updateMessage', {index: state.messageList.length - 1, message: {...lastMsg, more: false}})
      commit('setRobot', {text: "好啦，已经有答案了～"})
    }, 3000)
  },
}
