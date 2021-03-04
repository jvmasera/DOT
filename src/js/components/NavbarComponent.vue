<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark navbar-custom">
    <div class="container-fluid">
        <div class="col-md-4 col-8">
          <a class="navbar-brand brand-custom" href="#">DOT FILMES</a>
        </div>
        <div class="col-4  icones-mobile">
            <div class="row icones-topo">
                <div class="col-md-6 col-6">
                    <favoritos-component></favoritos-component>
                </div>
                <div class="col-md-6 col-6">
                    <carrinho-component></carrinho-component>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-12">
          <search-component></search-component>
        </div>
        <div class="col-md-1 offset-md-3 col-sm-12 icones-desktop">
          <div class="row icones-topo">
            <div class="col-md-6">
              <favoritos-component></favoritos-component>
            </div>
            <div class="col-md-6">
              <carrinho-component></carrinho-component>
            </div>
          </div>
        </div>
      </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent'
};
</script>

<style scoped>

</style>