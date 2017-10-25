<template>
  <div class="m-settings-public">
    <slot name="header"></slot>
    <mu-text-field label="AccessKey" type="password" disabled labelFloat v-model="accessKey" /><br/>
    <mu-text-field label="SecretKey" type="password" disabled labelFloat v-model="secretKey" /><br/>
    <mu-text-field label="Bucket" type="password" disabled labelFloat v-model="bucket" /><br/>
    <mu-text-field label="Domain" disabled hintText="http://ory715icu.bkt.clouddn.com" labelFloat v-model="domain" /><br/>
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
          (storage.get("qiniu-settings-public") &&
            storage.get("qiniu-settings-public").accessKey) ||
          "WqHb4bf7PzMbq5dmqBf6oA9PNkqdNYqF0dbs6JpK",
        secretKey:
          (storage.get("qiniu-settings-public") &&
            storage.get("qiniu-settings-public").secretKey) ||
          "DUqjuJW3jziYEoC5JaiqF8o3jAKvsxOJoAtV2AOv",
        bucket:
          (storage.get("qiniu-settings-public") &&
            storage.get("qiniu-settings-public").bucket) ||
          "public",
        domain:
          (storage.get("qiniu-settings-public") &&
            storage.get("qiniu-settings-public").domain) ||
          "http://oydgatjao.bkt.clouddn.com"
      };
    },
    computed: {},
    methods: {
    }
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
