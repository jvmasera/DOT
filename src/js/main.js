require('./bootstrap');

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import Vuex from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import Embed from 'v-video-embed';
import VueMask from 'v-mask';


window.Vue = require('vue');

Vue.use(Vuex);
Vue.use(InfiniteLoading, { /* options */ });
Vue.use(Embed);
Vue.use(VueMask);

const files = require.context('./', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

const store = new Vuex.Store({
    state: {
        listFavoritos: [],
        listCarrinho: [],
        sidebar: false,
        sidebarCarrinho: false,
        sidebarFavoritos: false,
        removeFavoritosAction: {
            component: '',
            action: 0
        },
        addCarrinhoAction: {
            component: '',
            action: 0
        },
        removeCarrinhoAction: {
            component: '',
            action: 0
        },
        pagina: 1,
        pesquisa: ''
    },
    mutations: {
        //Lista dos Favoritos
        addListFavoritos (state, payload) {
            state.listFavoritos.push(payload);
        },
        removeListFavoritos (state, payload) {
            state.listFavoritos.splice(payload.index, 1);
            state.removeFavoritosAction.component = payload.component;
            state.removeFavoritosAction.action++;
        },
        //Lista do Carrinho
        addlistCarrinho (state, payload) {
            state.listCarrinho.push(payload.item);
            state.addCarrinhoAction.component = payload.component;
            state.addCarrinhoAction.action++;
        },
        removelistCarrinho (state, payload) {
            state.listCarrinho.splice(payload.index, 1);
            state.removeCarrinhoAction.component = payload.component;
            state.removeCarrinhoAction.action++;
        },
        //Sidebars
        toggleCarrinho (state){
            if(state.sidebarCarrinho === true){
                state.sidebar = false;
                state.sidebarCarrinho = false;
            } else {
                state.sidebar = true;
                state.sidebarCarrinho = true;
            }
            if(state.sidebarFavoritos === true){
                state.sidebarFavoritos = false;
            }
        },
        toggleFavoritos (state){
            if(state.sidebarFavoritos === true){
                state.sidebar = false;
                state.sidebarFavoritos = false;
            } else {
                state.sidebar = true;
                state.sidebarFavoritos = true;
            }
            if(state.sidebarCarrinho === true){
                state.sidebarCarrinho = false;
            }
        },
        updateQuantidade(state, payload){
            state.listCarrinho[payload.index].quantidade = payload.valor;
        },
        setPaginacao(state, payload){
            state.pagina = payload;
            state.sidebar = false;
            state.sidebarCarrinho = false;
            state.sidebarFavoritos = false;
        },
        resetarFavoritos(state){
            state.listFavoritos = [];
            state.removeFavoritosAction.action++;
        },
        resetarCarrinho(state){
            state.listCarrinho = [];
            state.removeCarrinhoAction.action++;
        },
        setPesquisa(state, payload){
            state.pesquisa = payload;
        }
    },
    getters: {
        getListFavoritos: state => {
            return state.listFavoritos;
        },
        getListCarrinho: state => {
            return state.listCarrinho;
        },
        getSidebar: state => {
            return state.sidebar;
        },
        getSidebarCarrinho: state => {
            return state.sidebarCarrinho;
        },
        getSidebarFavoritos: state => {
            return state.sidebarFavoritos;
        },
        getRemoveFavoritosComponent: state => {
            return state.removeFavoritosAction.component;
        },
        getAddCarrinhoComponent: state => {
            return state.addCarrinhoAction.component;
        },
        getRemoveCarrinhoComponent: state => {
            return state.removeCarrinhoAction.component;
        },
    }
});

const app = new Vue({
    el: '#app',
    store
});

