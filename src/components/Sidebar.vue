<template>
  <!--Start leftCol-->
  <div class="m-leftcol">
    <div class="menu">
      <mu-icon-menu icon="more_vert" @change="changeMenu" :open="open" @open="handleOpen" @close="handleClose" :value="activeMenu">
        <mu-menu-item value="1" title="图片广场" />
        <mu-menu-item value="2" title="上传图片" />
        <mu-menu-item value="3" title="图片管理" />
        <mu-menu-item value="4" title="七牛配置" />
        <!-- <mu-menu-item value="4" title="聊天室" /> -->
        <!-- <mu-menu-item value="5" title="New Post" />
        <mu-menu-item value="6" title="Me" />
        <mu-menu-item value="7" title="Log out" @click="logOut" /> -->
      </mu-icon-menu>
    </div>
  </div>
  <!--END leftcol-->
</template>

<script>
  import storage from "../utils/storage";
  export default {
    name: "sideBar",
    data() {
      return {
        open: false,
        mapRoute: {
          "1": "ImageFinder",
          "2": "Ground",
          "3": "ImageList",
          "4": "Settings",
          "5": "Chatroom",
          "6": "NewPost",
          "7": "Me",
        }
      };
    },
    computed: {
      activeMenu: function() {
        return this.$store.getters.activeMenu || 1;
      }
    },
    methods: {
      changeMenu(val) {
        this.$router.push({
          name: this.mapRoute[val]
        });
        this.$store.commit("ACTIVE_ROUTE_CHANGE", {
          activeRoute: this.$route.name
        });
      },
      handleOpen() {
        this.open = true;
      },
      handleClose() {
        this.open = false;
      },
      logOut() {
        storage.remove("token");
        this.$store.commit("SNACK_BAR_CHANGE", {
          snackbar: true,
          snackMsg: "You have already loged out"
        });
        this.$router.push({
          name: "Login"
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  // leftCol
  $clr-bg: #46529d;
  $clr-icon: #a5b8c8;
  .m-leftcol {
    position: fixed;
    float: left;
    width: 300px;
    height: 80%;
    height: 80vh;
    background-color: $clr-bg;
    .menu {
      box-sizing: border-box;
      padding: 40px 20px;
      color: $clr-icon;
      .avatar {
        display: block;
        height: 32px;
        line-height: 32px;
        float: right;
      }
    }
    &-mini {
      left: 100px;
    }
    .avatar {
      width: 40px;
      img {
        border-radius: 50%;
      }
    }
  }
</style>
