<template>
    <div class="m-emoji">
        <i v-for="emojiClass in emojiList" class="icon" :class="emojiClass" @click="addEmoji"></i>
    </div>
</template>
<script>
export default {
    name: 'emoji',
    data() {
        return {

        }
    },
    computed: {
        emojiList() {
            var arr = [];
            for (var i = 1; i < 75; i++) {
                arr.push('icon-' + i)
            }
            return arr;
        }
    },
    methods: {
        addEmoji() {
            console.log('add done')
        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/emoji.css";

.m-emoji {
    width: 400px;
    background-color: #fff;
    border-bottom: 1px solid #fefefe;
    position: absolute;
    transform: translateY(-100%);
    top: -1px;
    .icon {
        margin: 2px;
        cursor: pointer;
    }
}
</style>
