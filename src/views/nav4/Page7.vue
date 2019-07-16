<template>
    
</template>

<script>
    import vm from '../../event';
    export default {
        name: "page7",
        created () {
            vm.$emit('updateChannelInfo', '123');
        },
    }
</script>

<style scoped>

</style>