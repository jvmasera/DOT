<template>
    <div class="container py-5">
        <div class="row row-eq-height ">
            <div class="col-md-3 col-custom" v-for="(item, $index) in filmes" :key="$index">
                <div class="card card-custom">
                    <div class="box-img" v-on:mouseenter="playTrailer(item.id, $index)" v-on:mouseleave="stopTrailer($index)">
                        <a href="#" v-on:click.prevent="addFavoritos(item)" class="icone-favorito" v-bind:class="{'ativo': item.favorito}">
                            <i class="fa fa-heart fa-2x"></i>
                        </a>
                        <div v-if="item.poster_path != null" class="card-img-top card-img-custom" :style="'background-image:url(http://image.tmdb.org/t/p/w185' + item.poster_path + ');'">
                            <p v-if="item.release_date" class="texto-data">{{ item.release_date | date }}</p>
                        </div>
                        <div v-else class="card-img-top card-img-custom sem-img">
                            <p v-if="item.release_date" class="texto-data">{{ item.release_date | date }}</p>
                        </div>
                        <video-embed :id="'video_'+$index" css="videobg" v-if="src[$index] !== undefined" :params="{autoplay: 1, mute: 0, controls: 1, showinfo: 1}" :src="src[$index]"></video-embed>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-center texto-filmes-listagem">{{ item.original_title }}</h5>
                        <div class="row">
                            <div class="col-md-5">
                                <p v-if="item.vote_average" class="font-weight-bold texto-filmes-listagem"><i class="fa fa-star"></i> {{ item.vote_average }}</p>
                            </div>
                            <div class="col-md-7">
                                <p v-if="item.genre_ids" class="texto-filmes-listagem texto-generos">
                                    <span v-for="(genero, index) in item.genre_ids">
                                        {{ checkGenero(genero) }}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col">
                                <p class="text-center font-weight-bold preco-texto-listagem">
                                    {{ item.price | price }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <a v-if="item.carrinho === false" href="#" class="btn btn-custom btn-block text-light" v-on:click.prevent="addCarrinho(item)">Adicionar</a>
                    <a v-else href="#" class="btn btn-custom btn-block text-light" v-on:click.prevent="addCarrinho(item)">Remover</a>
                </div>
            </div>
        </div>
        <infinite-loading @infinite="infiniteHandler" :identifier="infiniteId" force-use-infinite-wrapper></infinite-loading>
    </div>
</template>

<script>
    export default {
        name: "ListagemComponent",
        data() {
            return {
                page: 1,
                filmes: [],
                generos: [],
                src: [],
                hover: null,
                infiniteId: 0
            };
        },
        created() {
            this.getGeneros();
        },
        methods: {
            infiniteHandler($state){
                var vr = this;
                if(this.$store.state.pesquisa != ''){
                    axios.get(window.location.origin + '/api/filmes/busca', {
                        params: {
                            search: encodeURI(vr.$store.state.pesquisa)
                        },
                    }).then(({ data }) => {
                        if (data.results.length) {
                            $.each(data.results, function(index, item){
                                item.price = '79.99';
                                item.favorito = false;
                                item.carrinho = false;
                                item.quantidade = 1;
                            });
                            vr.page += 1;
                            vr.filmes.push(...data.results);
                            $state.loaded();
                        } else {
                            $state.complete();
                        }
                    });
                } else {
                    axios.get(window.location.origin + '/api/filmes', {
                        params: {
                            page: vr.page,
                        },
                    }).then(({ data }) => {
                        if (data.results.length) {
                            $.each(data.results, function(index, item){
                                item.price = '79.99';
                                item.favorito = false;
                                item.carrinho = false;
                                item.quantidade = 1;
                            });
                            vr.page += 1;
                            vr.filmes.push(...data.results);
                            $state.loaded();
                        } else {
                            $state.complete();
                        }
                    });
                }
            },
            getGeneros(){
                var vr = this;
                axios.get(window.location.origin + '/api/generos')
                    .then(({ data }) => {
                        vr.generos = data.genres;
                });
            },
            checkGenero(value) {
                var vr = this;
                for(var i = 0; i < vr.generos.length; i++) {
                    if (vr.generos[i].id == value) {
                        return vr.generos[i].name;
                    }
                }
            },
            addFavoritos(item_selecionado){
                var vr = this;
                $.each(this.filmes, function(index, item){
                    if(item_selecionado.id == item.id){
                        if(item.favorito === false){
                            item.favorito = true;
                            vr.$store.commit("addListFavoritos", item);
                        } else {
                            item.favorito = false;
                            $.each(vr.$store.getters.getListFavoritos, function(index, favorito){
                                if(favorito != undefined && item_selecionado != undefined){
                                    if(favorito.id == item_selecionado.id){
                                        vr.$store.commit("removeListFavoritos", {index: index, component: vr.$options.name});
                                    }
                                }
                            })
                        }
                    }
                });
            },
            addCarrinho(item_selecionado){
                var vr = this;
                $.each(this.filmes, function(index, item){
                    if(item_selecionado.id == item.id){
                        if(item.carrinho === false){
                            item.carrinho = true;
                            item.quantidade = 1;
                            vr.$store.commit("addlistCarrinho", {item: item, component: vr.$options.name});
                        } else {
                            item.carrinho = false;
                            item.quantidade = 1;
                            $.each(vr.$store.getters.getListCarrinho, function(index, carrinho){
                                if(carrinho != undefined && item_selecionado != undefined){
                                    if(carrinho.id == item_selecionado.id){
                                        vr.$store.commit("removelistCarrinho", {index: index, component: vr.$options.name});
                                    }
                                }
                            })
                        }
                    }
                });
            },
            playTrailer(filme_id, index){
                var vr = this;
                this.hover = index;
                axios.get(window.location.origin + '/api/filmes/trailer', {
                    params: {
                        filme_id: filme_id,
                    },
                }).then(({ data }) => {
                    $.each(data.results[0], function(item){
                        if(item == 'key' && vr.hover == index){
                            var url = 'https://www.youtube.com/embed/' + data.results[0].key;
                            Vue.set(vr.src, index, url);
                        }
                    });
                });
            },
            stopTrailer(index){
                this.src = [];
                this.hover = null;
                $('#video_'+index).fadeOut();
            },
            atualizarFavoritos(){
                var listaFavoritos = [];
                $.each(this.$store.getters.getListFavoritos, function(index, item){
                    listaFavoritos.push(item.id);
                });
                $.each(this.filmes, function(index, item){
                    var verify = listaFavoritos.find(element => element == item.id);
                    if(verify == undefined){
                        item.favorito = false;
                    }
                });
            },
            atualizarCarrinhoAdd(){
                var listaCarrinho = [];
                $.each(this.$store.getters.getListCarrinho, function(index, item){
                    listaCarrinho.push(item.id);
                });
                $.each(this.filmes, function(index, item){
                    var verify = listaCarrinho.find(element => element == item.id);
                    if(verify != undefined){
                        item.carrinho = true;
                        item.quantidade = 1;
                    }
                });
            },
            atualizarCarrinhoRemove(){
                var listaCarrinho = [];
                $.each(this.$store.getters.getListCarrinho, function(index, item){
                    listaCarrinho.push(item.id);
                });
                $.each(this.filmes, function(index, item){
                    var verify = listaCarrinho.find(element => element == item.id);
                    if(verify == undefined){
                        item.carrinho = false;
                        item.quantidade = 1;
                    }
                });
            },
            changeType() {
                this.page = 1;
                this.filmes = [];
                this.infiniteId += 1;
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
            },
            date(date){
                var parts = date.match(/(\d+)/g);
                var mydate = new Date(parts[0], parts[1]-1, parts[2]);
                var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Março", "Junho",
                    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][mydate.getMonth()];
                var day = mydate.getDate();
                return day + ' de ' + month + ', ' + mydate.getFullYear();
            }
        },
        watch: {
            '$store.state.removeFavoritosAction.action': function() {
                if(this.$store.getters.getRemoveFavoritosComponent != this.$options.name){
                    this.atualizarFavoritos();
                }
            },
            '$store.state.addCarrinhoAction.action': function() {
                if(this.$store.getters.getAddCarrinhoComponent != this.$options.name){
                    this.atualizarCarrinhoAdd();
                }
            },
            '$store.state.removeCarrinhoAction.action': function() {
                if(this.$store.getters.getRemoveCarrinhoComponent != this.$options.name){
                    this.atualizarCarrinhoRemove();
                }
            },
            '$store.state.pesquisa': function() {
               this.changeType();
            }
        }
    }
</script>

<style scoped>

</style>