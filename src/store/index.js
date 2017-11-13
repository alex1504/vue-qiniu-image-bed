import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../utils/storage'
import Util from '../utils/common'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 当前路由名称
        activeRoute: 'ImageFinder',
        // Emoji折叠展开状态
        isEmoji: false,
        // snackbar 状态
        snackbar: false,
        // snackbar文字
        snackMsg: '',
        // 注册用户名
        registUsername: '',
        // 注册密码
        registPassword: '',
        // 当前用户
        username: storage.get('loginInfo') && storage.get('loginInfo').username || '',
        // token
        token: storage.get('token') || '',
        // post封面
        poster: '',
        // 浮层是否显示
        isImagePop: false,
        // 浮层预览主体图片路径
        imgview: '',
        // 加载spiner显示
        isSpiner: false,
        // 七牛图片list数量是否变化
        isPicListChange: true,
        // 七牛API授权
        qiniuAuth: Util.getQiniuAuth(),
        // 上传文件名前缀
        uploadOptions: storage.get("uploadOptions") || null

    },
    getters: {
        // 当前所属菜单
        activeMenu(state) {
            var mapIndex = {
                "ImageFinder": '1',
                "Upload": '2',
                "ImageList": '3',
                "Settings": '4',
                'Chatroom': '5',
                'NewPost': '6',
                "Me": '7',
            }
            return mapIndex[state.activeRoute]
        }
    },
    mutations: {
        ACTIVE_ROUTE_CHANGE: function(state, payload) {
            state.activeRoute = payload.activeRoute
        },
        EMOJI_SHOW_CHANGE: function(state, payload) {
            state.isEmoji = payload.isEmoji
        },
        SNACK_BAR_CHANGE: function(state, payload) {
            state.snackbar = payload.snackbar;
            state.snackMsg = payload.snackMsg;
        },
        REGIST_USER_INFO_CHANGE: function(state, payload) {
            state.registUsername = payload.registUsername;
            state.registPassword = payload.registPassword;
        },
        USERNAME_CHANGE: function(state, payload) {
            state.username = payload.username;
        },
        TOKEN_CHANGE: function(state, payload) {
            state.token = payload.token;
        },
        POSTER_CHANGE: function(state, payload) {
            state.poster = payload.poster;
        },
        IMAGE_POP_CHANGE: function(state, payload) {
            state.isImagePop = payload.isImagePop;
            state.imgview = payload.imgview
        },
        SPINER_CHANGE: function(state, payload) {
            state.isSpiner = payload.isSpiner;
        },
        PICLIST_CHANGE: function(state, payload) {
            state.isPicListChange = payload.isPicListChange;
        },
        QINIU_AUTH_CHANGE: function(state, payload) {
            state.qiniuAuth = payload.qiniuAuth;
        },
        UPLOAD_OPTIONS_CHANGE: function(state, payload) {
            state.uploadOptions = payload.uploadOptions;
        },
    }
})

export default store