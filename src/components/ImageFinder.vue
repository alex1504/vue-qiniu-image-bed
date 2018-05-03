<template>
    <div class="m-finder">
        <mu-linear-progress v-show="isSearching || isLoading" />
        <section class="search">
            <mu-text-field hintText="搜索图片(标题/关键词/类别)" v-model="searchTxt" @input="search" />
            <!-- <mu-raised-button label="搜索" class="btn-search" @click="searchImediate" primary /> -->
        </section>
        <section v-if="!searchTxt">
            <mu-select-field v-model="select" :labelFocusClass="['label-foucs']" label="过滤">
                <mu-menu-item v-for="(text,index) in filterList" :key="index" :value="index" :title="text" />
            </mu-select-field>
        </section>
        <section class="list" v-if="!searchTxt && select != 2">
            <h2 class="title">最热</h2>
            <div class="content">
                <div class="item" :href="item.source" target="blank" v-for="(item,index) in hotList" :key="index" @click="showImage(item.id,item.source)">
                    <img :src="item.source" :alt="item.title">
                </div>
            </div>
        </section>
        <section class="list" v-if="!searchTxt && select != 1">
            <h2 class="title">最新</h2>
            <div class="content">
                <div class="item" :href="item.source" target="blank" v-for="(item,index) in newList" :key="index" @click="showImage(item.id,item.source)">
                    <img :src="item.source" :alt="item.title">
                </div>
            </div>
        </section>
        <section class="list" v-if="searchTxt">
            <h2 v-if="!searchList.length && !isSearching">搜索结果</h2>
            <p v-if="!searchList.length && !isSearching">抱歉，找不到您想要的图片</p>
            <div class="content">
                <div class="item" :href="item.source" target="blank" v-for="(item,index) in searchList" :key="index" @click="showImage(item.id,item.source)">
                    <img :src="item.source" :alt="item.title">
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import API from "../api/index";
    import Util from "../utils/common";
    export default {
        name: "imageFinder",
        data() {
            return {
                searchTxt: "",
                imgList: [{}],
                searchList: [],
                isSearching: false,
                isLoading: true,
                select: 0,
                filterList: ['所有','最热', '最新'],
            };
        },
        computed: {
            newList() {
                let arr = this.imgList.concat();
                arr = arr.sort((obj1, obj2) => {
                    return obj2.createdAt - obj1.createdAt;
                });
                return arr;
            },
            hotList() {
                let arr = this.imgList.concat();
                arr = arr.sort((obj1, obj2) => {
                    return obj2.count - obj1.count;
                });
                return arr;
            }
        },
        watch:{
            searchTxt(value){
                if(!value){
                    this.searchList.push({})
                }
            }
        },
        methods: {
            search: Util.debounce(
                function() {
                    if (!this.searchTxt) {
                        return;
                    }
                    this.isSearching = true;
                    API.searchImage(this.searchTxt).then(res => {
                        this.searchList = res;
                        this.isSearching = false;
                    });
                },
                600,
                false
            ),
            searchImediate() {
                if (!this.searchTxt) {
                    return;
                }
                this.isSearching = true;
                API.searchImage(this.searchTxt).then(res => {
                    this.searchList = res;
                    this.isSearching = false;
                });
            },
            showImage(id, source) {
                this.updateImageCount(id);
                window.open(source);
            },
            updateImageCount(id) {
                API.updateImageCount(id)
                    .then(res => {
                        this.$store.commit("SNACK_BAR_CHANGE", {
                            snackbar: true,
                            snackMsg: "更新统计成功"
                        });
                    }).catch(error => {
                        this.$store.commit("SNACK_BAR_CHANGE", {
                            snackbar: true,
                            snackMsg: "更新统计失败"
                        });
                    })
            }
        },
        mounted() {
            API.getShareImage().then(res => {
                console.log(res);
                this.imgList = res;
                this.isLoading = false;
            });
        }
    };
</script>

<style scoped lang="scss">
    .mu-linear-progress {
        position: absolute;
        left: 0;
        top: 0;
    }
    .m-finder {
        width: 80%;
        margin: 0 auto;
        .search {
            display: flex;
            .mu-text-field {
                flex: 1;
            }
        }
        .list {
            margin-bottom: 60px;
            .title {
                position: relative;
                padding-left: 10px;
            }
            .title::before {
                content: "";
                display: block;
                position: absolute;
                left: 0;
                top: 50%;
                margin-top: -11px;
                margin-right: 20px;
                width: 4px;
                height: 22px;
                background-color: #46529d;
            }
            .content {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .item {
                    cursor: pointer;
                    height: 200px;
                    margin: 2px;
                    img {
                        height: 100%;
                        min-width: 100%;
                        max-width: 100%;
                        object-fit: cover;
                        vertical-align: bottom;
                    }
                }
            }
        }
    }
</style>
