import Vue from "vue";
import Router from "vue-router";

import store from "../store/index.js";


Vue.use(Router);

const router = new Router({
  mode: process.env.CORDOVA_PLATFORM ? "hash" : "history",
  base:
    store.state.nameProductivo == null
      ? process.env.BASE_URL
      : store.state.nameProductivo,
  routes: [
    {
      path: '/',
      component: () => import('layouts/MyLayout.vue'),
      children: [
        { path: '', component: () => import('pages/Index.vue') }
      ]
    },
  ]
});

export default router;
