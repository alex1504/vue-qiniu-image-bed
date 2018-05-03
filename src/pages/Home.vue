<template>
  <div class="home">
    <div class="container">
      <Sidebar></Sidebar>
      <div class="m-main">
        <!--<Ground></Ground>-->
        <!--<PostForm></PostForm>-->
        <!--<ImageList></ImageList>-->
        <!--<Settings></Settings>-->
        <!--<PostDetail></PostDetail>-->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <mu-circular-progress :size="60" :strokeWidth="5" v-if="isLoading"/>
        <Snackbar></Snackbar>
        <ImagePop></ImagePop>
      </div>
    </div>
    <Backtop></Backtop>
  </div>
</template>

<script>
  import axios from "axios";
  import Sidebar from "../components/Sidebar.vue";
  import Upload from "../components/Upload.vue";
  import Chatroom from "../components/Chatroom.vue";
  import PostForm from "../components/PostForm.vue";
  import ImageList from "../components/ImageList.vue";
  import Settings from "../components/Settings.vue";
  import PostDetail from "../components/PostDetail.vue";
  import Snackbar from "../components/Snackbar.vue";
  import ImagePop from "../components/ImagePop.vue";
  import Backtop from "../components/Backtop.vue";

  export default {
    name: "home",
    data() {
      return {};
    },
    computed: {
      isLoading() {
        return this.$store.state.isSpiner;
      }
    },
    components: {
      Sidebar,
      Upload,
      PostForm,
      ImageList,
      Settings,
      PostDetail,
      Chatroom,
      Snackbar,
      ImagePop,
      Backtop
    },
    methods: {},
    mounted() {
    }
  };
</script>

<style scoped lang="scss">
  .home {
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    width: 100%;
    min-height: 100%;
    background: url("../assets/images/login_bg.jpg") no-repeat center center;
    background-size: cover;
  }

  .container {
    width: 100%;
    height: 100%;
  }

  // main
  .m-main {
    position: relative;
    margin-left: 300px;
    min-height: 95vh;
    background-color: #f1f4ff;
    background-attachment: fixed;
    padding: 60px 0;
    &-full {
      left: 100px;
    }
  }

  .m-snackbar {
    z-index: 999999999;
  }

  .mu-circular-progress {
    left: 50%;
    margin-top: 30px;
    margin-left: -30px;
  }
</style>
