import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.$http = axios

axios.defaults.headers.post['crossDomain'] = true;

Vue.config.productionTip = false

Vue.directive('img', {
    inserted: (el, url) => {
        var img = new Image()
        img.src = url.value
        el.style.opacity = 1
        el.style.width = '200px'
        el.style.height = '200px'
        el.style.transition = 'all 1s'

        img.onload = (photo) => {
            el.src = url.value;
            // setTimeout( () => {
            //     el.style.opacity = 0
                el.style.width = (photo.target.width / (photo.target.height / 200) ) + 'px'
            //     setTimeout( () => {
            //     el.style.opacity = 1
            //     },100)
            // }, 100)
            // el.style.animate = 'opacity 1 1s'
        }
    }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
