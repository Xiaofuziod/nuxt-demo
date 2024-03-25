import {getChatMessageList} from "@/common/home";
import Vue from 'vue';
import robotAvatar from '@/assets/imgs/user/default.svg'

import {getWelcomeList} from "@/utils/getWelcomeMessage";

let timer = null  // 机器人回答后，3秒后关闭
let timer2 = null  // 五分钟没有操作，机器人会自动问候
let timer3 = null  // 五分钟没有收到回复，认为机器人掉线了

export const state = () => ({
  conversationId: null,
  messageList: [],
  welcomeList: [],
  welcomeIndex: 9,
  // welcomeAddCoinFinish: false,
  isFinished: false,  // 历史消息是否已经加载完
  lastUserQuestion: null,
  messageStatus: null, // loading concat success error
  wList: [],
  robot: {
    avatar: robotAvatar,
    text: '',
  }
})

export const mutations = {
  addMessage(state, message) {
    state.messageList.push(message)
  },
  setWelcomeList(state, list) {
    console.log('setWelcomeList', list)
    state.welcomeList = list
  },
  setWlist(state, t) {
    state.wlist = [
      t["robot_message_1"],
      t["robot_message_2"],
      t["robot_message_3"]
    ]
    state.robot.text = state.wlist[Math.floor(Math.random() * state.wlist.length)]
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
  // updateWelcomeAddCoinFinish(state, finish) {
  //   state.welcomeAddCoinFinish = finish
  // },
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
  },
  setMessageStatus(state, status) {
    state.messageStatus = status
  },
}

export const actions = {
  updateLang({commit, rootState}) {
    const arr = getWelcomeList(rootState.lang.t)
    arr.forEach((item) => {
      if (item.highlightWordList) {
        let indexList = []
        const text = item.text || item.desc
        item.highlightWordList.forEach(word => {
          const index = text.indexOf(word)
          if (index > -1) {
            for (let i = index; i < index + word.length; i++) {
              indexList.push(i)
            }
          }
        })
        item.highlightList = indexList
      }
    })
    commit('setWelcomeList', arr)
    commit('setWlist', rootState.lang.t)
  },
  async fetchEarlierMessages({commit}, showWelcome = false) {
    try {
      const oldestSeqNo = this.state.chat.messageList.length === 0 ? -1 : this.state.chat.messageList[0].seqNo;
      const res = await this.$axios.get(getChatMessageList, {params: {size: 10, oldestSeqNo}});
      if (res && res.data && res.data.data) {
        if (!showWelcome) {
          commit('prependMessages', res.data.data.messages)
          commit('setFinished', res.data.data.messages.length < 1)
        }
        commit('setConversationId', res.data.data.conversationId)
      }
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
  updateWelcomeList({commit, state}, ids) {
    const list = state.welcomeList.filter(item => !ids.includes(item.id))
    commit('setWelcomeList', list)
  },
  clearMessageList({commit}) {
    commit('clearMessageList')
  },
  pushAIMessage({commit, state, rootState}, message) {
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


    // 消息状态更改为success
    commit('setMessageStatus', message.more ? 'concat' : 'success')

    // 临时解决方案，如果机器人回答了，10秒后关闭
    clearTimeout(timer)
    timer = setTimeout(() => {
      commit('setMessageStatus', 'success')
      commit('setRobot', {text: rootState.lang.t("robot_message_4")})
    }, 10 * 1000)

    if (!message.more) {
      commit('setRobot', {text: rootState.lang.t("robot_message_4")})
    }
    // 五分钟没有操作，机器人会自动问候
    clearTimeout(timer2)
    timer2 = setInterval(() => {
      commit('setRobot', {
        text: state.wlist[Math.floor(Math.random() * state.wlist.length)]
      })
    }, 300 * 1000)

  },
  // 发送用户消息 只用传入 text 和 context
  sendUserMessage({commit, state, rootState}, message) {
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
    // 消息状态更改为loading
    commit('setMessageStatus', 'loading')

    // 根据用户的问题，获取机器人的回答
    let text = rootState.lang.t['robot_message_5']
    if (JSON.stringify(message).includes('FOCUS') || JSON.stringify(message).includes('SIGNAL_SOURCE')) {
      text = rootState.lang.t['robot_message_6']
    }
    commit('setRobot', {text})

    // 如果五分钟没有收到回复，认为机器人掉线了

    clearTimeout(timer3)
    timer3 = setTimeout(() => {
      commit('setRobot', {text: rootState.lang.t['robot_message_7']})
    }, 300 * 1000)


    // commit('setLastUserQuestion', message)
  }
}
