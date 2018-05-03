// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import store from './store/index.js'
import VueClipboard from 'vue-clipboard2'
import infiniteScroll from 'vue-infinite-scroll'


Vue.use(MuseUI);
Vue.use(VueClipboard);
Vue.use(infiniteScroll);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  methods: {
    // 获取当前路由名称
    getActiveRoute: function () {
      return this.$route.name
    },
    // 提交当前路由名称
    commitActiveRoute: function () {
      var activeRoute = this.getActiveRoute();
      this.$store.commit('ACTIVE_ROUTE_CHANGE', {
        'activeRoute': activeRoute
      })
    },
  },
  mounted: function () {
    // 初始提交路由名称
    this.commitActiveRoute();
  }
});
