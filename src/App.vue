<template>
  <div id="app" v-cloak>
    <router-view></router-view>
    <footer v-if="activeRoute =='Init'">Hosted by <a href="https://pages.coding.me" style="font-weight: bold">Coding Pages</a></footer>
  </div>
</template>

<script>
  import axios from "axios";
  import {
    mapState
  } from "vuex";
  import storage from "./utils/storage.js";
  export default {
    name: "app",
    data() {
      return {
      }
    },
    computed: {
      ...mapState({
        username: state => state.username,
        token: state => state.token
      }),
      activeRoute() {
        return this.$route.name
      }
    },
    methods: {
      checkIsLogin() {
        axios
          .post("api/session/check", {
            username: this.username,
            token: this.token
          })
          .then(
            function(res) {
              console.log(res);
              if (res.data.code == 0) {
                // token有效
                this.$store.commit("SNACK_BAR_CHANGE", {
                  snackbar: true,
                  snackMsg: "You have already logined"
                });
                setTimeout(
                  function() {
                    this.$router.push({
                      name: "Home"
                    });
                  }.bind(this),
                  1000
                );
              } else {
                // token失效
                this.$store.commit("SNACK_BAR_CHANGE", {
                  snackbar: true,
                  snackMsg: "Your token is expired, please login again"
                });
                setTimeout(
                  function() {
                    this.$router.push({
                      name: "Login"
                    });
                  }.bind(this),
                  1000
                );
              }
            }.bind(this)
          );
      }
    },
    mounted() {
      /* axios.post("/api/qiniuAuth").then(res => {
        const uploadToken = res.data.uploadToken;
        if (localStorage) {
          localStorage.setItem("qiniu-uploadToken", uploadToken);
        }
      }); */
      //this.checkIsLogin();
    }
  };
</script>
<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  [v-cloak] {
    display: none;
  }
  /*注意，若html设置了高度，获取body的滚动条位置始终为0，所以仅为body设置为100vh*/
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    height: 100%;
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  }
  #app {
    width: 100%;
    height: 100%;
  }
  footer {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #bac3f3;
    a {
      color: inherit;
    }
  }
  img {
    max-width: 100%;
  }
  a {
    cursor: pointer;
  }
</style>
