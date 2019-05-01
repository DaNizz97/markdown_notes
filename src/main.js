import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Vuetify from 'vuetify';
import Msg from 'vue-message'
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
Vue.use(Msg)

new Vue({
  render: h => h(App),
}).$mount('#app')
