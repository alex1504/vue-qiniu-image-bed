<template>
  <div class="container">
    <div id="particles-js"></div>
    <div class="main">
      <h2 class="title">牛牛图床</h2>
      <Config></Config>
      <!-- <router-view></router-view> -->
      <Snackbar></Snackbar>
    </div>
  </div>
</template>

<script>
  import Config from "../components/Config";
  import RegistForm from "../components/RegistForm";
  import RegistUserInfoForm from "../components/RegistUserInfoForm";
  import Snackbar from "../components/Snackbar.vue";
  import particleConfig from '../config/particleConfig'
  export default {
    name: "login",
    data() {
      return {};
    },
    components: {
      Config,
      RegistForm,
      RegistUserInfoForm,
      Snackbar
    },
    methods: {},
    mounted() {
      particlesJS("particles-js", particleConfig);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #particles-js {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    background-color: rgba(70, 82, 157, 0.89);
  }
  .container {
    width: 100%;
    height: 100%;
    /*background: url('../assets/images/login_bg.jpg') no-repeat center center;*/
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main{
    position: relative;
    z-index: 3;
    .title{
      font-size: 30px;
      text-align:center;
      color: #fff;
    }
    .title::before{
      content: "";
      display: inline-block;
      width: 60px;
      height: 50px;
      background: url('../assets/images/logo.png') no-repeat center center;
      background-size: contain;
      vertical-align: middle;
      position: relative;
      top: -4px;
      left: -10px;
    }
  }
</style>
