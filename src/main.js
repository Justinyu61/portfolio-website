import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
// Import component
import Loading from 'vue3-loading-overlay'
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { currency, date } from './methods/filters'
import $httpMessageState from './methods/pushMessageState'
// fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// bootstrap、jQuery
import $ from 'jquery'
import 'bootstrap'
// vee-validate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// fontAwesome 設定
library.add(fas, far, fab)

// vee-validate 設定
Object.keys(AllRules).forEach((rule) => {
  if (rule !== 'all') {
    defineRule(rule, AllRules[rule]);
  }
});
configure({
  generateMessage: localize({ zhTW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
setLocale('zh_TW')// 設定預設語系

// 全域
const app = createApp(App)

app.config.globalProperties.$filters = { currency, date }
// $httpMessageState 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast
app.config.globalProperties.$httpMsgState = $httpMessageState

// eslint-disable-next-line vue/multi-word-component-names
app.component('Loading', Loading)
app.component('font-awesome-icon', FontAwesomeIcon)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Form', Form)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.config.globalProperties.$ = $
app.use(createPinia())
app.use(VueAxios, axios)
app.use(router)

app.mount('#app')
