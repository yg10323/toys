import Vue from 'vue'
import App from './App.vue'
import utils from './utils/index'


Vue.config.productionTip = false


Vue.prototype.$utils = utils

new Vue({
  render: h => h(App),
}).$mount('#app')
