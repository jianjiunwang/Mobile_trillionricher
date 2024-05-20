<template>
    <div class="notification">
        <div class="pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>消息通知</b></span>
                </router-link>
            </div>
        </div>
        <div style="padding: 10px;overflow: auto;height: 100%;" >
            <van-cell v-for="(item,i) in tongzhidata"  :key="i" @click="clicktz(item.notification_id,item.type,item.is_receive,item.id,item.content)">
                <template slot="title">
                    <span v-if="item.type.substr(0,1)==7  || item.type.substr(0,1)==8"  class="custom-title">驗證失敗</span>
                    <span  v-else class="custom-title">{{item.content}}</span>
                </template>
                <template slot="label">{{item.create_time | convTimehms}}</template>
                <i  v-if="item.is_receive==0" slot="right-icon" class="iconfont icon-xinxiaoxi" style="font-size: 25px;color: red" ></i>
            </van-cell>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                merber_id:Cookies.get('merber_id'),
                tongzhidata:[],
            }
        },
        components: {},
        methods: {
            gettongzhi:function () {
                this.$http.post('https://www.trillionricher.com/1.0/notification',{
                    merber_id:this.merber_id,
                    token:this.OS.token
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success===1){
                        this.tongzhidata = res.body.data
                    }
                },function(res){
                    console.log(res);
                });
            },
            clicktz:function (id,type,is_receive,order_id,content) {
                if(is_receive == 0){
                        this.$http.post('https://www.trillionricher.com/1.0/return_notification',{
                            notification_id:id,
                        },{emulateJSON:true}).then(function(res){
                            if(res.body.success===1){
                                this.gettongzhi()
                            }
                        },function(res){
                            console.log(res);
                        });
                }
                if(type==1){
                    this.$router.push({
                        path:'/service',
                        query:{
                            id:order_id
                        }
                    });
                }
                if(type==2 || type==3){
                    this.$router.push({
                        path:'/orderdata',
                        query:{
                            id:order_id
                        }
                    });
                }
                if(type==4){
                    this.$router.push('/addidentity')
                }
                if (type==5){
                    this.$router.push('/addfile')
                }
                var text=''
                if(type==71 || type==72 || type==73 || type==74 ||type==75){
                    if(type==71){text='基本資料填寫錯誤'}
                    if(type==72){text='上傳圖檔為黑白或掃描檔'}
                    if(type==73){text='上傳圖檔解析度過低或資料模糊'}
                    if(type==74){text='上傳圖檔資料遭遮擋或因反光難以辨識'}
                    if(type==75){text=content}
                    this.$dialog.alert({
                        message: '親愛的會員您好， 您的身分驗證因'+text+'導致驗證失敗，請修改後重新上傳驗證資料，謝謝您的配合。'
                    });
                }
                if(type==81 || type==82 || type==83 || type==84 ||type==85 || type==86){
                    if(type==81){text='身分驗證尚未完成'}
                    if(type==82){text='個人基本資料內容缺漏或錯誤'}
                    if(type==83){text='名處非手寫簽名'}
                    if(type==84){text='上傳圖檔解析度過低或模糊'}
                    if(type==85){text='上傳圖檔無法正確顯示內容'}
                    if(type==86){text=content}
                    this.$dialog.alert({
                        message: '親愛的會員您好， 您的防洗錢文件驗證因'+text+'導致驗證失敗，請修改後重新上傳驗證資料，謝謝您的配合。'
                    });
                }
            }
        },
        computed: {},
        watch: {},
        mounted: function () {
            this.gettongzhi()
            // window.setInterval(() => {
            //     setTimeout(this.gettongzhi(),0)
            // }, 30000)
        }
    }
</script>
