export default ({
  // 開啟命名空間
  namespaced: true,
  state: {
    messages: []
  },
  mutations: {
    messagePush(state, payload) {
      state.messages.push(payload);
    },
    messageSplice(state, payload) {
      // splice 中文為拼接。可以藉由刪除原來有的元素 並／或加入新元素來改變一個陣列的內容
      // arr1.splice(要插入或刪除的索引位置, 要刪除的元素數量, 要插入的元素內容)
      // splice()本身所回傳回來的，會是我們刪除掉的元素陣列，而不是使用splice()之後原陣列的結果，如果希望得到原陣列的結果，需要指派另一個變數去接
      state.messages.splice(payload, 1);
    }
  },
  actions: {
    // context當作this.$store
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