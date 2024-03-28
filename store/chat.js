import {getChatMessageList} from "@/common/home";
import Vue from 'vue';
import robotAvatar from '@/assets/imgs/user/default.png'

import {getWelcomeList} from "@/utils/getWelcomeMessage";
import {formatMessages} from "@/utils/message"

let timer = null  // 机器人回答后，3秒后关闭
let timer2 = null  // 五分钟没有操作，机器人会自动问候
let timer3 = null  // 五分钟没有收到回复，认为机器人掉线了

export const state = () => ({
  conversationId: null,
  messageList: [],
  welcomeList: [],
  welcomeIndex: 0,
  // welcomeAddCoinFinish: false,
  isFinished: false,  // 历史消息是否已经加载完
  lastUserQuestion: null,
  messageStatus: null, // loading concat success error
  wList: [],
  pageName: '', // 页面名称 welcome  report monitor
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
    console.log('updateMessage', index, message)
    Vue.set(state.messageList, index, message);
  },
  setConversationId(state, conversationId) {
    state.conversationId = conversationId
  },
  setFinished(state, isFinished) {
    state.isFinished = isFinished
  },
  setRobot(state, robot) {
    state.robot = {...state.robot, ...robot}
  },
  setMessageStatus(state, status) {
    state.messageStatus = status
  },
  setPageName(state, pageName) {
    state.pageName = pageName
  }
}

export const actions = {
  updateLang({commit, rootState}, showWelcome = false) {
    if (showWelcome) {
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
    } else {
      commit('setWlist', rootState.lang.t)
    }
  },
  async fetchEarlierMessages({commit}, showWelcome = false) {
    try {
      const oldestSeqNo = this.state.chat.messageList.length === 0 ? -1 : this.state.chat.messageList[0].seqNo;
      const res = await this.$axios.get(getChatMessageList, {params: {size: showWelcome ? 1 : 10, oldestSeqNo}});
      if (res && res.data && res.data.data) {
        if (!showWelcome) {
          const messages = formatMessages(res.data.data.messages)
          commit('prependMessages', messages)
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
  pushAIMessage({commit, state}, message) {
    // 收到消息后，清除回复超时的定时器
    clearTimeout(timer3)
    // 如果是追加消息，就把上一条消息的内容和当前消息的内容合并
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
    // 消息状态更改
    commit('setMessageStatus', message.more ? 'concat' : !!message.error ? 'error' : 'success')

    // 消息回答完毕 更新机器人状态语
    // 欢迎页的头部文案部是单独逻辑
    if (!message.more && state.pageName !== 'welcome') {
      commit('setRobot', {text: this.$i18n.t("robot_message_4")})
    }

    // 五分钟没有操作，机器人会自动问候 欢迎页除外
    if (state.pageName !== 'welcome') {
      clearTimeout(timer2)
      timer2 = setInterval(() => {
        commit('setRobot', {text: state.wlist[Math.floor(Math.random() * state.wlist.length)]})
      }, 300 * 1000)
    }
  },
  // 发送用户消息 只用传入 text 和 context
  async sendUserMessage({commit, state}, message) {
    const nextSeqNo = state.messageList.length === 0 ? 0 : state.messageList[state.messageList.length - 1].seqNo + 1
    const para = {
      conversationId: state.conversationId || message.conversationId,
      seqNo: nextSeqNo,
      source: "USER",
      language: this.$i18n.locale,
      text: message.text,
      context: message.context
    }
    console.log('sendUserMessage', para)

    this.$socket.emit('chat', para)

    commit('addMessage', para)
    // 追加一个loading的消息
    commit('addMessage', {
      conversationId: state.conversationId,
      seqNo: nextSeqNo + 1,
      source: "ASSISTANT",
      context: null,
      language: this.$i18n.locale,
      text: ' ',
      layers: [],
      loading: true
    })
    // 消息状态更改为loading
    commit('setMessageStatus', 'loading')

    if (state.pageName !== 'welcome') {
      // 根据用户的问题，获取机器人状态语
      let text = this.$i18n.t('robot_message_5')
      // ai focus 和 source 是特殊的机器人状态语
      if (JSON.stringify(message).includes('FOCUS') || JSON.stringify(message).includes('SIGNAL_SOURCE')) {
        text = this.$i18n.t('robot_message_6')
      }
      // 更新机器人状态语
      commit('setRobot', {text})

      // 如果五分钟没有收到回复，认为机器人掉线了
      clearTimeout(timer3)
      timer3 = setTimeout(() => {
        commit('setRobot', {text: this.$i18n.t('robot_message_7')})
        commit('setMessageStatus', 'error')
        commit('updateMessage', {
          index: state.messageList.length - 1,
          message: {
            ...state.messageList[state.messageList.length - 1],
            text: this.$i18n.t("Robot_message_crash"),
            error: this.$i18n.t("networkError"),
            loading: false
          }
        })
      }, 6 * 1000)
    }
  },
}
