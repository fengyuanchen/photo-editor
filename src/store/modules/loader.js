import * as types from '../mutation-types';

const initialState = {
  loaded: false,
  name: '',
  previousUrl: '',
  type: '',
  url: '',
};

const mutations = {
  [types.LOADER_ASSIGN](state, data) {
    Object.assign(state, data);
  },
};

const actions = {
  update(context, data) {
    context.commit(types.LOADER_ASSIGN, data);
  },
  remove(context) {
    context.commit(types.LOADER_ASSIGN, initialState);
  },
};

const getters = {
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state: Object.assign({}, initialState),
};
