<template>
  <div class="login">
    <router-view></router-view>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import Config from '../components/Config'
import RegistForm from '../components/RegistForm'
import RegistUserInfoForm from '../components/RegistUserInfoForm'
import Snackbar from "../components/Snackbar.vue"


export default {
  name: 'login',
  data() {
    return {

    }
  },
  
  components: {
    Config,
    RegistForm,
    RegistUserInfoForm,
    Snackbar
  },
  methods: {
    
  },
  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: url('../assets/images/login_bg.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
</style>
