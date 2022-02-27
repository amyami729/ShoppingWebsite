import axios from 'axios';

export default ({
  namespaced: true,
  state: {  // 定義狀態
    cartProducts: []
  },
  mutations: {  // 定義方法
    CART(state, payload) {
      state.cartProducts = payload;
    }
  },
  actions: {
    getCartContents(context) {
      const api = `${process.env.VUE_APP_CARTAPI}/api/cart`;  // 取得購物車列表
      axios.get(api).then((response) => {
        context.commit('CART', response.data.products);
      });
    },
    // 更新商品數量同時更新DB
    updateItemQty(context, { id, qty }) {
      const api = `${process.env.VUE_APP_CARTAPI}/api/cart`;  // 加入購物車
      const ItemInfoAddToCart = { productId: id, quantity: qty };
      axios.post(api, ItemInfoAddToCart).then(() => {
        context.dispatch('getCartContents');
      });
    },
    addItemToCart(context, { id, qty }) {
      const api = `${process.env.VUE_APP_CARTAPI}/api/add/qty`;  // 加入購物車（累加）
      const productInfoAddedToCart = { productId: id, quantity: qty };
      axios.post(api, productInfoAddedToCart).then(() => {
        context.dispatch('alertModules/updateMessage',
          { message: '商品已加入購物車', status: 'success' }, { root: true });
        context.dispatch('getCartContents');
      });
    }
  }
});