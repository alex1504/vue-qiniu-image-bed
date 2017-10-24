import Vue from 'vue'
import Router from 'vue-router'
import Init from '@/pages/Init'
import Home from '@/pages/Home'
import Config from '@/components/Config'
import RegistForm from '@/components/RegistForm'
import RegistUserInfoForm from '@/components/RegistUserInfoForm'
import Ground from '@/components/Ground'
import Chatroom from '@/components/Chatroom'
import NewPost from '@/components/PostForm'
import PostDetail from '@/components/PostDetail'
import ImageList from '@/components/ImageList'
import Me from '@/components/Me'
import Settings from '@/components/Settings'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Init',
        component: Init,
        redirect: {
            name: 'Config'
        },
        children: [{
            name: 'Config',
            path: 'config',
            component: Config
        }, {
            name: 'RegistForm',
            path: 'regist',
            component: RegistForm
        }, {
            name: 'RegistUserInfoForm',
            path: 'regist/confirm',
            component: RegistUserInfoForm
        }]
    }, {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: {
            name: 'Ground'
        },
        children: [{
            name: 'Ground',
            path: 'ground',
            component: Ground
        }, {
            name: 'Chatroom',
            path: 'chatroom',
            component: Chatroom
        }, {
            name: 'NewPost',
            path: 'newpost',
            component: NewPost
        }, {
            name: 'PostDetail',
            path: 'postDetail/:id',
            component: PostDetail
        }, {
            name: 'ImageList',
            path: 'imageList',
            component: ImageList
        }, {
            name: 'Me',
            path: 'me',
            component: Me
        }, {
            name: 'Settings',
            path: 'settings',
            component: Settings
        }]
    }, {
        path: '*',
        name: 'root',
        redirect: {
            name: 'Ground'
        }
    }]
})