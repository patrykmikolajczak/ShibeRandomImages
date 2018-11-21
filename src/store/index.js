import Vue from 'vue'
import Vuex from 'vuex'

import App from './app'
import Modal from './modal'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        App,
        Modal
    },
    strict: debug
})

export default store