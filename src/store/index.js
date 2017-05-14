import Vue from 'vue';
import Vuex from 'vuex';
import editor from './modules/editor';
import loader from './modules/loader';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    editor,
    loader,
  },
});

export default store;
