<template>
    <transition name="fade">
        <div v-if="this.$store.state.pagina == 1">
            <listagem-component></listagem-component>
        </div>
        <div v-else>
            <checkout-component></checkout-component>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "PaginacaoComponent"
    }
</script>

<style scoped>

</style>