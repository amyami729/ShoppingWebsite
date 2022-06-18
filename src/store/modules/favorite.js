export default ({
  namespaced: true,
  state: {
    favorites: []
  },
  mutations: {
    FAVORITES(state, payload) {
      state.favorites = payload;
    },
    PUSH_FAVORITE(state, payload) {
      state.favorites.push(payload);
    },
    REMOVE_FAVORITE(state, payload) {
      state.favorites.forEach((item, index) => {
        if (item.id === payload.id) {
          state.favorites.splice(index, 1);
        }
      });
    }
  },
  actions: {
    getFavoriteContents(context) {
      const favoriteData = JSON.parse(localStorage.getItem('favoriteData')) || [];
      context.commit('FAVORITES', favoriteData);
    },
    addToFavorite(context, item) {
      const favoriteData = {  // 設定物件格式
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl,
        price: item.price
      };
      context.commit('PUSH_FAVORITE', favoriteData);
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites));
      context.dispatch('alertModules/updateMessage',
        { message: '商品已加入收藏', status: 'success' }, { root: true });
      context.dispatch('getFavoriteContents');
    },
    removeFavorite(context, item) {
      context.commit('REMOVE_FAVORITE', item);
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites));
      context.dispatch('alertModules/updateMessage',
        { message: '商品已從收藏移除', status: 'danger' }, { root: true });
      context.dispatch('getFavoriteContents');
    }
  }
});