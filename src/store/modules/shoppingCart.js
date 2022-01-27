export default ({
  namespaced: true,
  state: {
    isShow: false,
    carts: []
  },
  actions: {
    addCart(context, { qty, cartProduct }) {
      const product = cartProduct;
      const carts = JSON.parse(localStorage.getItem('carts')) || [];
      for (let i = 0; i < carts.length; i += 1) {
        if (carts[i].id === product.id) {
          carts[i].qty += qty;
          localStorage.setItem('carts', JSON.stringify(carts));
          context.commit('GETCARTS');
          return;
        }
      }
      product.qty = qty;
      carts.push(product);
      localStorage.setItem('carts', JSON.stringify(carts));
      context.commit('GETCARTS');
    },
    removeCart(context, id) {
      const carts = JSON.parse(localStorage.getItem('carts'));
      const newCarts = carts.filter((el) => el.id !== id);
      localStorage.setItem('carts', JSON.stringify(newCarts));
      context.dispatch('alertModules/updateMessage', {
        message: '已刪除',
      }, { root: true });
      context.commit('GETCARTS');
    },
    changeCart(context, { qty, id }) {
      const carts = JSON.parse(localStorage.getItem('carts'));
      for (let i = 0; i < carts.length; i += 1) {
        if (carts[i].id === id) {
          carts[i].qty = qty;
          localStorage.setItem('carts', JSON.stringify(carts));
          context.commit('GETCARTS');
        }
      }
    }
  },
  mutations: {
    GETCARTS(state) {
      state.carts = JSON.parse(localStorage.getItem('carts')) || [];
    },
    HIDECART(state) {
      state.isShow = false;
    },
    TOGGLECART(state) {
      state.isShow = !state.isShow;
    }
  },
  getters: {
    isShow: (state) => state.isShow,
    carts: (state) => state.carts,
  }
});