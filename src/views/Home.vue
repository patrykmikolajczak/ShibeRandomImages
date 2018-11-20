<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
        <div
            v-for="(p,i) in photos_list"
            :key="i"
            class="preloaded-img"
        >
                <img 
                    src="../assets/logo.png" 
                    :alt="'photo' + i" 
                    v-img="p"
                />
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'home',
    data() {
        return {
            photos_list: [],
            loading: false,
            ticking: false
        }
    },
    created() {
        this.getData()
        window.addEventListener('scroll', this.changeScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.changeScroll)
    },
    methods: {
        changeScroll(e) {
            const last_known_scroll_position = window.scrollY
            if (!this.ticking) {

                window.requestAnimationFrame( () => {
                    if(!this.loading) {
                        let maxScroll = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)
                        if(last_known_scroll_position * 100 / maxScroll > 90) {
                            this.getData()
                        }
                    }
                    this.ticking = false
                })
                
                this.ticking = true

            }
        },
        getData() {
            this.loading = true
            this.$http.get('http://localhost:666/http://shibe.online/api/shibes?count=16')
                .then( ( resp ) => {
                    this.photos_list = [...this.photos_list, ...resp.data]
                    this.loading = false
                })
                .catch( err => {
                    console.error( err )
                    this.loading = false
                })
        }
    }
}
</script>

<style lang="scss" scoped>
    .preloaded-img {
        display: inline;
        img {
            height: 200px;
        }
    }
</style>
