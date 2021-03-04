<template>
    <Slide :burgerIcon="false" :crossIcon="false" :right=true :isOpen="open" disableOutsideClick>

        <transition name="fade" mode="in-out">
            <div v-if="carrinho">
                <h5 class="titulos-sidebar">Meu Carrinho <span class="esvaziar-link"><a href="#" v-on:click="esvaziarCarrinho">Esvaziar</a></span></h5>
                <hr>
                <lista-carrinho-component></lista-carrinho-component>
            </div>
            <div v-else-if="favoritos">
                <h5 class="titulos-sidebar">Meus Favoritos <span class="esvaziar-link"><a href="#" v-on:click="esvaziarFavoritos">Esvaziar</a></span></h5>
                <hr>
                <lista-favoritos-component></lista-favoritos-component>
            </div>
        </transition>

    </Slide>
</template>

<script>
    import { Slide } from 'vue-burger-menu'

    export default {
        components: {
            Slide
        },
        data() {
            return {
                open: false,
                carrinho: false,
                favoritos: false
            };
        },
        created() {
            this.getSidebar();
        },
        methods:{
            getSidebar: function(){
                this.open = this.$store.getters.getSidebar;
                this.carrinho = this.$store.getters.getSidebarCarrinho;
                this.favoritos = this.$store.getters.getSidebarFavoritos;
            },
            esvaziarCarrinho: function(){
                this.$store.commit("resetarCarrinho");
            },
            esvaziarFavoritos: function(){
                this.$store.commit("resetarFavoritos");
            }
        },
        watch:{
            '$store.state.sidebarCarrinho': function() {
                this.getSidebar();
            },
            '$store.state.sidebarFavoritos': function() {
                this.getSidebar();
            },
        }
    }
</script>

<style scoped>

</style>