import { createStore } from 'vuex'

import alertModules from './modules/alertMessage.js';
import shoppingCart from './modules/shoppingCart.js';
import favorite from './modules/favorite.js';

export default createStore({
  state: {
    
  },
  mutations: {

  },
  actions: {
    
  },

  modules: {
    alertModules,
    shoppingCart,
    favorite
  }
})
