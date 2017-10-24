<template>
    <div class="m-chatting">
        <div class="top-bar">
            <div class="room-user">
                <!-- swiper -->
                <swiper :options="swiperOption">
                    <swiper-slide v-for="user,index in users">
                        <img :src="user.avatar">
                    </swiper-slide>
    
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="search">
                <mu-text-field hintText="search" type="text" icon="search" />
            </div>
    
        </div>
        <div class="chat-area">
            <div class="chat" v-for="dialogue in dialogues">
                <div class="enter-tip" v-if="dialogue.type == 0">
                    [{{dialogue.user}}
    
                    </span>] enter the room, now totally
                    <span class="total">{{dialogue.total}}</span> person online.
                </div>
    
                <div class="say-wrap say-wrap-l" v-if="dialogue.type == 1 && dialogue.pos == 'left'">
                    <div class="say">
                        <div class="avatar">
                            <div>
                                <img :src="dialogue.avatar">
                            </div>
                        </div>
                        <div class="content">
                            {{dialogue.content}}
                        </div>
                        <div class="time">
                            {{dialogue.time}}
                        </div>
                    </div>
                </div>
    
                <div class="say-wrap say-wrap-r" v-if="dialogue.type == 1 && dialogue.pos == 'right'">
                    <div class="say">
                        <div class="avatar">
                            <div>
                                <img :src="dialogue.avatar">
                            </div>
                        </div>
                        <div class="content">
                            {{dialogue.content}}
                        </div>
                        <div class="time">
                            {{dialogue.time}}
                        </div>
                    </div>
                </div>
    
            </div>
    
            <div class="bottom-bar">
                <span class="tool">
                    <!--Emoji component-->
                    <Emoji v-show="isEmoji"></Emoji>
                    <!--END Emoji component-->
                    <span class="icon">
                        <mu-icon value="face" color="#333" @click="toggleEmoji" />
                    </span>
                </span>
                <span class="input">
                    <mu-text-field hintText="Say something" fullWidth v-model="say" />
                </span>
                <span class="send" @click="sendMessage">
                    <mu-raised-button label="" class="demo-raised-button" icon="send" backgroundColor="#46529d" primary/>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Emoji from './Emoji'
import storage from '../utils/storage'

export default {
    name: 'chatting',
    data() {
        return {
            swiperOption: {
                slidesPerView: 8,
                paginationClickable: true,
                freeMode: true,
                spaceBetween: 10
            },
            // 在线用户数组
            users: [/* {
                username: '',
                avatar: ''
            } */],
            dialogues: [
                /* {
                    type: 0,     // 通知用户上线消息
                    user: '',   // 上线用户
                    avatar: '',
                    users: ['Lorem', 'spam'],  // 在线用户数组
                    total: 10  // 在线总人数
                }, {
                    type: 1,     // 对话消息
                    pos: 'left', // 位置： left  right
                    avatar: 'https://api.adorable.io/avatars/:randomString',
                    content: '想挑战我的，一个一个来',
                    time: '09:16',
                }, {
                    type: 1,     // 对话消息
                    pos: 'right', // 位置： left  right
                    avatar: 'https://api.adorable.io/avatars/:randomString',
                    content: '想挑战我的，一个一个来',
                    time: '02:16',
                } */
            ],
            socket: io.connect('localhost:3000'),
            say: ''
        }
    },
    computed: mapState({
        username: state => state.username,
        isEmoji: state => state.isEmoji || false,
        avatar() {
            return storage.get('loginInfo').avatar;
        }
    }),
    methods: {
        toggleEmoji() {
            this.$store.commit("EMOJI_SHOW_CHANGE", {
                isEmoji: !this.isEmoji
            });
        },
        sendMessage() {
            if (!this.say.trim()) {
                this.$store.commit('SNACK_BAR_CHANGE', {
                    snackbar: true,
                    snackMsg: 'Message can not be empty'
                })
                return;
            }
            var _this = this;
            this.socket.emit('message', { say: _this.say, avatar: _this.avatar });
            this.say = ''
        },
        formatTime(date) {
            var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            return hour + ':' + minute
        },

    },
    components: {
        swiper,
        swiperSlide,
        Emoji
    },
    mounted: function () {
        console.log(this.dialogues)
        var _this = this;


        this.socket.emit('online', { username: _this.username, avatar: _this.avatar });
        this.socket.on("online", function (data) {
            console.log('online');
            /* 若用户已存在则不更新在线列表 */
            var arr = [];
            _this.users.forEach(function (user) {
                arr.push(user.username)
            })
            if (arr.indexOf(data.user) != -1) {
                return;
            }

            var dialogue = {
                type: 0,     // 通知用户上线消息
                user: data.user,
                users: data.users,  // 在线用户数组
                total: data.users.length,  // 在线总人数
                avatar: data.avatar
            }
            _this.dialogues.push(dialogue)



            _this.users.push({
                username: data.user,
                avatar: data.avatar
            })
        })

        this.socket.on("message", function (data) {
            var pos = _this.dialogues[_this.dialogues.length - 1].pos == 'left' ? 'right' : 'left';
            console.log(pos)
            var dialogue = {
                type: 1,     // 对话消息
                pos: pos, // 位置： left  right
                avatar: data.avatar,
                content: data.message,
                time: _this.formatTime(new Date()),
            }
            _this.dialogues.push(dialogue)

        })
    },
    destoryed() {
        alert(1);
    }
}
</script>
<style scoped lang="scss">
$clr-mainbg: #f1f4ff;
$clr-saybg: #888;
$clr-say: #fff;
$clr-time: #aaa;

