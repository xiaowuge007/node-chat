import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: null,
    uid: ''
  },
  getters:{
    socket(state){
      return state.socket
    },
    uid(state){
      return state.uid
    }
  },
  mutations: {
    SET_SOCKET(state,data){
      state.io = data;
    },
    SET_UID(state,data){
      state.io = data;
    }
  },
  actions: {},
  modules: {}
});
