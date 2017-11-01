<template>
  <div class="m-img-pop">
    <mu-popup position="left" popupClass="popup-left" :open="isImagePop" @close="close()">
      <mu-row class="imgls" gutter>
        <mu-col class="imgbox" v-for="(item,index) in picList" :key="index" width="50" tablet="30" desktop="30">
          <div class="image" :style="'background-image:url('+item.src+')'" @click="showImageView(item.src)"></div>
        </mu-col>
      </mu-row>
      <div class="imgview" v-if="!isForm">
        <div class="wrap">
          <div class="main">
            <img :src="imgview" :class="{'z-active': isActive}">
            <mu-float-button icon="close" class="btn-confirm" @click="closeImagePop" primary />
            <mu-float-button :href="imgview" download class="btn-download" primary>
              <i class="fa fa-download"></i>
            </mu-float-button>
            <mu-float-button icon="share" class="btn-share" primary @click.stop.prevent="showForm" />
          </div>
        </div>
      </div>
      <div class="imgview" v-if="isForm">
        <div>
          <h1>分享成功后，图片会在广场中被检索到</h1>
          <mu-text-field hintText="标题" v-model="title" /><br/>
          <mu-text-field hintText="关键词：支持多个，逗号分隔" v-model="keywordBind" /><br/>
          <mu-select-field v-model="imageTypeBind" multiple label="图片类别">
            <mu-menu-item v-for="(item,index) in typeList" :key="index" :value="index" :title="item" />
          </mu-select-field>
          <div>
            <mu-raised-button label="分享" primary @click="shareImage" />
          </div>
          <mu-float-button :href="imgview" class="btn-back" primary @click.stop.prevent="hideForm">
            <i class="fa fa-arrow-left"></i>
          </mu-float-button>
        </div>
      </div>
    </mu-popup>
  </div>
</template>

<script>
  import API from '../api/index'
  import storage from '../utils/storage'
  import Util from "../utils/common"
  export default {
    data() {
      return {
        picList: [],
        isActive: false,
        typeList: ['生活','家居','自然','城市','旅游','食物','用品','科技','交通','素材','金融','商务','概念','动物'],
        /* --- 分享表单 --- */
        isForm: false,
        keywordBind: '',
        title: '',
        imageTypeBind: [],
      }
    },
    watch: {
      imgview() {
        this.isActive = true;
        setTimeout(() => {
          this.isActive = false
        }, 300)
      },
      isImagePop(isImagePop) {
        if (isImagePop) {
          this.getImageList()
        }else{
          this.isForm = false
        }
      }
    },
    computed: {
      isImagePop() {
        return this.$store.state.isImagePop
      },
      imgview() {
        return this.$store.state.imgview
      },
      qiniuAuth() {
        return this.$store.state.qiniuAuth
      },
      /* --- 分享表单 --- */
      keyword(){
        return this.keywordBind.replace('，',',').split(',')
      },
      imageType(){
        return this.imageTypeBind.map((value)=>{
          return this.typeList[value]
        })
      }
    },
    methods: {
      open() {
        this.$store.commit("IMAGE_POP_CHANGE", {
          isImagePop: true
        })
      },
      close() {
        this.$store.commit("IMAGE_POP_CHANGE", {
          isImagePop: false
        })
      },
      showImageView(src) {
        this.$store.commit("IMAGE_POP_CHANGE", {
          isImagePop: true,
          imgview: src
        });
      },
      closeImagePop() {
        this.$store.commit('POSTER_CHANGE', {
          poster: this.imgview
        })
        this.close('left');
      },
      getImageList() {
        API.getImageList(this.qiniuAuth).then(res => {
          if (res.data.code == 200) {
            let data = res.data.data;
            data.sort((obj1, obj2) => {
              return obj2.putTime - obj1.putTime;
            });
            data = data.map(obj => {
              return {
                hash: obj.hash,
                key: obj.key,
                src: `${this.qiniuAuth.domain}/${obj.key}`,
                putTime: obj.putTime
              };
            });
            this.picList = data;
          }
        }).catch(err => {
          console.log(err);
          this.$store.commit("SNACK_BAR_CHANGE", {
            snackbar: true,
            snackMsg: "获取资源失败"
          });
        });
      },
      shareImage(){
        console.log(this.imageType)
        
        if(!this.title || !this.keyword || !this.imageType.length){
           this.$store.commit("SNACK_BAR_CHANGE", {
            snackbar: true,
            snackMsg: "存在字段为空"
          });
          return;
        }
        API.shareImage({
          title: this.title,
          keyword: this.keyword,
          type: this.imageType,
          source: this.imgview
        }).then(res=>{
          console.log(res)
          this.$store.commit("SNACK_BAR_CHANGE", {
            snackbar: true,
            snackMsg: "分享成功"
          });
        }).catch(err=>{
          this.$store.commit("SNACK_BAR_CHANGE", {
            snackbar: true,
            snackMsg: "分享失败"
          });
        })
      },
      showForm(){
        this.isForm = true;
      },
      hideForm(){
        this.isForm = false;
      }
    },
    mounted() {
    },
  }
</script>

<style lang="scss">
  .popup-left {
    width: 30%;
    max-width: 375px;
    height: 100%;
    align-items: center;
    padding: 24px;
  }
  .mu-popup {
    .fa {
      font-size: 18px;
      color: #fff;
    }
    .imgls {
      margin-top: 10px;
      max-height: 90%;
      overflow-y: auto;
      .imgbox {
        cursor: pointer;
        display: flex;
        flex-wrap: wrap;
      }
      .image {
        flex: 1;
        height: 100px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        overflow: hidden;
        margin-top: 10px;
      }
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px)
      }
      to {
        opacity: 1;
        transform: translateY(0)
      }
    }
    .imgview {
      display: flex;
      background-color: #fefefe;
      justify-content: center;
      align-items: center;
      position: fixed; // width: 600px;
      width: 62vw;
      right: -200%;
      height: 90%;
      left: 200%;
      margin-left: -300px;
      top: 50%;
      transform: translate(0, -50%);
      box-shadow: 0px 2px 8px 0px #333;
      .wrap {
        height: 86%;
        width: 80%;
      }
      .main {
        width: 95%;
        height: 100%;
        text-align: center;
      }
      img {
        max-height: 100%;
        &.z-active {
          animation: fadeIn .3s linear;
        }
      }
      .mu-text-field{
        width: 100%;
      }
    }
    .btn-confirm,.btn-back {
      display: block;
      margin: auto;
      position: absolute;
      right: 20px;
      top: 20px;
    }
    .btn-download {
      display: block;
      margin: auto;
      position: absolute;
      right: 20px;
      top: 100px;
    }
    .btn-share {
      display: block;
      margin: auto;
      position: absolute;
      right: 20px;
      top: 180px;
    }
  }
</style>