.m-chatting {
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 0 30px;
    height: 700px;
    height: 80vh;
    overflow: auto;
}









/*topbar*/

.top-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    vertical-align: middle;
    box-sizing: border-box;
    padding-left: 10px;
    cursor: pointer;
    .room-user {
        height: 100%;
        width: 70%;
        float: left;
    }
    .search {
        height: 100%;
        width: 30%;
        float: right;
        box-sizing: border-box;
        .mu-text-field-content {
            padding-top: 6px;
        }
    }
    .swiper-container {
        .swiper-slide {
            display: inline-block;
            text-align: center;
            padding: 5px;
            display: flex;
            align-items: center;
        }
        height: 100%;
        img {
            max-height: 100%;
            user-select: none;
            border-radius: 50%;
        }
    }
}










/*chat-area*/

.chat-area {
    color: $clr-say;
    .enter-tip {
        text-align: center;
        color: #999;
        margin: 10px 0 50px;
    }
    .say-wrap {
        position: relative;
        min-height: 50px;
        margin: 20px 0;
        display: flex;
        &.loading {
            .say {
                width: 150px;
            }
        }
        &-r.loading {
            .content {
                position: relative;
                left: -10px;
            }
        }
        &-l {
            justify-content: flex-start;
            .avatar {
                position: absolute;
                left: -25px;
                top: 0;
                height: 50px;
                width: 50px;
                background-color: $clr-mainbg;
                display: flex;
                justify-content: center;
                border-radius: 50%;
                align-items: center;
                &>div {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                }
            }
            .time {
                right: 0;
            }
        }
        &-r {
            justify-content: flex-end;
            .avatar {
                position: absolute;
                right: -25px;
                top: 0;
                min-height: 50px;
                width: 50px;
                background-color: $clr-mainbg;
                display: flex;
                justify-content: center;
                border-radius: 50%;
                align-items: center;
                &>div {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                }
            }
            .time {
                left: 0;
            }
        }
        .say {
            position: relative;
            width: 40%;
            min-height: 50px;
            line-height: 1.5;
            background-color: $clr-saybg;
            padding: 0 30px;
            .content {
                padding: 20px 10px;
            }
            .time {
                position: absolute;
                top: -20px;
                color: $clr-time;
            }
        }
    }
}























/*bottom-bar*/

.bottom-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    span {
        display: inline-block;
        vertical-align: middle;
    }
    .tool {
        position: relative;
        z-index: 3;
        padding: 10px 0;
        .icon {
            width: 50px;
            text-align: center;
            cursor: pointer;
        }
    }
    .input {
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        width: 100%;
        padding: 0 100px 0 50px;
    }
    .send {
        position: relative;
        z-index: 3;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        .mu-raised-button {
            height: 100%;
            width: 50px;
            min-width: auto;
        }
    }
}




















/*Loading*/

@-webkit-keyframes lds-ellipsis3 {
    0%,
    25% {
        left: 32px;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    50% {
        left: 32px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    75% {
        left: 60px;
    }
    100% {
        left: 80px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

@keyframes lds-ellipsis3 {
    0%,
    25% {
        left: 32px;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    50% {
        left: 32px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    75% {
        left: 60px;
    }
    100% {
        left: 80px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

@-webkit-keyframes lds-ellipsis2 {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    25%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
}

@keyframes lds-ellipsis2 {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    25%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
}

@-webkit-keyframes lds-ellipsis {
    0% {
        left: 32px;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    25% {
        left: 32px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    50% {
        left: 60px;
    }
    75% {
        left: 80px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    100% {
        left: 32px;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
}

@keyframes lds-ellipsis {
    0% {
        left: 20px;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    25% {
        left: 32px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    50% {
        left: 60px;
    }
    75% {
        left: 80px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    100% {
        left: 32px;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
}

.lds-ellipsis {
    position: relative;
}

.lds-ellipsis>div {
    position: absolute;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
}

.lds-ellipsis div>div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #f00;
    position: absolute;
    top: 50%;
    left: 32px;
    -webkit-animation: lds-ellipsis 1.6s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis 1.6s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
}

.lds-ellipsis div:nth-child(1) div {
    -webkit-animation: lds-ellipsis2 1.6s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis2 1.6s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    background: #ffffff;
}

.lds-ellipsis div:nth-child(2) div {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
    background: #ffffff;
}

.lds-ellipsis div:nth-child(3) div {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
    background: #ffffff;
}

.lds-ellipsis div:nth-child(4) div {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
    background: #ffffff;
}

.lds-ellipsis div:nth-child(5) div {
    -webkit-animation: lds-ellipsis3 1.6s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis3 1.6s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    background: #ffffff;
}
</style>
