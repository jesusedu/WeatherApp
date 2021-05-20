import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Loading } from "quasar";

Vue.use(Vuex);
Vue.use(require('vue-moment'));

export default new Vuex.Store({
  state: {
    nameProductivo: "/",
    Url: "http://api.openweathermap.org/data/2.5/weather",
    apiKey: "23dc9002a37dc7fd151b2f20ceda2d56"

  },
  mutations: {
  },
  actions: {
  }
});
