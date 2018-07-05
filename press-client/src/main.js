import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vueditor from 'vueditor'
import 'vueditor/dist/style/vueditor.min.css'

// your config here
let config = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
    'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList', '|', 'tables', '|', 'switchView'
  ],
  fontName: [
    {val: 'arial black'},
    {val: 'times new roman'},
    {val: 'Courier New'}
  ],
  fontSize: [
    '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
  ],
  uploadUrl: '',
  classList: []
}

export const eventBus = new Vue()

axios.defaults.baseURL = 'http://localhost:3000/'
Vue.use(Vueditor, config)
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
