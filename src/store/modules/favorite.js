export default ({
  namespaced: true,
  state: {  // 定義狀態
    favorites: []
  },
  mutations: {  // 定義方法
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
    // 將資料寫入localStorage
    addItemToFavorite(context, item) {
      const favoriteData = {  // 設定物件格式
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl,
        price: item.price
      };
      context.commit('PUSH_FAVORITE', favoriteData);
      // 透過setItem()方法在storage物件中加入favoriteData屬性作為key值，
      // 並透過JSON.stringify()方法將favorites轉換成string類型存入localStorage
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites));
      context.dispatch('alertModules/updateMessage',
        { message: '商品已加入收藏', status: 'success' }, { root: true });
      context.dispatch('getFavoriteContents');
    },
    removeFavoriteItem(context, item) {
      context.commit('REMOVE_FAVORITE', item);
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites));
      context.dispatch('alertModules/updateMessage',
        { message: '商品已從收藏移除', status: 'danger' }, { root: true });
      context.dispatch('getFavoriteContents');
    }
  }
});