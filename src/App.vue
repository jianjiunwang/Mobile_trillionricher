<template>
  <div id="app">
      <div class="wrapper">
        <Header></Header>
        <router-view v-if="isRouterAlive"></router-view>
        <tabbar></tabbar>
      </div>
      <!--<van-dialog
          v-model="tongzhi"
          cancel-button-color="#1989fa"
          :showConfirmButton="false"
  >
      <div class="tongzhistyle" v-html="gonggaohtml">

      </div>
      <div style="width: 50px;height: 50px;position: fixed;top: 0;left: 0" @click="webpwd = true">

      </div>
      <input type="text" v-show="webpwd" v-model="WEBpassword"  @keyup.enter="webpassword">
  </van-dialog>-->
  </div>
</template>

<script>
import tabbar from './components/tabbar'
import Header from './components/accounts/header'
import '../src/assets/css/style.css'
export default {
    name: 'app',
    components: {
        tabbar,
        Header
    },
    provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
        return {
            reload: this.reload,

        }
    },
    data() {
        return{
            isRouterAlive: true,
            gonggaohtml:'',
            tongzhi:false,
            webpwd:false,
            WEBpassword:"",
        }
    },
    methods: {
        reload () {
            this.isRouterAlive = false;            //先关闭，
            this.$nextTick(function () {
                this.isRouterAlive = true;         //再打开
            })
        },
        webpassword(){
            if(this.WEBpassword == '0978522319'){
                this.tongzhi = false
            }
        },
    },
    created:function () {
        this.$http.post('https://www.trillionricher.com/1.0/notice_switch',{
        },{emulateJSON:true,})
            .then(function(res){
              if(res.body.success==1){
                    if(res.body.data[1].switch==1){
                        this.tongzhi = true
                        this.gonggaohtml = res.body.data[1].content
                    }else {
                        this.tongzhi = false
                    }
                }
            },function(res){
                console.log(res);
            });
    }
}
</script>
<style>
    .tongzhistyle{
        padding:30px 20px;
        font-size: 18px;

    }
    .tongzhistyle img{
        width: 100%;
    }
</style>

