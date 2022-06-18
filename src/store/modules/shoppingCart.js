export default ({
  namespaced: true,
  state: {
    carts: []
  },
  mutations: {
    CARTS(state, payload) {
      state.carts = payload;
    }
  },
  actions: {
    getCartContents(context) {
      const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
      context.commit('CARTS', cartData);
    },
    addToCart(context, { item, qty }) {
      const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
      if (cartData.find(product => product.id === item.id)) {
        let product = cartData[cartData.findIndex(product => product.id === item.id)];
        product.qty += qty;
        product.total = product.price * product.qty;
      }else {
        item.qty = qty;
        item.total = item.price*item.qty;
        cartData.push(item);
      }
      
      localStorage.setItem('cartData', JSON.stringify(cartData));
      context.dispatch('alertModules/updateMessage',
        { message: '商品已加入購物車', status: 'success' }, { root: true });
      context.dispatch('getCartContents');
    },
    updateToCart(context, { item, qty }) {
      const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
      let product = cartData[cartData.findIndex(product => product.id === item.id)];
      product.qty = qty;
      product.total = product.price * product.qty;
      localStorage.setItem('cartData', JSON.stringify(cartData));
      context.dispatch('getCartContents');
    },
    removeCart(context, item) {
      const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
      const index = cartData.findIndex(product => product.id === item.id);
      cartData.splice(index, 1);
      localStorage.setItem('cartData', JSON.stringify(cartData));
      context.dispatch('alertModules/updateMessage',
        { message: '商品已從購物車移除', status: 'danger' }, { root: true });
      context.dispatch('getCartContents');
    }
  }
});