<template>
  <div class="m-settings">
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="私人空间" />
      <mu-tab value="tab2" title="公共空间" />
    </mu-tabs>
    <div v-if="activeTab === 'tab1'">
      <settings-self>
        <mu-raised-button slot="btn" label="切换当前空间" class="demo-raised-button" secondary @click="openBottomSheet" />
      </settings-self>
    </div>
    <div v-if="activeTab === 'tab2'">
      <settings-public>
        <mu-raised-button slot="btn" label="切换当前空间" class="demo-raised-button" secondary @click="openBottomSheet" />
      </settings-public>
    </div>
    <!-- bottom sheet -->
    <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
      <mu-list @itemClick="closeBottomSheet">
        <mu-sub-header>
          你当前所处空间为：{{qiniuActive == 1 ? '私人空间' : '公共空间'}}
        </mu-sub-header>
        <mu-list-item title="私人空间" @click="changeZone(1)" />
        <mu-list-item title="公共空间" @click="changeZone(2)" />
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>

<script>
  import storage from "../utils/storage";
  import Util from "../utils/common";
  import SettingsSelf from "./SettingsSelf.vue";
  import SettingsPublic from "./SettingsPublic.vue";
  export default {
    name: "settings",
    components: {
      SettingsSelf,
      SettingsPublic
    },
    data() {
      return {
        value: "private",
        activeTab: "tab1",
        bottomSheet: false,
        qiniuActive: storage.get("qiniu-active") || -1
      };
    },
    computed: {},
    methods: {
      handleTabChange(val) {
        this.activeTab = val;
      },
      handleActive() {
        window.alert("tab active");
      },
      closeBottomSheet() {
        this.bottomSheet = false;
      },
      openBottomSheet() {
        this.bottomSheet = true;
      },
      changeZone(zoneFlag) {
        storage.set("qiniu-active", zoneFlag);
        const zoneName = zoneFlag == 1 ? "私人空间" : "公共空间";
        const qiniuAuth = Util.getQiniuAuth();
        this.$store.commit("SNACK_BAR_CHANGE", {
          snackbar: true,
          snackMsg: `成功切换到${zoneName}`
        });
        this.$store.commit("PICLIST_CHANGE", {
          isPicListChange: true
        });
        this.$store.commit("QINIU_AUTH_CHANGE", {
          qiniuAuth: qiniuAuth
        });
      }
    },
    activated() {
      const zoneName = storage.get("qiniu-active") == 1 ? "私人空间" : "公共空间";
      this.$store.commit("SNACK_BAR_CHANGE", {
        snackbar: true,
        snackMsg: `你当前所在的空间为${zoneName}`
      });
    }
  };
</script>

<style scoped lang="scss">
  .m-settings {
    width: 80%;
    margin: 0 auto;
  }
  .mu-text-field {
    width: 100%;
  }
  .mu-tabs{
    background-color:#46529d;
  }
  .mu-tab-link-highlight{
    background-color: #ff4081;
  }
</style>
