<template>
    <div class="home">
        <div
            v-for="(p,i) in photos_list"
            :key="i"
            class="preloaded-img"
            @click="addToFavorites(p)"
        >
                <img 
                    v-img="p.src"
                    alt=""
                />
                <p :style="
                    'color: ' + (p.favorite ? 'red': '') + '; '
                    + 'visibility:' + (p.favorite ? 'visible': 'hiden') + ';' 
                    + 'top:' + (p.favorite ? '25px': '50%') + ';'  
                    + 'left:' + (p.favorite ? '25px': '50%')"
                >
                    &#10084;
                </p>
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
            ticking: false,
            DB: null
        }
    },
    created() {
        this.init()

        window.addEventListener('scroll', this.changeScroll)

        this.$vlf.createInstance({
            storeName: 'app'
        })
            .then(( store ) => {
                this.DB = store
            })
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.changeScroll)
    },
    methods: {
        init() {
            this.getData()
                .then( () => {
                    if ((window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)) < 100) {
                        this.init()
                    }
                })
        },
        changeScroll() {
            const last_known_scroll_position = window.scrollY
            if (!this.ticking) {

                window.requestAnimationFrame( () => {
                    if(!this.loading) {
                        let maxScroll = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)
                        if(maxScroll - last_known_scroll_position < 30) {
                            this.getData()
                        }
                    }
                    this.ticking = false
                })
                
                this.ticking = true

            }
        },
        getData() {
            return new Promise( (resolve, reject) => {
                this.loading = true
                this.$http.get('https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=16')
                    .then( ( resp ) => {
                        let buff_resp = resp.data.map( p => {
                            return { 
                                favorite: false, 
                                src: p
                            }
                        })
                        this.DB.getItem('favorites')
                            .then( ( v ) => {
                                buff_resp.map( p => {
                                    p.favorite = v.indexOf(p) !== -1
                                })
                            })
                        this.photos_list = [...this.photos_list, ...buff_resp]
                        this.loading = false
                        resolve()
                    })
                    .catch( err => {
                        console.error( err )
                        this.loading = false
                        reject()
                    })
            })
        },
        addToFavorites(photo) {
            this.DB.getItem('favorites')
                .then( ( v ) => {
                    if ( v === null ) {
                        this.DB.setItem('favorites', [photo])
                            .then( () => {
                                photo.favorite = true
                                this.$forceUpdate()
                            })
                    } else {
                        if ( v.indexOf(photo) === -1) {
                        v.push(photo)
                            this.DB.setItem('favorites', v)
                                .then( () => {
                                    photo.favorite = true
                                    this.$forceUpdate()
                                })
                        }
                    }
                })
        }
    }
}
</script>
