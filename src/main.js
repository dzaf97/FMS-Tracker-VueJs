import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterPrefetch from 'vue-router-prefetch'
import DashboardPlugin from './plugins/dashboard-plugin';
import NetworkService from './util/netservice';
import App from './App.vue';
import axios from 'axios';
import objectToCsv from './util/JSON2CSV';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// router setup
import router from './routes/router';
import i18n from './i18n';
import './registerServiceWorker'
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(VueLoading);
Vue.prototype.$CSV = objectToCsv;
Vue.prototype.$axios = axios;
Vue.prototype.$http = NetworkService;


const isPremium = Vue.observable({ isPremium: false })
Object.defineProperty(Vue.prototype, '$isPremium', {
  get() {
    return isPremium.isPremium
  },

  set(value) {
    isPremium.isPremium = value
  }
})


import 'leaflet/dist/leaflet.css'; //<

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  i18n
});
