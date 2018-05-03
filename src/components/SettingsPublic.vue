<template>
  <div class="m-settings-public">
    <slot name="header"></slot>
    <mu-text-field label="AccessKey" type="password" disabled labelFloat v-model="qiniuAuth.accessKey" /><br/>
    <mu-text-field label="SecretKey" type="password" disabled labelFloat v-model="qiniuAuth.secretKey" /><br/>
    <mu-text-field label="Bucket" type="password" disabled labelFloat v-model="qiniuAuth.bucket" /><br/>
    <mu-text-field label="Domain" disabled hintText="http://ory715icu.bkt.clouddn.com" labelFloat v-model="qiniuAuth.domain" /><br/>
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
      return{
        qiniuAuth: Util.getPublicSettings()
      }
    },
    computed: {
      
    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  .m-settings-public {
    width: 100%;
    margin: 0 auto;
  }
  .mu-text-field {
    width: 100%;
  }
</style>
