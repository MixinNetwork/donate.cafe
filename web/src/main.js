import Vue from 'vue'
import App from './App.vue'
import APIS from './api'
import router from './router'
import VueCroppie from 'vue-croppie';
import VueClipboard from 'vue-clipboard2'
import Message from './components/Message'
import i18n from '@/i18n'
require('./assets/font/index.css')

Vue.config.productionTip = false
Vue.prototype.APIS = APIS


Vue.use(VueCroppie);
Vue.use(VueClipboard)
Vue.use(Message)
new Vue({
  router,
  render: h => h(App),
  i18n
}).$mount('#app')
