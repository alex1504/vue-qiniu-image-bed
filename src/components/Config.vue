<template>
    <div class="m-config">
        <SettingsSelf>
            <mu-raised-button slot="footer" label="跳过" class="demo-raised-button" secondary @click="passConfig" />
        </SettingsSelf>
    </div>
</template>

<script>
    import SettingsSelf from './SettingsSelf'
    import storage from '../utils/storage'
    import axios from 'axios'
    export default {
        name: 'loginForm',
        components: {
            SettingsSelf
        },
        data() {
            return {}
        },
        computed: {},
        methods: {
            // 1：私人空间  2：公共空间
            passConfig() {
                storage.set("qiniu-active", 2);
                this.$router.push({
                    name: 'Ground'
                })
            }
        },
        mounted() {
            this.$store.commit("SNACK_BAR_CHANGE", {
                snackbar: true,
                snackMsg: "请设置七牛配置，若跳过，将为你配置体验空间"
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .mu-text-field {
        width: 300px;
    }
    .mu-linear-progress {
        position: absolute;
        top: 0;
    }
    .m-config {
        position: relative;
        box-sizing: border-box;
        padding: 20px;
        width: 400px;
        height: 600px;
        background-color: #fff;
        text-align: center;
        .checkbox-wrap {
            position: relative;
            box-shadow: none;
            width: 300px;
            margin: 0 auto;
            &::after {
                content: "";
                display: block;
                height: 0px;
                visibility: hidden;
                clear: both;
            }
            label {
                width: 30%;
                float: left;
                text-align: left;
            }
            .tip {
                width: 70%;
                float: right;
                padding: 4px 0;
                text-align: right;
            }
        }
        .button-wrap {
            width: 300px;
            margin: 0 auto;
            text-align: right;
            margin-top: 30px;
        }
    }
</style>
