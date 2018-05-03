<template>
    <div class="m-me">
        <mu-card>
            <mu-card-header :title="'Username:'+userInfo.username" :subTitle="'Nickname:'+userInfo.nickname">
                <mu-avatar :src="userInfo.avatar" slot="avatar" />
            </mu-card-header>
            <!-- <div class="tags">
                    <mu-chip class="demo-chip">
                        Hobby1
                    </mu-chip>
                    <mu-chip class="demo-chip"  @delete="handleClose">
                        Hobby2
                    </mu-chip>
                </div> -->
    
            <mu-list-item :title="userInfo.province">
                <mu-icon slot="left" value="location_on" />
            </mu-list-item>
            <mu-list-item :title="userInfo.sex == 1 ? 'boy' : 'girl'">
                <mu-icon slot="left" value="people" />
            </mu-list-item>
            <mu-list-item :title="userInfo.age | toString">
                <mu-icon slot="left" value="inbox" />
            </mu-list-item>
    
            <mu-card-actions>
                <mu-flat-button label="Change" @click="changeUserInfo" />
            </mu-card-actions>
        </mu-card>
    </div>
</template>
<script>

import axios from 'axios'
export default {
    name: 'settings',
    computed: {
        username() {
            return this.$store.state.username
        }
    },
    data() {
        return {
            userInfo: {}
        }
    },
    methods: {
        getUser() {
            axios.get('api/users/' + this.username)
                .then(function (res) {
                    this.userInfo = res.data[0]
                }.bind(this))
        },
        changeUserInfo: function(){
            console.log(1);
        }
    },
    filters: {
        toString(val) {
            return val+'';
        }
    },
    mounted() {
        this.getUser();
    }
}
</script>
<style scoped lang="scss">
.m-me {
    width: 90%;
    margin: 0 auto;
}

.tags {
    box-sizing: border-box;
    padding: 0 16px 10px;
}
</style>
