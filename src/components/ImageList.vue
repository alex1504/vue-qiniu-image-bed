<template>
  <!-- 记录： 用户表数据 用户名  性别  年龄   城市   github账号  -->
  <div class="m-piclist">
    <mu-linear-progress v-show="isRequesting" />
    <transition name="slide">
      <div class="m-tip" v-show="selectList.length">
        <div class="tip">已选择：{{selectList.length}}个项目</div>
        <div>
          <mu-checkbox label="全选" class="demo-checkbox" @change="toggleSelectAll" v-model="isSelectAll" />
        </div>
      </div>
    </transition>
    <mu-row gutter>
      <mu-col class="item" width="20" tablet="50" desktop="25" v-for="(item,index) in picList" :key="index">
        <mu-card>
          <mu-checkbox name="group" label="" :nativeValue="index.toString()" class="demo-checkbox" v-model="selectList" />
          <mu-card-media>
            <div class="image" :style="'background-image:url('+item.src+')'"></div>
            <div class="cover"  @click="showImagePop(item.src)"></div>
            <!-- <img :src="item.src" /> -->
          </mu-card-media>
          <mu-card-text>
            <mu-text-field :value="item.src" @mouseenter.native="onInputMouseenter" /><br/>
          </mu-card-text>
          <mu-card-actions>
            <mu-flat-button label="复制" v-clipboard:copy="item.src" v-clipboard:success="onCopy" />
            <mu-flat-button label="删除" @click="deleteItem(item,index)" />
            <mu-flat-button label="打开" @click="openLink(item.src)" />
            <mu-flat-button label="选择" @click="selectItem(index)" />
          </mu-card-actions>
        </mu-card>
      </mu-col>
    </mu-row>
    <transition name="slide">
      <div class="m-toolbar" v-show="selectList.length">
        <div class="hd">
          <mu-raised-button class="demo-raised-button" label="批量删除" icon="delete" primary @click="deleteSelectItems" />
        </div>
        <div>
          <mu-raised-button label="取消" class="demo-raised-button" secondary @click="cancleOperation" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import API from "../api/index";
