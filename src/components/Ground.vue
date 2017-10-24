<template>
    <!--Start Ground-->
    <div class="ground-container" ref="box">
       <Fileupload></Fileupload>
    </div>
    <!--END Ground-->
</template>
<script>
import axios from 'axios'
import Fileupload from './Fileupload'
export default {
    name: 'ground',
    components:{
        Fileupload
    },
    data() {
        return {
          
        }
    },
    computed: {
      
    },
    watch: {
        
    },
    methods: {
       
    },
    filters: {
       
    },
    mounted() {
       
    }
}
</script>
<style scoped lang="scss">
.ground-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 100%;
}

.ground {
    width: 80%;
    height: 90%;
}

.mu-grid-tile>img {
    cursor: pointer;
    width: 100%;
    height: auto;
}
</style>
