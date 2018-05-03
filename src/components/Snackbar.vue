<template>
    <div class="m-snackbar">
        <mu-snackbar v-if="snackbar" :message="msg" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar" />
    </div>
</template>

<script>  
    export default {
        name: 'snackBar',
        data() {
            return {
                snackTimer: null
            }
        },
        computed: {
            snackbar(){
                return this.$store.state.snackbar
            },
            msg(){
                return this.$store.state.snackMsg
            }
        },
        watch: {
            snackbar(){
                this.showSnackbar();
            }
        },
        methods: {
            showSnackbar() {
                if(!this.snackbar){
                    return;
                }
                if (this.snackTimer) clearTimeout(this.snackTimer)
                this.snackTimer = setTimeout(() => { 
                    this.$store.commit('SNACK_BAR_CHANGE',{
                        snackMsg:'',
                        snackbar: false,
                    });
                }, 3000)
            },
            hideSnackbar() {
                this.$store.commit('SNACK_BAR_CHANGE',{
                    snackMsg:'',
                    snackbar: false,
                });
                if (this.snackTimer) clearTimeout(this.snackTimer)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .m-snackbar {
        position: fixed;
        left: 0;
        width: 100%;
        bottom: 2%;
        
    }
    .mu-snackbar {
        position: relative;
        margin: 0 auto;
        left: auto;
        right: auto;
    }
</style>
