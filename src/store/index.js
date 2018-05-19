import Vue from 'vue';
import Vuex from 'vuex'
import menu from './modules/menu'

import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    menu
  },
  actions:{

  },
  getters
});


export default store
