<template>
    <div class="order_list">
        <div class="pagetitle order_pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>我的訂單</b></span>
                </router-link>
            </div>
            <div class="ordertype_slect">
                <el-select v-model="active" placeholder="全部" size="mini" >
                    <el-option
                               v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <table class="order_table">
            <tr>
                <th>類型</th>
                <th>訂單編號</th>
                <th>匯率</th>
            </tr>
            <tr>
                <th>訂單金額</th>
                <th>應付新臺幣</th>
                <th>完成時間</th>
            </tr>
            <tbody v-for="item in orderlist" >
                <tr>
                    <td>{{item.service_type=='1'?'代付':item.service_type=='3'?'貨款':'代收'}}</td>
                    <td>{{item.order_num}}</td>
                    <td>{{item.exchange_rate}}</td>
                </tr>
                <tr>
                    <td>{{item.robot_rmb}}</td>
                    <td>{{item.robot_twd}}</td>
                    <td>{{item.update_time| convTime}}</td>
                </tr>
                <tr class="onebg">
                    <td class="order_foot" colspan="2">
                        <span v-if="item.order_state==0" class="zticon" style="color:#FFA801;">訂單處理中</span>
                        <span v-if="item.order_state==3" class="zticon" style="color:#FFA801;">等待匯款</span>
                        <span v-if="item.order_state==4" class="zticon" style="color:#004bd9;">
                                <span v-if="item.service_type==1" class="zticon" >代付中</span>
                                <span v-if="item.service_type==2" >儲值中</span>
                                <span v-if="item.service_type==3" >處理中</span>
                                <span v-if="item.service_type==4" >提現中</span>
                            </span>
                        <span  v-if="item.order_state==6" class="zticon" style="color:#49B85C;">交易成功</span>
                        <span class="zhuantai" v-if="item.order_state==30 || item.order_state==31" style="color:#efb300">已匯款</span>
                        <span  v-if="item.order_state==7" class="zticon" style="color:#777A86;">取消訂單</span>
                        <span v-else-if="item.order_state==5 || item.order_state==8 || item.order_state==9 ||item.order_state==10" class="zticon" style=" color: #ff0004;">
                                <span v-if="item.service_type==1" >代付失敗</span>
                                <span v-if="item.service_type==2" >儲值失敗</span>
                                <span v-if="item.service_type==3" >處理失敗</span>
                                <span v-if="item.service_type==4" >提現失敗</span>
                        </span>
                        <span  v-if="item.order_state==11" class="zticon" style="color:#a66cb9;">退款成功</span>
                        <span  v-if="item.order_state==12" class="zticon" style="color:#f62400;">申请退款</span>
                        <span  v-if="item.order_state==13" class="zticon" style="color:#f62400;">單筆退款</span>
                        <span  v-if="item.order_state==14 || item.order_state==15 || item.order_state==16" class="zticon" style="color:#FF5000">請做驗證</span>
                    </td>
                    <td class="ordericon order_foot">
                        <img src="../assets/image/information.png"  alt="">
                        <img src="../assets/image/screenshot.png" v-show="item.service_type==3" alt="" @click="picture(item.order_num,item.service_type)">
                        <van-icon @click="golistdata(item.order_id)" name="arrow" size="20px" ></van-icon >
                    </td>
                </tr>
            </tbody>

        </table>
        <div class="page">
            <van-pagination
                    v-model="Page"
                    @change="Currentpage"
                    :items-per-page=5
                    :total-items="listtotal"
                    :show-page-size="5"
                    force-ellipses
            ></van-pagination>
        </div>
        <div v-show="loding" style="width:100%;height: 100%;z-index: 9999;position:fixed;top: 0;background-color:rgba(0,0,0,0.4)">
            <div style="position: relative;top:45%;text-align: center;width: 100%">
                <van-loading color="#fff" style="margin: 0 auto " size="40px"/>
            </div>
        </div>
        <van-popup v-model="pictureshow" style="width: 100%;">
            <div style="width: 100%">
                <img :src="imgsrc" alt="" style="width: 100%;">
            </div>
        </van-popup>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                merber_id:Cookies.get('merber_id'),
                active:'1',
                orderlist:[],
                loding:false,
                pictureshow:false,
                imgsrc:'',
                Page:1,
                listtotal:20,
                order_state:1,
                options: [{
                    value: '1',
                    label: '全部'
                },{
                    value: '3',
                    label: '等待匯款'
                }, {
                    value: '4',
                    label: '代付中'
                }, {
                    value: '6',
                    label: '交易成功'
                }, {
                    value: '7',
                    label: '交易關閉'
                }, {
                    value: '11',
                    label: '退款'
                }],
            }
        },
        components: {},
        methods: {
            upstep:function () {
                this.$router.push({path: '/'})
            },
            picture:function (id,type) {
                this.pictureshow=true
                if(type==1){
                    this.imgsrc='https://trillionricher-1258896139.cos.ap-tokyo.myqcloud.com/ysh_daifu_pics/'+id+'.jpg'
                }else if(type==3){
                    this.imgsrc='https://trillionricher-1258896139.cos.ap-tokyo.myqcloud.com/ysh_daichu_pics/'+id+'.jpg'
                }
            },
            golistdata:function (id) {
                this.$router.push({
                    path:'/orderdata',
                    query:{
                        id:id
                    }
                });
            },
            Currentpage:function(val){
                this.getorder_listdata(val,this.order_state)
            },
            getorder_listdata:function (page,type) {
                this.$http.post('https://www.trillionricher.com/1.0/order_list',{
                    merber_id:this.merber_id,
                    token:this.OS.token,
                    page:page,
                    order_state:type,
                },{emulateJSON:true,before:function (request) {
                        this.loding=true
                    }}).then(function(res){
                        if(res.body.success==-1){
                            this.Logout()
                        }else if(res.body.success===1){
                            this.listtotal=Number(res.body.msg)
                            this.orderlist=res.body.data
                            this.loding=false
                        }else if(res.body.success===0){
                            this.listtotal=0
                            this.orderlist=''
                            this.loding=false
                        }
                },function(res){
                    console.log(res);
                });
            }

        },
        computed: {},
        watch: {
            active:function (val) {
                this.page=0
                if(val==0){this.order_state=1}
                if(val==1){this.order_state=6}
                if(val==2){this.order_state=3}
                if(val==3){this.order_state=4}
                if(val==4){this.order_state=7}
                if(val==5){this.order_state=11}
                if (val!==0){
                    this.getorder_listdata(1,this.order_state)
                }else {
                    this.getorder_listdata(1,1)
                }
            },
        },
        mounted: function () {
            this.getorder_listdata(1,1)
            if(this.merber_id==undefined){
                this.$router.push('/login');
            }
        }
    }
</script>
<style>
    .order-item{
        display: flex;
        justify-content: space-between;
        padding: 20px 20px 5px 20px;
    }
    .order-item .order-item-icon{
        height: 70px;
        width: 80px;
    }
    .order-item .order-item-icon img{
        width: 100%;
        height: 100%;
    }
    .order-item .order-item-date{
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .order-item .order-item-date>div{
        /*border: 1px solid royalblue;*/
        height: 33%;
        font-size: 15px;
        padding-left: 20px ;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .zticon{
        color: #fff;
        padding: 0 10px;
        border-radius: 5px;
    }
</style>