<template>
  <!-- <div id="app">
    <router-view/>
  </div> -->
    <div id="app">
        <div class="component-wrapper">
            <div id="nav">
                <router-link to="/">Lista zdjęć</router-link> |
                <router-link to="/ulubione">Ulubione</router-link>
            </div>
            <router-view/>
        </div>
        <div class="modal-backdrop fade show" v-show="isModalShowing"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'app',
    computed: {
        ...mapGetters(['isModalShowing']),
    },
    mounted() {
        this.$store.dispatch('stopLoading')
    }
}
</script>
