<template>
    <div class="m-regist">
         <h3>注册</h3>
        <form action="#">
            <mu-text-field hintText="用户名" v-model="username"/>
            <mu-text-field hintText="密码" v-model="password"/>
            <div class="checkbox-wrap">
                <div class="tip">已有账号？点此
                    <a @click="switchRegistToLogin">登录</a>
                </div>
            </div>
    
            <div class="button-wrap">
               <mu-raised-button label="下一步" class="demo-raised-button" primary  @click="regist" />
            </div>
        </form>
    </div>
</template>

<script>
import Bus from "../store"
export default {
    name: 'registForm',
    data() {
        return {
            username: '',
            password: '',
            isRemember: false,
            isChecked: false
        }
    },
    computed: {
       
    },
    methods:{
        switchRegistToLogin: function(){
            this.$router.push({name: 'LoginForm'})
        },
        checkInput(){
            return new Promise(function(resolve,reject){
                if(!this.username){
                    this.$store.commit('SNACK_BAR_CHANGE',{
                        snackbar: true,
                        snackMsg: 'Username is required'
                    })
                    return;
                }
                if(!this.password){
                    this.$store.commit('SNACK_BAR_CHANGE',{
                        snackbar: true,
                        snackMsg: 'password is required'
                    })
                    return;
                }
                resolve();
            }.bind(this))
           
        },
        regist: function(){
            this.checkInput()
                .then(function(){
                    this.$store.commit("REGIST_USER_INFO_CHANGE",{
                        registUsername: this.username,
                        registPassword: this.password
                    })
                    this.$router.push({name: 'RegistUserInfoForm'})
                }.bind(this))
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mu-text-field{
    width: 300px;
}
.m-regist {
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
        &::after{
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
