<template>
    <!--Start Upload-->
    <div class="upload-container" ref="box">
        <Fileupload></Fileupload>
    </div>
    <!--END Upload-->
</template>

<script>
    import axios from 'axios'
    import Fileupload from './Fileupload'
    export default {
        name: 'upload',
        components: {
            Fileupload
        },
        data() {
            return {}
        },
        computed: {},
        watch: {},
        methods: {},
        filters: {},
        mounted() {
            this.$store.commit("ACTIVE_ROUTE_CHANGE", {
                activeRoute: this.$route.name
            });
        }
    }
</script>

<style scoped lang="scss">
    .upload-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        height: 100%;
    }
    .upload {
        width: 80%;
        height: 90%;
    }
    .mu-grid-tile>img {
        cursor: pointer;
        width: 100%;
        height: auto;
    }
</style>
