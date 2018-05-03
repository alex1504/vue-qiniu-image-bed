<template>
    <div class="m-settings-upload" @click="close">
        <div class="setting-rename">
            <p>是否重命名文件：</p>
            <mu-select-field v-model="uploadType" ref="demo" :labelFocusClass="['label-foucs']">
                <mu-menu-item v-for="(text,index) in list" :key="index" :value="index" :title="text" />
            </mu-select-field>
            <i class="fa fa-question-circle" @click.stop="open('top')"></i>
        </div>
        <div class="file-prefix" v-if="uploadType">
            <p>文件上传前缀（自定义）：</p>
            <div>
                <mu-text-field :hintText="prefixTip" v-model="prefix" /><br/>
            </div>
        </div>
        <transition name="slide">
            <div class="m-pop-up" v-show="isPop">
                <dl>
                    <dt>默认前缀：</dt>
                    <dd>可以保持文件名的唯一性，但文件名会被添加当前日期前缀并且重命名为8位随机数。</dd>
                    <dt>自定义前缀：</dt>
                    <dd>文件名不会被重命名，在上传文件名和已上传文件名重复的情况下，文件不会被上传</dd>
                </dl>
            </div>
        </transition>
        <div>
            <mu-raised-button label="保存" class="demo-raised-button" primary @click="saveSettings" />
        </div>
    </div>
</template>

<script>
    import storage from "../utils/storage";
    import Util from "../utils/common";
    export default {
        name: "settings",
        data() {
            return {
                uploadType: storage.get("uploadOptions") ? 1 : 0,
                list: ["默认前缀（重命名文件）", "自定义前缀（保持上传时的文件名）"],
                isPop: false,
                prefix: storage.get("uploadOptions") && storage.get("uploadOptions").prefix || '',
                isFullWidth: true
            };
        },
        computed: {
            prefixTip() {
                const newDate = new Date(Date.now());
                const year = newDate.getFullYear();
                const month = newDate.getMonth() + 1;
                const date = newDate.getDate();
                return `如：${year}-${month}-${date}/ 或者 image/jpg/`;
            }
        },
        methods: {
            open() {
                this.isPop = true;
                setTimeout(() => {
                    this.isPop = false;
                }, 3000);
            },
            close() {
                this.isPop = false;
            },
            saveSettings() {
                console.log(this.prefix)
                if (this.uploadType == 0) {
                    storage.set("uploadOptions", null);
                    this.$store.commit("UPLOAD_OPTIONS_CHANGE", {
                        uploadOptions: null
                    });
                    this.$store.commit("SNACK_BAR_CHANGE", {
                        snackbar: true,
                        snackMsg: "修改上传设置成功"
                    });
                } else {
                    // 自定义前缀
                    const prefix = this.prefix.trim();
                    if (prefix && !prefix.match(/\S+\/$/)) {
                        this.$store.commit("SNACK_BAR_CHANGE", {
                            snackbar: true,
                            snackMsg: "错误格式"
                        });
                        return;
                    }
                    storage.set("uploadOptions", {
                        prefix: prefix
                    });
                    this.$store.commit("UPLOAD_OPTIONS_CHANGE", {
                        uploadOptions: {
                            prefix: prefix
                        }
                    });
                    this.$store.commit("SNACK_BAR_CHANGE", {
                        snackbar: true,
                        snackMsg: "修改上传设置成功"
                    });
                }
            }
        },
        watch: {
            topPopup(val) {
                if (val) {
                    setTimeout(() => {
                        this.topPopup = false;
                    }, 60000);
                }
            }
        },
        mounted() {}
    };
</script>

<style scoped lang="scss">
    .setting-rename {
        width: 100%;
        display: inline-block;
        cursor: pointer;
        .fa {
            margin-left: 10px;
            font-size: 20px;
            color: #ff4081;
        }
        .mu-text-field{
            width: 80%;
        }
    }
    .m-pop-up {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #46529d;
        padding: 10px;
        z-index: 3;
        color: #fff;
        box-shadow: 0px 1px 4px #333;
        dl {
            transition: all 0.3s ease-in-out;
            margin: 0 auto;
            max-width: 60%;
            &.slide-enter-active,
            &.slide-leave-active {
                transform: translateY(0);
            }
            &.slide-enter,
            &.slide-leave-to {
                transform: translateY(-100%);
            }
        }
    }
</style>
