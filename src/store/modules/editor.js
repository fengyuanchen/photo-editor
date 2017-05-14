import * as types from '../mutation-types';

const initialState = {
  cropped: false,
  cropping: false,
};

const mutations = {
  [types.EDITOR_SET](state, data) {
    Object.assign(state, data);
  },
  [types.EDITOR_RESET](state) {
    Object.assign(state, initialState);
  },
};

const actions = {
  setEditor(context, data) {
    context.commit(types.EDITOR_SET, data);
  },
  resetEditor(context) {
    context.commit(types.EDITOR_RESET);
  },
};

const getters = {
};

export default {
  state: Object.assign({}, initialState),
  mutations,
  actions,
  getters,
};
