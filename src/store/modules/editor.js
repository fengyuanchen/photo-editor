import * as types from '../mutation-types';

const initialState = {
  cropped: false,
  cropping: false,
};

const mutations = {
  [types.EDITOR_ASSIGN](state, data) {
    Object.assign(state, data);
  },
};

const actions = {
  update(context, data) {
    context.commit(types.EDITOR_ASSIGN, data);
  },
  remove(context) {
    context.commit(types.EDITOR_ASSIGN, initialState);
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
