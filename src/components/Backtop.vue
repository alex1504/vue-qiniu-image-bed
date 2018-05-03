<template>
    <div class="backtop">
        <mu-back-top :right="right" :duration="duration" />
    </div>
</template>

<script>
    export default {
        name: 'backtop',
        data() {
            return {
                right: 50,
                duration: 300
            };
        },
        computed: {
        },
        methods: {},
        mounted() {}
    };
</script>

<style scoped lang="scss">
    .mu-back-top {
        z-index: 99999;
    }
</style>
