<template>
    <a class="icone-dots" href="#" v-on:click.prevent="abrirCarrinho" title="Ver meu carrinho">
        <i class="fa fa-shopping-cart fa-2x"></i><span class="badge bg-custom">{{ carrinho.length }}</span>
    </a>
</template>

<script>
    export default {
        name: "CarrinhoComponent",
        data(){
            return {
                carrinho: []
            }
        },
        created(){
            this.carrinho = this.$store.getters.getListCarrinho;
        },
        mounted() {

        },
        methods:{
            abrirCarrinho: function(){
                this.$store.commit("toggleCarrinho");
            }
        },
        watch:{
            '$store.state.listCarrinho': function() {
                this.carrinho = this.$store.getters.getListCarrinho;
            }
        }
    }
</script>

<style scoped>

</style>