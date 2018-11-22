<template>
    <div class="favorites container">
        <div
            v-for="(p,i) in photos_list"
            :key="i"
            class="preloaded-img"
            @click="removeFromFavorites(p, i)"
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
                    class="cross"
                >
                    &nbsp;
                </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'favorites',
    data() {
        return {
            photos_list: [],
            loading: false,
            ticking: false,
            DB: null
        }
    },
    created() {
        this.$vlf.createInstance({
            storeName: 'app'
        })
            .then(( store ) => {
                this.DB = store
                this.DB.getItem('favorites')
                    .then( ( v ) => {
                        this.photos_list = v
                    })
            })
    },
    methods: {
        removeFromFavorites(photo, i) {
            this.photos_list.splice(i,1)
            let buff = JSON.parse(JSON.stringify(this.photos_list))
            this.photos_list = []
            this.$nextTick( () => {
                this.DB.setItem('favorites', buff)
                this.photos_list = buff
            })
        }
    }
}
</script>