import storage from "../utils/storage";
import auth from "../api/config";
export default {
  name: "picList",
  data() {
    return {
      isRequesting: false,
      count: 4,
      domain:
        (storage.get("qiniu-settings") &&
          storage.get("qiniu-settings").domain) ||
        "",
      selectItems: {
        keys: [],
        data: []
      },
      clipboardTxt: "aaaa",
      selectList: [],
      isSelectAll: false,
      picList: [
        /* {
              hash: "",
              key: "a",
              src: "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png"
            }*/
      ]
    };
  },
  computed: {
    isPicListChange() {
      return this.$store.state.isPicListChange;
    }
  },
  methods: {
    reflowed: function() {
      this.isBusy = false;
    },
    toggleSelect(item) {
      const index = this.selectItems.keys.indexOf(item.key);
      if (index == -1) {
        this.selectItems.data.push(item);
        this.selectItems.keys.push(item.key);
      } else {
        this.selectItems.data.splice(index, 1);
        this.selectItems.keys.splice(index, 1);
      }
    },
    onInputMouseenter(e) {
      const input = e.target.getElementsByClassName("mu-text-field-input")[0];
      input.focus();
      input.select();
    },
    selectItem(item) {
      if (this.selectList.indexOf(item.toString()) !== -1) {
        return;
      }
      this.selectList.push(item.toString());
    },
    cancleOperation() {
      this.selectList = [];
    },
    deleteItem(item, index) {
      console.log(item.key);
      API.deleteImage({
        fileName: item.key
      }).then(res => {
        if (res.data.code == 200) {
          this.picList.splice(index, 1);
          this.selectList = [];
          this.$store.commit("SNACK_BAR_CHANGE", {
            snackbar: true,
            snackMsg: "删除成功"
          });
          this.$store.commit("PICLIST_CHANGE", {
            isPicListChange: true
          });
        } else if (res.data.code == 612) {
          this.$store.commit("SNACK_BAR_CHANGE", {
            snackbar: true,
            snackMsg: "文件不存在"
          });
        } else {
          this.$store.commit("SNACK_BAR_CHANGE", {
            snackbar: true,
            snackMsg: res.data.msg
          });
        }
      });
    },
    deleteSelectItems() {
      const deletePromises = this.selectList.map(selectIndex => {
        selectIndex = parseInt(selectIndex);
        return new Promise((resolve, reject) => {
          API.deleteImage(
            Object.assign(auth, {
              fileName: this.picList[selectIndex].key
            })
          ).then(res => {
            if (res.data.code == 200) {
              for (let i = this.picList.length - 1; i >= 0; i--) {
                if (selectIndex == i) {
                  this.picList.splice(selectIndex, 1);
                }
              }
              this.selectList = [];
              this.$store.commit("SNACK_BAR_CHANGE", {
                snackbar: true,
                snackMsg: "批量删除成功"
              });
              this.$store.commit("PICLIST_CHANGE", {
                isPicListChange: true
              });
            } else {
              reject(res.data);
            }
          });
        });
      });
      Promise.all(deletePromises)
        .then(res => {
          console.log(11);
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onCopy() {
      this.$store.commit("SNACK_BAR_CHANGE", {
        snackbar: true,
        snackMsg: "复制到剪贴板成功"
      });
    },
    toggleSelectAll() {
      if (this.isSelectAll) {
        this.selectList = [];
      } else {
        const selectList = this.picList.map((obj, index) => {
          return index.toString();
        });
        this.selectList = selectList;
      }
    },
    groupByCount(items, count) {
      var len = items.length;
      var arr = [];
      var child = [];
      for (var i = 0; i < len; i++) {
        child.push(items[i]);
        if (child.length === count) {
          arr.push(child);
          child = [];
        }
      }
      if (child.length > 0) {
        arr.push(child);
      }
      return arr;
    },
    openLink(link) {
      window.open(link);
    },
    showImagePop(src) {
      this.$store.commit("IMAGE_POP_CHANGE", {
        isImagePop: true,
        imgview: src
      });
    }
  },
  activated() {
    if (!this.isPicListChange) {
      return;
    }
    this.$store.commit("SPINER_CHANGE", {
      isSpiner: true
    });
    API.getImageList(auth)
      .then(res => {
        console.log(res);
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
          console.log(data);
          this.picList = data;
          this.$store.commit("PICLIST_CHANGE", {
            isPicListChange: false
          });
        } else {
          this.$store.commit("SNACK_BAR_CHANGE", {
            snackbar: true,
            snackMsg: "请检查七牛配置是否正确"
          });
        }
        this.$store.commit("SPINER_CHANGE", {
          isSpiner: false
        });
      })
      .catch(err => {
        console.log(err);
        this.$store.commit("SPINER_CHANGE", {
          isSpiner: false
        });
        this.$store.commit("SNACK_BAR_CHANGE", {
          snackbar: true,
          snackMsg: "获取资源失败"
        });
      });
  }
};
</script>

<style scoped lang="scss">
.m-piclist {
  width: 80%;
  margin: 10px auto 0;
  .item {
    margin: 10px 0;
    width: 188px;
    min-height: 100px;
    box-shadow: 2px 2px 6px #b5b5b5;
    .image {
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      width: 100%;
      height: 150px;
      cursor: pointer;
    }
    .cover {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(255, 255, 255, 0.2);
      cursor: pointer;
    }
  }
  .mu-card {
    position: relative;
    .mu-checkbox {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 3;
    }
  }
}
.row {
  justify-content: space-between;
}
.mu-card-actions {
  display: flex;
  flex-wrap: wrap;
  button {
    flex: 1;
  }
}
.mu-text-field {
  max-width: 100%;
}
.m-tip {
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid #d0d0d0;
  background-color: #fff;
  z-index: 3;
  .tip {
    flex: 1;
  }
  transition: all 0.3s ease-in-out;
  &.slide-enter-active,
  &.slide-leave-active {
    transform: translateY(0);
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translateY(-100%);
  }
}
.m-toolbar {
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 30px;
  z-index: 3;
  border-top: 1px solid #d0d0d0;
  background-color: #fff;
  .hd {
    flex: 1;
  }
  transition: all 0.3s ease-in-out;
  &.slide-enter-active,
  &.slide-leave-active {
    transform: translateY(0);
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translateY(100%);
  }
}
.mu-linear-progress {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
