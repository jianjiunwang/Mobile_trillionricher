<template>
    <div class="header">
        <div class="mpbv-header" >
            <div class="headicon" @click="usershow = true">
                <van-icon name="wap-nav" size="30px" />
                <!--<i class="iconfont icon-xinxiaoxinew2" style="font-size: 20px;color: red" v-show="ly_tongzhi"></i>-->
            </div>
            <router-link to="/">
               <img src="../../assets/image/head_logo.png" alt=""> 
               
            </router-link>
            <!--<div class="exchange">-->
                <!--<span>今日匯率 {{exchange}}</span>-->
                <!--<div>{{update_time | convTime}}</div>-->
            <!--</div>-->
            <!--      <span style="font-size:14px " v-show="merber_id==undefined"><router-link to="/login" style="color:#fff;">登入</router-link></span>
                      <span style="font-size:14px " v-show="merber_id!==undefined" @click="Logout">登出</span> -->
        </div>
        <van-popup v-model="usershow"  position="left" @open="upuserdata" >
            <div class="notlogin" v-show="!islogin">
			<img src="../../assets/image/head_logo.png" style="width: 50%;margin: 10px auto;display: block;"> 
                <ul>
                    <router-link to="/helplist">
                        <li  @click="getnoticedata(1)">
                            <img src="../../assets/image/bangzhu.png" alt="" >
                            <span>幫助中心</span>
                        </li>
                    </router-link>
                    <a href="https://line.me/R/ti/p/%40653ymryv" target="_blank" class="abuttton">
                        <li>
                            <img src="../../assets/image/kefu.png" alt="">
                            <span>線上客服</span>
                        </li>
                    </a>
                </ul>
            </div>
            <div class="loginsuccess" v-show="islogin">
                <div class="userdata">
                    <div class="message">
                        <span>會員資料</span>
                        <div style=" position: relative">
                            <i class="iconfont icon-xinxiaoxi" style="font-size: 25px;color: red"  @click="usershow=false;$router.push('/notification')" ></i>
                            <span v-if="Notice_Number!=0" class="bage">{{Notice_Number}}</span>
                        </div>
                    </div>
                    <div class="head_portrait">
                        <img v-if="userdata.head_portrait!=null" :src="userdata.head_portrait" alt="">
                        <img v-else src="../../assets/image/head_logo22.png" alt="">
                    </div>
                    <div class="username">
                        <span>{{userdata.merber_nickname}}</span>
                        <img src="../../assets/image/edit.png" width="14px" alt="" style="margin-left: 5px">
                    </div>
                    <div class="Rmb">
                        金幣退款
                        <span>￥{{userdata.r_money==null?0:userdata.r_money}}</span>
                        <div >*不提供儲值*</div>
                    </div>
                    <div class="approve">
                        <img src="../../assets/image/yirenzheng.png" alt="" width="15">手機號碼已認證
                    </div>
                    <div class="approve" v-if="userdata.authentication==1" style="color:#F00">身份認證未完成</div>
                    <div class="approve" v-if="userdata.authentication==2" style="color: #0FF;">身份認證中</div>
                    <div class="approve" v-if="userdata.authentication==3" ><img src="../../assets/image/yirenzheng.png" alt="" width="15">身份認證已完成</div>
                    <div class="approve" v-if="userdata.authentication==4" style="color:#F00">身份認證失敗請重新認證</div>
                    <div class="approve" v-if="userdata.fileverify_authentication==0" style="color:#F00">防洗錢聲明書未完成</div>
                    <div class="approve" v-if="userdata.fileverify_authentication==1" style="color: #0FF;">防洗錢聲明書認證中</div>
                    <div class="approve" v-if="userdata.fileverify_authentication==2"><img src="../../assets/image/yirenzheng.png" alt="" width="15">防洗錢聲明書已完成</div>
                    <div class="approve" v-if="userdata.fileverify_authentication==3" style="color:#F00">防洗錢聲明書認證失敗</div>
                </div>
                <div class="notlogin">
                    <ul @click="usershow = false">
                        <router-link to="/order_list">
                            <li>
                                <img src="../../assets/image/dollar-symbol.png" alt="" width="12px">
                                <span>我的訂單</span>
                            </li>
                        </router-link>
