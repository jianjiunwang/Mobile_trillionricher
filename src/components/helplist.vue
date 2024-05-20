<template>
    <div class="helplist">
        <div class="pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>幫助中心</b></span>
                </router-link>
            </div>
        </div>
        <div class="help_body">
            <van-tabs v-model="helptitle" type="card" :swipe-threshold='swipenum'  @change="helptitlechange">
                <van-tab v-for="(item,i) in helplist" :key="i" :title="item.page_name"  ></van-tab>
            </van-tabs>

            <van-collapse v-model="helpbody"  accordion :border="false" @change="helpdatachange">
                <van-collapse-item v-for="(item,i) in helplistdata.notice" :title="item.title" :name="item.notice_id">
                    <div v-html="helpdata">
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>

        <!--<div class="helplist_egopay">-->
            <!--<h3>易支付相關</h3>-->
            <!--<ul class="help">-->
                <!--<li @click="getnoticedata(9)">公司簡介</li>-->
                <!--<li @click="getnoticedata(10)">隱私權政策</li>-->
                <!--<li @click="getnoticedata(11)">免責聲明</li>-->
                <!--<li @click="getnoticedata(12)">會員條款</li>-->
                <!--<li @click="getnoticedata(13)">聯繫我們</li>-->
            <!--</ul>-->
         <!--</div>-->
        <!--<div class="helplist_egopay" v-for="(list,i) in helplist" :key="i" style="margin-top: 30px">-->
            <!--<h3>{{list.page_name}}</h3>-->
            <!--<ul class="help">-->
                <!--<li v-for="(item,y) in list.notice" :key="y" @click="gethelpdata(item.notice_id)">{{item.title}}</li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--<van-popup v-model="helpshow" position="right" :overlay="false" style="width:100%;min-height: 100%;">-->
            <!--<van-nav-bar title="幫助中心" left-arrow :fixed="true" @click-left="helpshow = false" @click-right="copeline">-->
                <!--<i class="iconfont icon-lianjie copeclass" style="font-size: 18px;color: #1989fa;" slot="right" :data-clipboard-text='notice_id' ></i>-->
            <!--</van-nav-bar>-->
            <!--<div style="padding:10px 20px 0;margin-top: 50px">-->
                <!--<h3 style="padding: 10px 0">{{helpdata.title}}</h3>-->
                <!--<p style="font-size: 15px">{{helpdata.create_time | convTimehms}}</p>-->
                <!--<div class="contenthtml" style="padding:20px 0 0 ;border-top:1px solid #c8c8c8;margin-top: 20px;" v-html="helpdata.content"></div>-->
            <!--</div>-->
            <!--<div style="margin-top: 20px">-->
                <!--<van-button plain hairline type="primary" size="large" @click="helpshow=false;helpdata=''">關閉</van-button>-->
            <!--</div>-->
        <!--</van-popup>-->
        <!--<div v-show="loding" style="width:100%;height: 100%;z-index: 9999;position:fixed;top: 0;background-color:rgba(0,0,0,0.4)">-->
            <!--<div style="position: relative;top:45%;text-align: center;width: 100%">-->
                <!--<van-loading color="#fff" style="margin: 0 auto " size="40px"/>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import { Notify } from 'vant';
    import Clipboard from 'clipboard';
    let rst=new Clipboard('.copeclass');
    export default {
        data: function () {
            return {
                notice_id:'',
                helptitle:0,
                helpbody:'',
                swipenum:3,
                loding:false,
                helpshow:false,
                helplist:[],
                helplistdata:[],
                helpdata:'',
            }
        },
        components: {},
        methods: {
            helptitlechange:function(val){
                console.log(val);
                this.helplistdata = this.helplist[val]
            },
            helpdatachange:function(event){
                this.$http.post('https://www.trillionricher.com/1.0/help_details',{notice_id:event},{emulateJSON:true,before:function (request) {
                        this.loding=true
                    }}).then(function(res){
                    if(res.body.success===1){
                        this.helpdata = res.body.data.content
                    }
                },function(res){
                    console.log(res);
                });
            },
            copeline:function(){
                Notify({
                    message: '連結複製成功',
                    duration: 1000,
                    background: '#44e02b'
                });
            },
            getnoticedata:function (type) {
                this.notice_id='https://m.egopay.com.tw/#/helplist?notice_id='+'n'+type
                this.$http.post('https://www.trillionricher.com/1.0/notice',{page:type},{emulateJSON:true,before:function (request) {
                        this.loding=true
                    }}).then(function(res){
                    console.log(res.body);
                    if(res.body.success===1){
                        this.helpshow=true
                        this.helpdata=res.body.data[0]
                        this.loding=false;
                    }
                },function(res){
                    console.log(res);
                });
            },
            gethelplist:function () {
                this.$http.post('https://www.trillionricher.com/1.0/gethelp',{},{emulateJSON:true,before:function (request) {
                        this.loding=true
                    }}).then(function(res){
                    console.log(res.body);
                    if(res.body.success===1){
                        this.loding=false
                        this.helplist=res.body.data
                        this.helplistdata = res.body.data[0]
                        this.notice_id = res.body.data[0].notice[0].notice_id
                        this.helpbody = res.body.data[0].page_id
                        this.gethelpdata(this.notice_id)
                    }
                },function(res){
                    console.log(res);
                });
            },
            gethelpdata:function (id) {
                this.$http.post('https://www.trillionricher.com/1.0/help_details',{notice_id:id},{emulateJSON:true,before:function (request) {
                        this.loding=true
                    }}).then(function(res){
                    console.log(res.body);
                    if(res.body.success===1){
                        this.helpshow=true
                        this.helpdata=res.body.data.content
                        this.loding=false
                    }
                },function(res){
                    console.log(res);
                });
            }
        },
        computed: {},
        watch: {
            helptitle:function (val) {

            },
        },
        created: function () {
            this.gethelplist()
            var n_id=this.$route.query.notice_id

            if(n_id!==undefined){
                this.helpshow=true
                if(n_id == 'n9'){
                    this.getnoticedata(9)
                }else if(n_id == 'n10'){
                    this.getnoticedata(10)
                }else if(n_id == 'n11'){
                    this.getnoticedata(11)
                }else if(n_id == 'n12'){
                    this.getnoticedata(12)
                }else if(n_id == 'n13'){
                    this.getnoticedata(13)
                }else {
                    this.gethelpdata(n_id)
                }
            }
        }
    }
</script>
<style>
    h3{
        margin: 0;
    }
    .helplist_egopay{
        margin-top:60px;padding: 10px 20px
    }
    .helplist_egopay h3{
        color: #363738;
    }
    .helplist_egopay ul{
        margin-top: 5px;
        color: #1989fa;
    }
    .helplist_egopay ul li{
        padding: 10px 0;
        border-bottom: 1px dashed #969696;
    }
    .contenthtml img{
        width: 100%;
    }
    .contenthtml embed{
        width: 100%;
    }
     .van-nav-bar__right {
         font-size: 18px;
     }

</style>