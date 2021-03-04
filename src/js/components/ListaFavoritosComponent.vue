<template>
    <ul class="list-group lista-sidebar" v-if="this.$store.getters.getListFavoritos.length > 0">
        <li class="list-group-item" v-for="(item, index) in this.$store.getters.getListFavoritos">
            <div class="row">
                <div class="col-2 px-0">
                    <img class="thumbnail-custom" :src="'http://image.tmdb.org/t/p/w185' + item.poster_path">
                </div>
                <div class="col-10">
                    <div class="row">
                        <div class="col-md-8 col-xs-12">
                            <p class="my-0 titulo-filmes">{{ item.original_title }}</p>
                            <p class="font-weight-bold my-0 preco-texto">{{ item.price | price }}</p>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="box-icones-favoritos">
                                <a href="#" v-on:click.prevent="addCarrinho(item, $event)" data-toggle="tooltip" data-placement="top" title="Adicionar ao carrinho">
                                    <i class="fa fa-shopping-cart"></i>
                                </a>
                                <a href="#" v-on:click.prevent="removeFavorito(index, $event)" data-toggle="tooltip" data-placement="top" title="Remover dos favoritos">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <p v-else class="texto-alerta">Vazio.</p>
</template>

<script>
    export default {
        name: "ListaFavoritosComponent",
        mounted() {
            this.tooltip();
        },
        methods:{
            addCarrinho: function (item, event){
                var vr = this;
                if(item != undefined) {
                    var verifyCarrinho = vr.$store.getters.getListCarrinho.find(element => element.id == item.id);
                    if (verifyCarrinho == undefined) {
                        this.$store.commit("addlistCarrinho", {item: item, component: this.$options.name});
                    }
                }
                $.each(vr.$store.getters.getListFavoritos, function(index, favorito){
                    if(favorito != undefined && item != undefined){
                        if(favorito.id == item.id){
                            vr.removeFavorito(index, event);
                        }
                    }
                });
            },
            removeFavorito: function (index, event){
                $(event.currentTarget).tooltip('hide');
                this.$store.commit("removeListFavoritos", {index: index, component: this.$options.name});
            },
            tooltip: function(){
                $(document).on('mouseenter','[data-toggle="tooltip"]', function(e) {
                    $(e.target).tooltip('show');
                });
            }
        },
        filters: {
            price(price){
                var value = Number(price);
                var res = price.split(".");
                if(res.length == 1 || res[1].length < 3) {
                    value = value.toFixed(2);
                }
                return 'R$' + value;
            }
        }
    }
</script>

<style scoped>

</style>