<!--                        <router-link to="/orderlist_zb">-->
<!--                            <li>-->
<!--                                <img src="../../assets/image/dollar-symbol.png" alt="" width="12px">-->
<!--                                <span>直播訂單</span>-->
<!--                            </li>-->
<!--                        </router-link>-->
                        <router-link to="/record_r">
                            <li >
                                <img src="../../assets/image/record.png" alt="" width="12px">
                                <span>交易明細</span>
                            </li>
                        </router-link>
                        <router-link to="/helplist">
                            <li>
                                <img src="../../assets/image/information.png" alt="" width="12px">
                                <span>幫助中心</span>
                            </li>
                        </router-link>
                        <a href="https://line.me/R/ti/p/%40653ymryv" target="_blank" class="abuttton">
                            <li>
                                <img src="../../assets/image/service.png" alt="" width="12px">
                                <span >線上客服</span>
                            </li>
                        </a>
                        <li @click="out" style="background-color: #3d62a1;color: #ffffff">
                            <img style="     filter: none;" src="../../assets/image/auto.png" alt="" width="12px">
                            <span >登 出</span>
                        </li>
                    </ul>
                </div>
            </div>
        </van-popup>

    </div>
</template>

<script>
    export default {
        inject:['reload'],
        data: function () {
            return {
                usershow:false,
                exchange:'',
                update_time:'',
                islogin:false,
                userdata:{},
                Notice_Number:0,
                Notice_Number_show:false,
                Alltongzhi:[],
            }
        },
        components: {},
        methods: {
            clicklytongzhi:function(type){
                if(type==1){
                    this.$router.push('/notification')
                }else {
                    this.$router.push('/service')
                }
            },
            getexchange:function(){
                this.$http.post('https://www.trillionricher.com/1.0/exchange',{
                    exchange_type:4,
                },{emulateJSON:true}).then(function(res){

                    if(res.body.success===1){
                        this.exchange=res.body.data[0].exchange
                        this.update_time = res.body.data[0].update_time
                    }
                },function(res){
                    console.log(res);
                });
            },
            gettongzhi:function () {
                var _this = this
                this.$http.post('https://www.trillionricher.com/1.0/notification',{
                    merber_id:this.OS.merber_id,
                    token:this.OS.token
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }
                    if(res.body.success===1){
                        this.Alltongzhi=res.body.data
                        var sum=0
                        for (var i=0;i<this.Alltongzhi.length;i++) {
                            if(this.Alltongzhi[i].is_receive==0){
                                sum++
                            }
                        }
                        _this.Notice_Number = sum
                    }
                },function(res){
                    console.log(res);
                });
            },
            getuserdata:function () {
                this.$http.post('https://www.trillionricher.com/1.0/order_bank_alipay',{
                    merber_id:this.OS.merber_id,
                    token:this.OS.token,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else {
                       this.userdata = res.body.data
                    }
                },function(res){
                    console.log(res);
                });
            },
            upuserdata:function () {
                if(this.OS.merber_id==undefined || this.OS.token == undefined){
                //    this.$router.push('/login');
                    return false
                }
                this.gettongzhi()
                this.getuserdata()
            },
            out:function (num,type) {
                this.$dialog.alert({
                    message: '是否確認登出?',
                    showCancelButton:true,
                    confirmButtonText:'確認',
                    cancelButtonText: '再看看',
                }).then(() => {
                    this.$toast({
                        message:'登出成功！',
                        type:'success',
                        duration:3000,
                    });
                    this.islogin=false,
                    this.reload()
                    Cookies.remove('merber_id','',{ path: '' });
                    Cookies.remove('merber_name','',{ path: '' });
                    Cookies.remove('egopay_key','',{ path: '' });
                    Cookies.remove('merber_nickname','',{ path: '' });
                    Cookies.remove('head_portrait','',{ path: '' });
                }).catch(() => {

                });
            }
        },
        computed: {},
        watch: {},
        created: function () {
          console.log(this.$route.path);
          if(this.OS.merber_id==undefined || this.OS.token == undefined){
              if(this.$route.path != '/register'){
              //  this.$router.push('/login');
                return false
              }else {
                return false
              }

            }
            this.gettongzhi()
            this.islogin = true
            this.getuserdata()
        }
    }
</script>
