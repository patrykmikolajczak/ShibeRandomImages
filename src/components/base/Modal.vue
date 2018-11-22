<template>
    <div 
        class="modal" 
        tabindex="-1" 
        :class="{'in': modalsList[name]['show']}" 
        :style="{
            display: 'block', 
            overflow: 'auto', 
            visibility: modalsList[name]['show'] === true ? 'visible' : 'hidden',
        }" 
        role="dialog"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" v-if="modalsList[name]['show']">
                    <slot name="body" :show="modalsList[name]['show'] === true"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'modal',
    props: {
        name: {
            required: true,
            type: String,
        },
        title: {
            type: String,
            default: ''
        },
    },
    computed: {
        ...mapState({
            modalsList: state => {
                return state.Modal.modalsList
            }
        }),
    },
    created() {
        this.$store.commit('setModal', this.name)
    },
    // beforeDestroy() {
    //     this.$store.commit('unsetModal', this.name)
    // },
    methods: {
        close() {
            this.$store.commit('unsetModalData', {
                name: this.name
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .modal-dialog {
        color: #2c3e50 !important;
    }
</style>
