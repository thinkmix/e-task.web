/* eslint-disable */

import Vue from 'vue';
import App from './App';
import store from '../store/';
import router from '../router/';
import './registerServiceWorker';
import '../plugins/iview';

Vue.config.debug = true;
Vue.config.productionTip = false

require("../assets/css/base.scss");
require("../assets/css/theme.less");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
