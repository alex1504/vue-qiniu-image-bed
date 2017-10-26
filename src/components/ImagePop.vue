<template>
  <div class="m-img-pop">
    <mu-popup position="left" popupClass="popup-left" :open="isImagePop" @close="close()">
      <mu-row class="imgls" gutter>
        <mu-col class="imgbox" v-for="(item,index) in picList" :key="index" width="50" tablet="30" desktop="30">
          <div class="image" :style="'background-image:url('+item.src+')'" @click="showImageView(item.src)"></div>
        </mu-col>
      </mu-row>
      <div class="imgview">
        <div class="wrap">
          <div class="main">
            <img :src="imgview" :class="{'z-active': isActive}">
            <mu-float-button icon="close" class="btn-confirm" @click="closeImagePop" primary />
            <mu-float-button :href="imgview" download icon="add" class="btn-download" primary />
          </div>
          <mu-icon value="file-download" :size="32"/>
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
        isActive: false
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
    }
    .btn-confirm {
      display: block;
      margin: auto;
      position: absolute;
      right: 20px;
      top: 20px;
    }
    .btn-download{
      display: block;
      margin: auto;
      position: absolute;
      right: 20px;
      top: 100px;
    }
  }
</style>