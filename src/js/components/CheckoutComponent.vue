<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-md-6">
                <h5 class="titulos-sidebar">Finalizar Compra</h5>
                <hr>
                <form>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" maxlength="200" class="form-control" :class="{ 'is-invalid': validacaoErro && form.nome == '' }" id="nome" placeholder="Nome Completo" v-model="form.nome">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" v-mask="'###.###.###-##'" maxlength="14" class="form-control" :class="{ 'is-invalid': validacaoErro && form.cpf == '' }" id="cpf" placeholder="CPF" v-model="form.cpf">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" v-mask="'(##)#####-####'" maxlength="15" class="form-control" :class="{ 'is-invalid': validacaoErro && form.celular == '' }" id="celular" placeholder="Celular" v-model="form.celular">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="email" maxlength="200" class="form-control" :class="{ 'is-invalid': validacaoErro && form.email == '' }" id="email" placeholder="E-mail" v-model="form.email">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <input type="text" v-mask="'#####-###'" maxlength="10" class="form-control" :class="{ 'is-invalid': validacaoErro && form.cep == '' }" id="cep" placeholder="CEP" v-model="form.cep">
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <input type="text" maxlength="200" class="form-control" :class="{ 'is-invalid': validacaoErro && form.endereco == '' }" id="endereco" placeholder="Endereço" v-model="form.endereco">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" maxlength="200" class="form-control" :class="{ 'is-invalid': validacaoErro && form.cidade == '' }" id="cidade" placeholder="Cidade" v-model="form.cidade">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <select class="form-control" :class="{ 'is-invalid': validacaoErro && form.estado == '' }" id="estado" v-model="form.estado">
                                    <option value="">Estado</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-6">
                <table class="table table-custom">
                    <thead>
                    <tr>
                        <th scope="col">Imagem</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Qtd</th>
                        <th scope="col">Preço</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in this.$store.getters.getListCarrinho">
                        <th>
                            <img class="thumbnail-custom" :src="'http://image.tmdb.org/t/p/w185' + item.poster_path">
                        </th>
                        <td>
                            <p class="my-0">{{ item.original_title }}</p>
                        </td>
                        <td>
                            <p class="my-0">{{ item.quantidade }}</p>
                        </td>
                        <td>
                            <p class="my-0">R${{ (item.price * item.quantidade).toFixed(2) }}</p>
                        </td>
                        <td>
                            <a href="#" v-on:click.prevent="removeCarrinho(index, $event)" data-toggle="tooltip" data-placement="top" title="Remover do checkout">
                                <i class="fa fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p class="texto-compra">Total: <span>{{ calcSum }}</span></p>
                <button href="#" class="btn btn-custom btn-block text-light btn-compra" :disabled="this.$store.getters.getListCarrinho.length < 1" v-on:click="finalizar">Finalizar</button>
            </div>
        </div>

        <!-- Modal Checkout -->
        <div class="modal fade" id="modalCheckout" tabindex="-1" role="dialog" aria-labelledby="modalCheckoutLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalCheckoutLabel">Obrigado Uzumaki Naruto!</h5>
                    </div>
                    <div class="modal-body">
                        <p>Sua compra foi realizada com sucesso!</p>
                        <button href="#" class="btn btn-custom btn-block text-light btn-compra" v-on:click="reset">Ir para loja</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Validação -->
        <div class="modal fade" id="modalValidacao" tabindex="-1" role="dialog" aria-labelledby="modalValidacaoLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalValidacaoLabel">Ops!</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Preencha todos os campos obrigatórios.</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "CheckoutComponent",
        data() {
            return {
                validacaoErro: false,
                form: {
                    nome: '',
                    cpf: '',
                    celular: '',
                    email: '',
                    cep: '',
                    endereco: '',
                    cidade: '',
                    estado: ''
                }
            };
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
            validarForm: function(){
                if(this.form.nome == '' ||
                    this.form.cpf == '' ||
                    this.form.celular == '' ||
                    this.form.email == '' ||
                    this.form.cep == '' ||
                    this.form.endereco == '' ||
                    this.form.cidade == '' ||
                    this.form.estado == ''){
                    this.validacaoErro = true;
                    return false;
                } else {
                    this.validacaoErro = false;
                    return true;
                }
            },
            enviar: function(){
                $('#modalCheckout').modal('show');
            },
            alerta: function(){
                $('#modalValidacao').modal('show');
            },
            reset: function(){
                $('#modalCheckout').modal('hide');
                this.$store.commit("setPaginacao", 1);
                this.$store.commit("resetarCarrinho");
                this.$store.commit("resetarFavoritos");
            },
            finalizar: function(){
                var validacao = this.validarForm();
                if(validacao === false){
                    this.alerta();
                } else {
                    this.enviar();
                }
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