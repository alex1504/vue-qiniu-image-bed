<template>
    <div class="m-login">
        <Settings>
            <div slot="header">
                设置七牛配置
            </div>
            <mu-raised-button slot="footer" label="跳过" class="demo-raised-button" secondary @click="passConfig" />
        </Settings>
        <!--   <mu-linear-progress v-show="isRequesting" />
            <h3>登录</h3>
            <form action="#">
                <mu-text-field hintText="用户名" v-model="username" />
                <mu-text-field hintText="密码" v-model="password" type="password" />
                <div class="checkbox-wrap">
                    <mu-checkbox label="记住我" class="demo-checkbox" v-model="isChecked" />
                    <div class="tip">还没有账号？点此
                        <a @click="switchLoginToRegist">注册</a>
                    </div>
                </div>
        
                <div class="button-wrap">
                    <mu-raised-button label="登录" class="demo-raised-button" primary @click="login" />
                </div>
            </form> -->
    </div>
</template>

<script>
    import Settings from './Settings'
    import storage from '../utils/storage'
    import axios from 'axios'
    export default {
        name: 'loginForm',
        components: {
            Settings
        },
        data() {
            return {
      
            }
        },
        computed: {
        },
        methods: {
            passConfig(){
                this.$router.push({
                    name: 'Ground'
                })
            }
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
    .m-login {
        position: relative;
        box-sizing: border-box;
        padding: 20px 0;
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
