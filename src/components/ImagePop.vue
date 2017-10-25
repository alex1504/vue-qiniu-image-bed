<template>
  <div class="m-img-pop">
    <mu-popup position="left" popupClass="popup-left" :open="isImagePop" @close="close()">
      <!-- <mu-raised-button label="关闭弹框" @click="close()" primary fullWidth/> -->
      <mu-row class="imgls" gutter>
        <mu-col class="imgbox" v-for="(item,index) in picList" :key="index" width="50" tablet="30" desktop="30">
          <div class="image" :style="'background-image:url('+item.src+')'" @click="showImageView(item.src)"></div>
          <!-- <img :src="item.src" @click="showImageView(item.src)"> -->
        </mu-col>
      </mu-row>
      <div class="imgview">
        <div class="wrap">
          <img :src="imgview" :class="{'z-active': isActive}">
          <mu-raised-button icon="close" class="btn-confirm" primary @click="closeImagePop" primary />
        </div>
      </div>
    </mu-popup>
  </div>
</template>

<script>
  import API from '../api/index'
  import storage from '../utils/storage'
  import auth from '../api/config'
  export default {
    data() {
      return {
        domain: storage.get("qiniu-settings") && storage.get("qiniu-settings").domain || "",
        picList: [],
        isActive: false
      }
    },
    watch: {
      imgview() {
        this.isActive = true;
        setTimeout(()=>{
          this.isActive = false
        },300)
      }
    },
    computed: {
      isImagePop() {
        return this.$store.state.isImagePop
      },
      imgview() {
        return this.$store.state.imgview
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
      }
    },
    mounted() {
      API.getImageList(auth).then(res => {
        if (res.data.code == 200) {
          let data = res.data.data;
          data.sort((obj1, obj2) => {
            return obj2.putTime - obj1.putTime;
          });
          data = data.map(obj => {
            return {
              hash: obj.hash,
              key: obj.key,
              src: `${this.domain}/${obj.key}`,
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
    activated() {}
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
        width: 95%;
        height: 80%;
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
  }
</style>