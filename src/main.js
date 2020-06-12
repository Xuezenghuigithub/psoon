import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import Request from './utils/request';

Vue.prototype.$request = Request;

Vue.config.productionTip = false

import SnackBar from '@/components/snackbarPlugin/index';

Vue.use(SnackBar, { router });

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
