export const state = () => ({
  messages: []
})

export const mutations = {
  addMessage(state, message) {
    state.messages.push(message)
  }
}

export const actions = {
  addMessage({commit}, message) {
    commit('addMessage', message)
  }
}
