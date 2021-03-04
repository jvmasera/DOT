<template>
    <a class="icone-dots" href="#" v-on:click.prevent="abrirFavoritos" title="Meus filmes favoritos">
        <i class="fa fa-heart fa-2x"></i>
    </a>
</template>

<script>
    export default {
        name: "FavoritosComponent",
        data(){
            return {
                favoritos: []
            }
        },
        created(){
            this.favoritos = this.$store.getters.getListFavoritos;
        },
        mounted() {

        },
        methods:{
            abrirFavoritos: function(){
                this.$store.commit("toggleFavoritos");
            }
        },
        watch:{
            '$store.state.listFavoritos': function() {
                this.favoritos = this.$store.getters.getListFavoritos;
            }
        }
    }
</script>

<style scoped>

</style>