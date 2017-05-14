import * as types from '../mutation-types';

const initialState = {
  loaded: false,
  name: '',
  previousUrl: '',
  type: '',
  url: '',
};

const mutations = {
  [types.LOADER_SET](state, data) {
    Object.assign(state, data);
  },
  [types.LOADER_RESET](state) {
    Object.assign(state, initialState);
  },
};

const actions = {
  setLoader(context, data) {
    context.commit(types.LOADER_SET, data);
  },
  resetLoader(context) {
    context.commit(types.LOADER_RESET);
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
