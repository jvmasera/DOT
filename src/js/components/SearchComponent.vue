<template>
    <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Pesquisa" v-model="pesquisa" aria-label="Pesquisa">
        <button class="btn text-light btn-custom" type="button" v-on:click="buscarFilme">Buscar</button>
    </form>
</template>

<script>
    export default {
        name: "SearchComponent",
        data(){
            return{
                pesquisa: ''
            }
        },
        methods:{
            buscarFilme: function () {
                this.$store.commit('setPesquisa', this.pesquisa);
            }
        }
    }
</script>

<style scoped>

</style>