<template>
    <div class="m-settings-self">
        <slot name="header"></slot>
        <mu-text-field label="AccessKey" labelFloat v-model="accessKey" /><br/>
        <mu-text-field label="SecretKey" labelFloat v-model="secretKey" /><br/>
        <mu-text-field label="Bucket" labelFloat v-model="bucket" /><br/>
        <mu-text-field label="Domain" hintText="http://ory715icu.bkt.clouddn.com" labelFloat v-model="domain" /><br/>
        <mu-raised-button label="保存" class="demo-raised-button" primary @click="saveSettings" />
        <slot name="btn"></slot>
        <slot name="footer">
        </slot>
    </div>
</template>

<script>
    import storage from "../utils/storage";
    import Util from "../utils/common"
    export default {
        name: "settings",
        data() {
            return {
                accessKey:
                    (storage.get("qiniu-settings") &&
                        storage.get("qiniu-settings").accessKey) ||
                    "",
                secretKey:
                    (storage.get("qiniu-settings") &&
                        storage.get("qiniu-settings").secretKey) ||
                    "",
                bucket:
                    (storage.get("qiniu-settings") &&
                        storage.get("qiniu-settings").bucket) ||
                    "",
                domain:
                    (storage.get("qiniu-settings") &&
                        storage.get("qiniu-settings").domain) ||
                    ""
            };
        },
        computed: {},
        methods: {
            saveSettings() {
                if (!this.accessKey && !this.secretKey && !this.bucket && !this.domain) {
                    this.$store.commit("SNACK_BAR_CHANGE", {
                        snackbar: true,
                        snackMsg: "表单为空，请填写后再保存"
                    });
                    return;
                }
                storage.set("qiniu-settings", {
                    accessKey: this.accessKey,
                    secretKey: this.secretKey,
                    bucket: this.bucket,
                    domain: this.domain
                });
                this.$store.commit("SNACK_BAR_CHANGE", {
                    snackbar: true,
                    snackMsg: "保存设置成功"
                });
                this.$store.commit("PICLIST_CHANGE", {
                    isPicListChange: true,
                });
                // 更新axios全局header
                Util.setHeadersCommon({
                    accessKey: this.accessKey,
                    secretKey: this.secretKey,
                    bucket: this.bucket
                })
                if (this.$route.name == 'Config') {
                    this.$router.push({
                        name: 'Ground'
                    })
                    storage.set("qiniu-active", 1)
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .m-settings-self {
        width: 100%;
        margin: 0 auto;
    }
    .mu-text-field {
        width: 100%;
    }
</style>
