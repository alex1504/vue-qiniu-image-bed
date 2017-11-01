# 牛牛图床
Vue-cli脚手架构建的七牛图片管理图床单页应用（基于[museui](http://www.muse-ui.org)），前后端分离。后端基于express及七牛[nodejs-SDK](https://github.com/qiniu/nodejs-sdk)开发，服务原本部署在Heroku，由于服务响应速度慢的原因，已将服务部署在朋友的华为云服务器上。
![preview](http://qiniu1.huzerui.com/17-10-26/30600390.jpg)

# 项目地址：
源码地址：https://github.com/alex1504/vue-qiniu-image-bed
在线地址：http://cowbed.huzerui.com

# 功能开发
- [x] 私人空间、公共空间切换
- [x] 控件上传、拖拽本地图片上传、在线图片URL上传
- [x] 外链复制（markdown）
- [x] 图片管理、预览、下载、批量删除
- [x] 图片广场，分享图片到广场
- [ ] 图片分日期管理
- [ ] 图片重命名
- [ ] 音频、视频资源管理

# 技术栈
前端：
- Vue2：Vue2.0渐进式MVVM框架
- Vuex：实现不同组件之间的状态共享
- Vue-router：单页应用路由管理插件
- Axios：Http请求工具
- SASS(SCSS)：css预处理语言
- Webpack：自动化构建工具
- Localstorage：本地存储

后端：
- Express：简洁而灵活的 node.js Web应用框架
- cors（中间件）：跨域资源共享
- body-parse（中间件）：对请求体进行解析
- formidable（中间件）：解析表单数据（form-data）的Node.js模块
- nodemon：监听修改自动重启node服务插件

主要语法：
- 前端ES6，后端ES5（部分开发时间是在公司，由于某些原因无法使用高版本node）

# 本地预览
```javascript
git clone https://github.com/alex1504/vue-qiniu-image-bed.git
cd https://github.com/alex1504/vue-qiniu-image-bed.git
// 安装前端依赖
npm install
cd server
// 安装后端依赖
npm install
cd ../
npm run dev
// 开启另一个git进程
npm run server
```

# 其他
1. 项目前端使用**localStorage**保存你的七牛授权钥匙，并不会保存你的授权数据到数据库。
2. 部分资源库采用CDN方式引入，由[**bootCDN**](http://www.bootcdn.cn/)提供
3. 若有任何问题、反馈或者建议，请提交issue中。
4. 欢迎**fork及star**，你的支持是我前进的动力。


