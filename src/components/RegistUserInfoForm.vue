<template>
    <div class="m-user-info">
        <mu-linear-progress v-show="isRequesting"/>
        <h3>填写用户信息</h3>
        <form action="#">
            <div class="avatar">
                <img :src="avatar" alt="avatar">
                <mu-icon :class="{refresh: isRefresh}" value="refresh" color="#7e57c2" :size="36" @click="switchAvatar"/>
            </div>
            <!-- <div class="nickname">
                <mu-text-field hintText="别名" v-model="nickname" />
            </div> -->
            <div class="gender">
                <mu-radio label="男" name="group" nativeValue="1" v-model="gender" class="boy" />
                <mu-radio label="女" name="group" nativeValue="2" v-model="gender" class="girl" />
            </div>
            <div class="select age">
                <span class="title">年龄：</span>
                <mu-dropDown-menu :value="age.select" @change="changeAge" :maxHeight='maxHeight'>
                    <mu-menu-item v-for="age,index in ageArr" :key="index" :value="age" :title="age" />
                </mu-dropDown-menu>
            </div>
            <div class="select province">
                <span class="title">城市：</span>
                <mu-dropDown-menu :value="province.select" @change="changeProvince" :maxHeight='maxHeight'>
                    <mu-menu-item v-for="province,index in provinceArr" :key="index" :value="province" :title="province" />
                </mu-dropDown-menu>
            </div>
    
            <div class="button-wrap">
                <mu-raised-button label="确认" class="demo-raised-button" primary @click="confirm" />
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: 'registForm',
    data() {
        return {
            avatar: require('../assets/images/avatar_placehold.png'),
            isRefresh: false,  // 是否正在请求头像
            nickname: '',
            gender: "1",   // 1:body  2:girl
            age: {
                min: 18,
                max: 69,
                select: '18'
            },
            province: {
                select: '北京'
            },
            maxHeight: 200,
            isRequesting:false,
        }
    },
    computed: {
        username(){
            return this.$store.state.registUsername
        },
        password(){
            return this.$store.state.registPassword
        },
        ageArr() {
            var ageArr = [];
            while (this.age.min < this.age.max) {
                ageArr.push(this.age.min.toString());
                this.age.min++;
            }
            return ageArr
        },
        provinceArr() {
            return ['北京', '上海', '广州', '深圳']
        }
    },
    methods: {
        confirm: function () {
            this.checkInput()
                .then(function(){
                    this.sendRegistRequest();
                }.bind(this))
            //this.$router.push({name: 'Home'})
        },
        changeAge(value) {
            console.log(value);
            this.age.select = value
        },
        changeProvince(value) {
            this.province.select = value
        },
        switchAvatar(){
            new Promise(function(resolve,reject){
                this.isRefresh = true;
                var oriSrc = this.avatar;

                var img = new Image();
                var src = 'https://api.adorable.io/avatars/'+ parseInt(Math.random() * 10000000);
                img.addEventListener('load', function(){
                    resolve(src);
                })
                img.addEventListener('error', function(){
                    reject(oriSrc);
                })
                img.src = src;
            }.bind(this)).then(function(src){
                this.avatar = src;
                this.isRefresh = false;
            }.bind(this),function(oriSrc){
                this.$store.commit('SNACK_BAR_CHANGE',{
                    snackbar: true,
                    snackMsg: 'Request avatar fail, pleace try again'
                })
                this.avatar = oriSrc;
                this.isRefresh = false;
            }.bind(this))
        },
        initAvatar(){
            this.isRefresh = true;
            var src = 'https://api.adorable.io/avatars/'+ parseInt(Math.random() * 10000000);
            var img = new Image();
            img.addEventListener('load', function(){
                this.avatar = src;
                this.isRefresh = false;
            })
            img.addEventListener('error', function(){
                this.isRefresh = false;
                this.$store.commit('SNACK_BAR_CHANGE',{
                    snackbar: true,
                    snackMsg: 'Request avatar fail, pleace try again'
                })
            })
            img.src = src;
            
        },
        checkInput(){
            return new Promise(function(resolve,reject){
                if(!this.nickname){
                    this.$store.commit('SNACK_BAR_CHANGE',{
                        snackbar: true,
                        snackMsg: 'Nickname is required'
                    })
                    return;
                }
                this.isRequesting = true;
                resolve();
            }.bind(this))
        },
        sendRegistRequest(){
            axios.post('api/users', {
                username: this.username,
                password: this.password,
                nickname: this.nickname,
                sex: parseInt(this.gender),
                age: parseInt(this.age.select),
                province: this.province.select,
                avatar: this.avatar
            })
            .then(function (res) {
                this.isRequesting = false;
                this.handleResult(res);
            }.bind(this)).catch((err)=>{
                this.isRequesting = false;
                this.$store.commit('SNACK_BAR_CHANGE',{
                    snackbar: true,
                    snackMsg: 'Sorry, there is something wrong with the server.'
                })
            })
        },
        handleResult(res) {
            // 注册失败
            if (res.data.code == 11000) {
                this.msg = 'Username has already existed, please choose another.';
                this.$store.commit('SNACK_BAR_CHANGE',{
                    snackbar: true,
                    snackMsg: this.msg
                });
                return
            }
            // 跳转
            this.$router.push({ name: 'Home' })
        }
    },
    mounted(){
        this.switchAvatar(); 
    },
    beforeRouteEnter (to, from, next) {
        console.log(from.name)
        if(from.name == 'RegistForm'){
            next();
            return;
        }
        // 若用户刷新，跳转回用户名及密码填写界面
        next({ name: 'RegistForm' })
    },
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@keyframes rotate{
    from{
        transform: rotate(0deg)
    }to{
        transform: rotate(360deg)
    }
}
.mu-text-field {
    width: 300px;
}
.mu-linear-progress{
    position: absolute;
    top: 0;
}
.m-user-info {
    position:relative;
    box-sizing: border-box;
    padding: 20px 0;
    form {
        width: 300px;
        margin: 0 auto;
    }

    width: 400px;
    height: 600px;
    background-color: #fff;
    text-align: center;
    .avatar {
        position:relative;
        img{
            background-color: #333;
            width: 90px;
            height:90px;
            border-radius: 50%;
        }
        .mu-icon{
            position:absolute;
            right: 0;
            top: 50%;
            margin-top: -24px;
            cursor: pointer;
            &.refresh{
                animation: rotate 1s infinite ease-in-out;
            }
        }
    }
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
    .gender {
        width: 300px;
        margin: 20px auto 0;
        display: flex;
        .boy {
            margin-right: 20px;
        }
        .girl {}
    }
    .select {
        text-align: left;
        .title {
            display: inline-block;
            height: 56px;
            line-height: 56px;
            position: relative;
            top: 4px;
        }
        margin: 10px 0;
    }
    .mu-dropDown-menu {
        vertical-align: -82%;
    }
}
</style>
