import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/assets/scss/_normalize.scss';
import '@/assets/scss/_global.scss';

import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vuetify from './plugins/vuetify'

import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt,faChalkboardTeacher);
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Moment.js
Vue.use(VueMoment, {
  moment,
})



Vue.config.productionTip = false
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
