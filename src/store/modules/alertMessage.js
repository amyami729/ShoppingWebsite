export default ({
  namespaced: true,
  state: {
    messages: []
  },
  mutations: {
    messagePush(state, payload) {
      state.messages.push(payload);
    },
    messageSplice(state, payload) {
      state.messages.splice(payload, 1);
    }
  },
  actions: {
    updateMessage(context, { message, status = 'danger' }) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit('messagePush', {
        message,
        status,
        timestamp,
      });
      context.dispatch('removeMessageWithTiming', timestamp);
    },
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            context.commit('messageSplice', i);
          }
        });
      }, 5000);
    }
  },
  getters: {
    messages: (state) => state.messages,
  }
});