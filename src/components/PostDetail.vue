<template>
    <!--START postdetail-->
    <div class="m-postdetail">
        <div class="poster">
            <img :src="post.poster">
        </div>
        <div class="subinfo">
            <span class="key">Author: </span>
            <span v-text="post.author">alex</span>
            <span class="key">Published At: </span>
            <span>{{post.createdAt | timeFormat}}</span>
            <span class="key">
                <mu-icon value="star" />:</span>
            <span v-text="post.star">100</span>
        </div>
        <div class="title">
            <h3 v-text="post.title">Minim proident velit veniam in ullamco excepteur eiusmod anim aliqua ut.</h3>
        </div>
        <div class="content" v-text="post.content">
            Irure magna irure fugiat aliqua officia incididunt in aliqua amet incididunt laborum. Excepteur ut adipisicing non officia deserunt sint deserunt quis est. Fugiat ex velit magna laboris nisi. Mollit duis aute veniam laborum. Sint eiusmod ullamco ipsum enim ex voluptate dolor ullamco ipsum veniam. Minim exercitation non enim nisi occaecat laborum aliqua fugiat Lorem laboris elit.
        </div>
    </div>
    <!--END postdetail-->
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
    name: 'postdetail',
    data() {
        return {
            id: this.$route.params.id,
            post:{}
        }
    },
    methods: {
        getPostDetail(id) {
            axios.get('api/posts/'+ id)
            .then(function (res) {
                this.post = res.data[0];
                console.log(res);
            }.bind(this))
        }
    },
    filters:{
        timeFormat(time){
            return moment(time).fromNow();
        }
    },
    mounted() {
        this.getPostDetail(this.id)
    }
}
</script>
<style scoped lang="scss">
.m-postdetail {
    width: 80%;
    margin: 0 auto;
}

.poster,
.title {
    text-align: center;
}

.subinfo {
    text-align: center;
    .mu-icon {
        vertical-align: -25%;
    }
    .key {
        margin-left: 10px;
    }
}

.title {
    margin: 30px;
}

.content {
    box-sizing: border-box;
    padding: 0 20px;
}
</style>
