// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/browser.js'
Vue = window.Vue
Vue.config.productionTip = false
new Sys(`ws://127.0.0.1:7788`)
  .then(async (main) => {
    console.log(`sys 初始化完成`)
    main.form.show()
    window.main = main
    window.win = main.win
    window.vm = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount(`#app`)
  })
  .catch((err) => {
    console.log(err)
  })
