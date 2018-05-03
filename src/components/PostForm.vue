<template>
    <!--START post-->
    <div class="m-post">
        <mu-linear-progress v-show="isRequesting" />
        <div class="title">
            <mu-text-field v-model="title" hintText="标题" fullWidth :errorText="inputErrorText" @textOverflow="handleInputOverflow" :maxLength="10" />
        </div>
        <div class="imgbox">
            <mu-text-field v-model="image" hintText="封面图片" fullWidth disabled />
            <mu-flat-button class="btn-img" icon="image" primary @click="showImagePop"/>
        </div>
        <div class="content">
            <mu-text-field v-model="content" hintText="说点什么" multiLine :rows="3" :rowsMax="10" fullWidth />
        </div>
        <mu-raised-button label="发布" class="demo-raised-button" @click="createPost" primary/>

        <ImagePop></ImagePop>
    </div>
    <!--END post-->
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ImagePop from './ImagePop'
export default {
    name: 'postForm',
    components:{
        ImagePop
    },
    data() {
        return {
            title: '',
            content: '',
            inputErrorText: '',
            posters: posters,
            isRequesting: false
        }
    },
    computed: mapState({
        username: state => state.username,
        token: state => state.token,
        image: state => state.poster || ''
    }),
    methods: {
        handleInputOverflow(isOverflow) {
            this.inputErrorText = isOverflow ? 'More than 10 character' : ''
        },
        checkInput() {
            return new Promise(function (resolve, reject) {
                if (!this.title) {
                    this.$store.commit('SNACK_BAR_CHANGE', {
                        snackbar: true,
                        snackMsg: 'Title is required'
                    })
                    return;
                }
                if (!this.image) {
                    this.$store.commit('SNACK_BAR_CHANGE', {
                        snackbar: true,
                        snackMsg: 'Image poster is required'
                    })
                    return;
                }
                if (!this.content) {
                    this.$store.commit('SNACK_BAR_CHANGE', {
                        snackbar: true,
                        snackMsg: 'Content is required'
                    })
                    return;
                }
                this.isRequesting = true;
                resolve();
            }.bind(this))
        },
        createPost() {
            this.checkInput()
                .then(function () {
                    this.sendPostRequest();
                }.bind(this))
        },
        sendPostRequest() {
            console.log(this.token)
            axios.post('api/posts', {
                token: this.token,
                title: this.title,
                author: this.username,
                poster: this.image,
                content: this.content
            }).then(function (res) {
                this.isRequesting = false;
                this.handleResult(res);
            }.bind(this)).catch((err) => {
                console.log('catch');
                this.isRequesting = false;
                this.$store.commit('SNACK_BAR_CHANGE', {
                    snackbar: true,
                    snackMsg: 'Sorry, there is something wrong with the server.'
                })
            })
        },
        handleResult(res) {
            if (res.data.code == 1) {
                this.$store.commit('SNACK_BAR_CHANGE', {
                    snackbar: true,
                    snackMsg: res.data.msg
                })
                return;
            }
            this.$store.commit('SNACK_BAR_CHANGE', {
                snackbar: true,
                snackMsg: 'You have created a post.'
            })
            setTimeout(function(){
                // 跳转
                this.$router.push({ name: 'Ground' })
                this.$store.commit("ACTIVE_ROUTE_CHANGE",{
                    activeRoute: 'Ground'
                })
            }.bind(this),1000)
        },
        showImagePop(){
            this.$store.commit("IMAGE_POP_CHANGE",{
                isImagePop: true
            })
        }
    }
}
</script>
<style scoped lang="scss">
.mu-linear-progress {
    position: absolute;
    top: 0;
    left: 0;
}

.m-post {
    width: 80%;
    margin: 0 auto;
}
.imgbox{
    margin-top: 10px;
    position: relative;
    .btn-img{
        position: absolute;
        top: 0;
        right: 0;
    }
}
.content {
    margin-top: 10px;
}

</style>
