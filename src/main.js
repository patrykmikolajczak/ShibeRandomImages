import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import axios from 'axios'
import Vlf from 'vlf'
import VeeValidate from 'vee-validate'

// Vue use
Vue.use(Vlf)
Vue.use(VeeValidate);

// Vue prototype
Vue.prototype.$http = axios

axios.defaults.headers.post['crossDomain'] = true;

Vue.config.productionTip = false

Vue.directive('img', {
    inserted: (el, url) => {
        var img = new Image()
        img.src = url.value
        el.style.transition = 'all 1s'

        img.onload = (photo) => {
            el.src = url.value;
            if(photo.target.width > photo.target.height) {
                let width = (photo.target.width / (photo.target.height / 200) )
                el.style.width = width + 'px'
                el.style.height = "200px"
                if(width > 200) {
                    el.style['margin-left'] = '-' + ((width - 200) / 2) + 'px'
                }
            } else {
                let height = (photo.target.height / (photo.target.width / 200) )
                el.style.width = "200px"
                el.style.height = height + 'px'
                if(height > 200) {
                    el.style['margin-top'] = '-' + ((height - 200) / 2) + 'px'
                }
            }
            // el.style.width = (photo.target.width / (photo.target.height / 200) ) + 'px'
        }
    }
});

import './assets/css/app.scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
