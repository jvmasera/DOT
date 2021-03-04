<template>
    <div class="sidebarCarrinho">
        <ul class="list-group lista-sidebar" v-if="this.$store.getters.getListCarrinho.length > 0">
            <li class="list-group-item" v-for="(item, index) in this.$store.getters.getListCarrinho">
                <div class="row">
                    <div class="col-2 px-0">
                        <img class="thumbnail-custom" :src="'http://image.tmdb.org/t/p/w185' + item.poster_path">
                    </div>
                    <div class="col-10">
                        <div class="row">
                            <div class="col-md-8 col-xs-12">
                                <p class="my-0 titulo-filmes">{{ item.original_title }}</p>
                                <p class="font-weight-bold my-0 preco-texto">R${{ (item.price * item.quantidade).toFixed(2) }}</p>
                            </div>
                            <div class="col-md-3 col-xs-12 px-0">
                                <div class="box-icones-favoritos">
                                    <a href="#" v-on:click.prevent="removeCarrinho(index, $event)" data-toggle="tooltip" data-placement="top" title="Remover do carrinho">
                                        <i class="fa fa-trash"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-12 col-xs-12">
                                <input min="1" type="number" class="form-control" :value="item.quantidade" @input="updateQuantidade(index, $event)" >
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <p v-else class="texto-alerta">Vazio.</p>
        <div class="boxFinalizar">
            <p class="texto-compra">Total: <span>{{ calcSum }}</span></p>
            <button href="#" class="btn btn-custom btn-block text-light btn-compra" :disabled="this.$store.getters.getListCarrinho.length < 1" v-on:click="setPaginacao">Finalizar Compra</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListaCarrinhoComponent",
        data(){
            return{
                total: 0,
            }
        },
        mounted() {
            this.tooltip();
        },
        methods:{
            removeCarrinho(index, event){
                $(event.currentTarget).tooltip('hide');
                this.$store.commit("removelistCarrinho", {index: index, component: this.$options.name});
            },
            tooltip: function(){
                $(document).on('mouseenter','[data-toggle="tooltip"]', function(e) {
                    $(e.target).tooltip('show');
                });
            },
            updateQuantidade (index, e) {
                this.$store.commit('updateQuantidade', {index: index, valor: e.target.value});
            },
            setPaginacao(){
                this.$store.commit("setPaginacao", 2);
            }
        },
        computed: {
            calcSum() {
                let total = 0;
                this.$store.state.listCarrinho.forEach((item, i) => {
                    total += item.price * item.quantidade;
                });
                return 'R$' + total.toFixed(2);
            }
        }
    }
</script>

<style scoped>

</style>