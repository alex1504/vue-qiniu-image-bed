# CN
## 牛牛图床
Vue-cli脚手架构建的七牛图片管理图床单页应用（基于[museui](http://www.muse-ui.org)，前后端分离。后端基于express及七牛[nodejs-SDK](https://github.com/qiniu/nodejs-sdk)开发，服务原本部署在Heroku，由于服务响应速度慢的原因，已将后端服务部署在华为云服务器上。
![preview](http://qiniu1.huzerui.com/17-10-26/30600390.jpg)

## 项目地址：
源码地址：https://github.com/alex1504/vue-qiniu-image-bed
在线地址：http://cowbed.huzerui.com

## 功能开发
- [x] 私人空间、公共空间切换
- [x] 控件上传、拖拽本地图片上传、在线图片URL上传
- [x] 外链复制（markdown）
- [x] 图片管理、预览、下载、批量删除
- [x] 图片广场，分享图片到广场
- [ ] 图片分日期管理
- [ ] 图片重命名
- [ ] 音频、视频资源管理

## 技术栈
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

## 本地预览
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

## 其他
1. 为提高访问速度，图床使用[coding](https://coding.net)静态网站托管服务
2. 项目前端使用**localStorage**保存七牛授权数据
3. 部分资源库采用CDN方式引入，由[**bootCDN**](http://www.bootcdn.cn/)提供
4. 若有任何问题、反馈或者建议，请提交issue中。
5. 若项目对你有所帮助，别忘了**star**一下。

# EN
## Cow-Bed
A single page application for Qiniu image management which using Vue-cli(base on [museui](http://www.muse-ui.org)), front-end and back-end seperation. The back-end is based on express and Qiniu [nodejs-SDK](https://github.com/qiniu/nodejs-sdk), it deployed and served originally on Heroku, but dure to slow service response, the service has been deployed on the friend's HUAWEI cloud server.
![preview](http://qiniu1.huzerui.com/17-10-26/30600390.jpg)

## Project Address:
Source address: https://github.com/alex1504/vue-qiniu-image-bed
Online address：http://cowbed.huzerui.com

## Function Development
- [x] Private space and public space switching
- [x] Upload with input element, drag file to upload, upload online pictures URL
- [x] Outer chain replication (markdown)
- [x] Picture management, preview, download, batch delete
- [x] Picture square, share pictures to the square
- [ ] Picture management by date
- [ ] Picture rename
- [ ] Audio and video resource management

## Technology Stack
Front-end：
- Vue2：Vue2.0 progressive MVVM framework
- Vuex：Sharing state between different components
- Vue-router：Single page application routing management plug-in
- Axios：Http request tool
- SASS(SCSS)：CSS preprocessing language
- Webpack：Automated building tools
- Localstorage：Local storage

Backend：
- Express：A concise and flexible framework for node.js Web applications
- cors(Middleware)：Cross domain resource sharing
- body-parse(Middleware)：Parsing the request body
- formidable(Middleware)：Node.js module for parsing form data (form-data)
- nodemon：Monitor modify auto restart node service plug-in

Main grammar：
- Front end ES6, back-end ES5 (part of the development time is in the company, for some reason can not use the high version of node)

## Local Preview
```javascript
git clone https://github.com/alex1504/vue-qiniu-image-bed.git
cd https://github.com/alex1504/vue-qiniu-image-bed.git
// Installation front-end dependency
npm install
cd server
// Installation backend dependency
npm install
cd ../
npm run dev
// Open another git process
npm run server
```

## Others
1. In order to improve access speed, the website using [coding](https://coding.net) for static host
2. Using **localStorage** to save seven cattle authorization data.
3. Some resource libraries are introduced by CDN, which is provided by [**bootCDN**] (http://www.bootcdn.cn/).
4. If you have any questions, feedbacks or suggestions, please submit them to issue.
5. Welcome to **fork and star**, your support is the driving force for me to move forward.
