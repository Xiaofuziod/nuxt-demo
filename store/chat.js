import {getChatMessageList} from "@/common/home";
import {welcomeList} from "@/store/welcomeMessage";
import Vue from 'vue';
import robotAvatar from '@/assets/imgs/user/default.png'


let timer = null  // 机器人回答后，3秒后关闭
let timer2 = null  // 五分钟没有操作，机器人会自动问候

// 问候语
const wList = [
  'Hi，需不需要我的帮忙呢？',
  '记住啦，我24小时都为你服务哦～',
  'Hi，有啥不懂的想要了解的吗？'
]
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
    text: wList[Math.floor(Math.random() * wList.length)]
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
  pushWelcomeMessage({commit}, message) {
    commit('addMessage', message)
  },
  welcomeToNext({commit, state}) {
    commit('setWelcomeIndex', state.welcomeIndex + 1)
    commit('addMessage', state.welcomeList[state.welcomeIndex])
  },
  clearMessageList({commit}) {
    commit('clearMessageList')
  },
  pushAIMessage({commit, state}, message) {
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
    // 临时解决方案，如果机器人回答了，3秒后关闭
    clearTimeout(timer)
    timer = setTimeout(() => {
      const ls = state.messageList[state.messageList.length - 1]
      commit('updateMessage', {index: state.messageList.length - 1, message: {...ls, more: false}})
      commit('setRobot', {text: "好啦，已经有答案了～"})
    },3000)
    if (!message.more) {
      commit('setRobot', {text: "好啦，已经有答案了～"})
    }
    // 五分钟没有操作，机器人会自动问候
    clearTimeout(timer2)
    timer2 = setInterval(() => {
      commit('setRobot', {text: wList[Math.floor(Math.random() * wList.length)]})
    }, 300 * 1000)

  },
  // 发送用户消息 只用传入 text 和 context
  sendUserMessage({commit, state}, message) {
    const nextSeqNo = state.messageList.length === 0 ? 0 : state.messageList[state.messageList.length - 1].seqNo + 1
    const para = {
      conversationId: state.conversationId,
      seqNo: nextSeqNo,
      source: "USER",
      language: this.$i18n.locale,
      text: message.text,
      context: message.context
    }

    this.$socket.emit('chat', para)

    commit('addMessage', para)
    commit('addMessage', {
      conversationId: state.conversationId,
      seqNo: nextSeqNo + 1,
      source: "ASSISTANT",
      context: null,
      language: this.$i18n.locale,
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

    // commit('setLastUserQuestion', message)
  }
}
