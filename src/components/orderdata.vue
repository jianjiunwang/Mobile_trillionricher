<template>
    <div class="orderdata">
        <div class="pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>交易明細</b></span>
                </router-link>
            </div>
        </div>
        <table class="order_table" v-if="orderdata.service_type==3">
            <tr>
                <th >訂單編號</th>
                <th>點數代購金額</th>
                <th>轉帳手續費</th>
                <th>平台服务费</th>
            </tr>
             <tr>
                <td>{{orderdata.order_num}}</td>
                <td>{{orderdata.robot_rmb}}</td>
                <td>{{orderdata.service_charge}}</td>
                <td>0</td>
            </tr>
            <tr>
                <th v-if="orderdata.payment_method==2 || orderdata.withhold_type ==2">超商手續費</th>
                <th>總額</th>
                <th colspan="3">應付款項</th>
            </tr>
           
            <tr>
                <td v-if="orderdata.payment_method==2 || orderdata.withhold_type ==2">$ 30 / $ {{orderdata.platform_serve}}</td>
                <td>￥{{Number(orderdata.service_charge)+Number(orderdata.robot_rmb)}}</td>
                <td colspan="3">{{orderdata.robot_twd}}</td>
            </tr>
        </table>

        <table class="order_table" v-if="orderdata.service_type==1">
            <tr>
                <th :colspan="orderdata.payment_method==2 || orderdata.withhold_type==2?'5':4" >交易鏈接</th>
            </tr>
            <tr>
                <th>訂單號</th>
                <th>代付金額</th>
                <th v-if="orderdata.payment_method==2 || orderdata.withhold_type == 2">超商手續費</th>
                <th >平台手續費</th>
                <th>總金額</th>
            </tr>
            <tr>
                <td :colspan="orderdata.payment_method==2 || orderdata.withhold_type==2?'5':4">{{orderdata.pay_url.length>80?orderdata.pay_url.slice(0,50)+'...':orderdata.pay_url}}</td>
            </tr>
            <tr>
                <td>{{orderdata.order_num}}</td>
                <td class="colorgreen">￥{{ orderdata.robot_rmb}}</td>
                <td v-if="orderdata.payment_method==2 || orderdata.withhold_type">$ 30</td>
                <td>$ {{orderdata.platform_serve}}</td>
                <td class="colorOrange">${{orderdata.robot_twd}}</td>
            </tr>
        </table>
        <table class="order_table" v-if="orderdata.service_type==1" >
            <tr>
                <th>代付商品名稱</th>
                <th>金額</th>
            </tr>
            <tr v-for="(val,i) in orderdata.product_name" :key="i">
                <td>{{val.product_name}}</td>
                <td>{{val.product_price}}</td>
            </tr>
        </table>

        <table class="order_table">
            <tr>
                <th>付款方式</th>
                <th v-if="orderdata.payment_method==1" colspan="2">玉山銀行(808)</th>
                <th v-else-if="orderdata.payment_method==2" colspan="2">超商代碼</th>
                <th v-else-if="orderdata.payment_method==3" colspan="2">當前餘額</th>
                <th v-else-if="orderdata.payment_method==6" colspan="2">彰化銀行(009)</th>
                <th v-else-if="orderdata.payment_method==10" colspan="2">陽信銀行(108)</th>
                <th v-else-if="orderdata.payment_method==7" colspan="2">國泰世華銀行(013)</th>
                <th v-else-if="orderdata.payment_method==9" colspan="2">中國信託(822)</th>
                <th v-else-if="orderdata.payment_method==8" colspan="2">星展銀行(810)</th>
                <th v-else-if="orderdata.payment_method==5" colspan="2">補款金額</th>
                <th v-else-if="orderdata.payment_method==5" colspan="2">補款方式</th>
                <th v-else>未選擇付款方式</th>
            </tr>
             <tr >
                <td>
                    <span v-if="orderdata.payment_method==1 || orderdata.payment_method==6 || orderdata.payment_method==4 || orderdata.payment_method==7 || orderdata.payment_method==9 || orderdata.payment_method==10">虛擬帳號</span>
                    <span v-if="orderdata.payment_method==2">超商付款</span>
                    <span v-if="orderdata.payment_method==3">錢包餘額</span>
                    <span v-if="orderdata.payment_method==5">錢包餘額 + 補款</span>
                    <span v-if="orderdata.payment_method==null &&  orderdata.order_state!=0">您尚未選擇付款方式</span>
                    <span v-if="orderdata.payment_method==null &&  orderdata.order_state==0">您的訂單正在處理中 !</span>
                </td>
                <td colspan="2">
                    <span v-if="orderdata.payment_method==1 || orderdata.payment_method==6 || orderdata.payment_method==4 || orderdata.payment_method==7 || orderdata.payment_method==10"> {{orderdata.payment_account}}</span>

                    <span v-if="orderdata.payment_method==2">{{orderdata.payment_account}}</span>
                    <span v-if="orderdata.payment_method==3">￥{{(orderdata.r_money*1).toFixed(2)}}</span>
                    <span v-if="orderdata.payment_method==5">${{orderdata.withhold_twd}} 新臺幣</span>
                    <span v-if="orderdata.payment_method==null &&  orderdata.order_state !==0"  @click=" $router.push({path:'/substitute' })">前往選擇付款</span>
                </td >
              <td v-if="orderdata.payment_method==5">

                <span v-if="orderdata.withhold_type==1">玉山銀行</span>
                <span v-else-if="orderdata.withhold_type==2">超商補款</span>
                <span v-else-if="orderdata.withhold_type==4">聯邦銀行</span>
                <span v-else-if="orderdata.withhold_type==7">國泰世華銀行</span>
                <span v-else-if="orderdata.withhold_type==9">中國信託</span>
                <span v-else-if="orderdata.withhold_type==10">陽信銀行</span>
                <span v-else-if="orderdata.withhold_type==8">星展銀行</span>
                <span v-else-if="orderdata.withhold_type==6">彰化銀行</span>
                <br>
                <span v-if="orderdata.payment_method==5">
                    <span v-if="orderdata.withhold_type==2">超商代碼 {{ orderdata.payment_account }}</span>
                    <span v-else>補款帳戶  {{ orderdata.payment_account }}</span>
                </span>
              </td>
            </tr>
            <tr >
                <th>交易創建時間</th>
                <th>最後處理時間</th>
                <th colspan="2">訂單狀態</th>
            </tr >
           
            <tr>
                <td>{{orderdata.create_time|convTimehms}}</td>
                <td>{{orderdata.update_time|convTimehms}}</td>
                <td :colspan="orderdata.payment_method==5?2:1">
                    <span class="zhuantai" v-if="orderdata.order_state==0" style="color:#FFA801" >訂單處理中</span>
                    <span class="zhuantai" v-else-if="orderdata.order_state==3" style="color:#FFA801" >等待付款</span>
                    <span class="zhuantai" v-else-if="orderdata.order_state==4 || orderdata.order_state==33 || orderdata.order_state==34" style="color:#004bd9">
                        <span v-if="orderdata.service_type==1">代付中</span>
                        <span v-if="orderdata.service_type==2">儲值中</span>
                        <span v-if="orderdata.service_type==3">處理中</span>
                        <span v-if="orderdata.service_type==4">提現中</span>
                    </span>
                    <span class="zhuantai" v-else-if="orderdata.order_state==6" style="color:#49B85C">交易成功</span>
                    <span class="zhuantai" v-else-if="orderdata.order_state==30 || orderdata.order_state==31" style="color:#efb300">已匯款</span>
                    <span class="zhuantai" v-else-if="orderdata.order_state==7" style="color:#777A86">訂單已取消</span>
                    <span class="zhuantai" v-else-if="orderdata.order_state==5 ||orderdata.order_state==8 ||orderdata.order_state==9 ||orderdata.order_state==10 || orderdata.order_state==17" style="color:#ff0004">
                        <span v-if="orderdata.service_type==1">代付失敗</span>
                        <span v-if="orderdata.service_type==2">儲值失敗</span>
                        <span v-if="orderdata.service_type==3">處理失敗</span>
                        <span v-if="orderdata.service_type==4">提現失敗</span>
                    </span>
                    <span class="zhuantai" v-else-if="orderdata.order_state==11" style="color:#a66cb9">退款成功</span>
                    <span class="zhuantai" v-else-if="orderdata.order_state==12" style="color:#f62400">申请退款中</span>
                    <span class="zhuantai" v-else-if="orderdata.order_state==41" style="color:#f62400">匯款帳號不符</span>
                    <span class="zhuantai" v-else-if="orderdata.order_state==13" style="color:#49B85C">單筆退款</span>
                    <span class="zhuantai" v-else-if="orderdata.order_state==14 || orderdata.order_state==15 || orderdata.order_state==16" style="color:#FF5000">請做驗證</span>
                    <span class="zhuantai" v-else-if="orderdata.order_state==21" style="color:#004bd9">處理中</span>
                    <span class="zhuantai" v-else style="color:#004bd9">處理中</span>
                </td>
            </tr>
        </table>
        <div class="orderdata_foot">
            <div class="order_time">
                <span v-if="orderdata.service_type==3">
                    <span v-if="orderdata.payment_method == 2  || orderdata.withhold_type == 2">
                        應付新台幣計算公式：( ￥{{Number(orderdata.robot_rmb)}}+￥{{Number(orderdata.service_charge)}}  ) X {{orderdata.exchange_rate}} + $30 = ${{orderdata.robot_twd}} TWD
                    </span>
                    <span v-else>
                        應付新台幣計算公式：( ￥{{Number(orderdata.robot_rmb)}}+￥{{Number(orderdata.service_charge)}} ) X {{orderdata.exchange_rate}}  = ${{orderdata.robot_twd}} TWD
                    </span>
                </span>
                <div v-else>
                      <span v-if="orderdata.payment_method == 2  || orderdata.withhold_type == 2">
                        應付新台幣計算公式：( ￥{{Number(orderdata.robot_rmb)}}+￥{{Number(orderdata.service_charge)}}  ) X {{orderdata.exchange_rate}} + $30 = ${{orderdata.robot_twd}} TWD
                    </span>
                    <span v-else>
                         應付新台幣計算公式：(￥{{(orderdata.robot_rmb*1).toFixed(1) }} + ￥{{orderdata.platform_serve}}) * {{orderdata.exchange_rate}}   = ${{orderdata.robot_twd}} TWD
                    </span>
                </div>
                <div v-if="orderdata.order_state==6 && orderdata.service_type==1">
                    <el-button  type="danger" style="padding:5px 10px" @click="show =  true" >申請退款</el-button>
                </div>
                <!--<div v-if="orderdata.order_state==3 || orderdata.order_state==0 " style="margin-top: 20px">-->
                    <!--<el-button  type="danger" style="padding:5px 10px" @click="cancel_order">取消訂單</el-button>-->
                <!--</div>-->
            </div>
            <div class="orderdata_body">
                <p style="padding: 10px" v-if="orderdata.order_state==0">
                    您目前排在訂單處理中的第<span style="color: #FE0000">{{orderdata.line}}</span>位，預計處理時間 <span style="color: #FE0000">{{Transformation(orderdata.line)}}</span>
                </p>
                <p v-if="orderdata.order_state==11 || orderdata.order_state==13" style="padding: 10px;line-height: 30px;color: red">
                    退款備註 : 此交易金额 ￥ {{orderdata.refund_rmb}} 已退至E幣錢包，詳情請查看E幣交易明細。
                </p>
                <p v-if="orderdata.order_state==10 || orderdata.order_state==9 || orderdata.order_state==8" style="padding: 10px;line-height: 30px;color: red">
                    代付失敗原因 : 您申請的代付因付款超時或被賣家主動關閉導致代付失敗，請取消訂單重新提交，退款將會退至E幣錢包。
                </p>
                <p v-if="orderdata.order_state==17" style="padding: 10px;line-height: 30px;color: red">
                    代付失敗原因 : 您申請的代付因淘寶的因素被禁止代付，可能因為您在購買虛擬物品或近期淘寶不允許的交易，請取消訂單重新提交，退款將會退至E幣錢包。
                </p>

            </div>
            <div>
                <h6>訂單留言</h6>
                <div>
                    <span v-if="orderdata.remarks!==null">{{orderdata.remarks}}</span>
                    <span v-else>暫無留言！</span>
                </div>
            </div>
        </div>
        <!--<div>-->
            <!--<div class="orderdata_body">-->
                <!--<div class="commodity_list" v-for="(val,i) in orderdata.product_name" :key="i" >-->
                    <!--<div style="width: 70%">{{val.product_name}}</div>-->
                    <!--<div style="width: 30%;color: #f90;text-align: right">{{val.product_price}}元</div>-->
                <!--</div>-->
                <!--<div class="commodity_list" v-if="orderdata.service_type==3">-->
                    <!--<div>代購金額</div>-->
                    <!--<div style="color: #f90">{{orderdata.robot_rmb}}元</div>-->
                <!--</div>-->
                <!--<div class="commodity_list" v-if="orderdata.service_type==3">-->
                    <!--<div>支付寶轉帳手續費</div>-->
                    <!--<div style="color: #f90">￥{{orderdata.service_charge}}</div>-->
                <!--</div>-->
                <!--<div class="commodity_list" v-if="orderdata.service_type==3">-->
                    <!--<div>總額</div>-->
                    <!--<div style="color: #f90">{{Number(orderdata.robot_rmb)+Number(orderdata.service_charge)}}元</div>-->
                <!--</div>-->
                <!--<div class="commodity_list" v-if="orderdata.service_type==3">-->
                    <!--<div>平台服務費</div>-->
                    <!--<div style="color: #f90">${{orderdata.platform_serve}}</div>-->
                <!--</div>-->
                <!--<div class="commodity_list" v-if="orderdata.service_type==3">-->
                    <!--<div v-if="orderdata.payment_method==2 || orderdata.withhold_type ==2">超商手續費</div>-->
                    <!--<div style="color: #f90">$30</div>-->
                <!--</div>-->
                <!--<div class="commodity_list" v-if="orderdata.service_type==3">-->
                    <!--<div>訂單合計金額</div>-->
                    <!--<div style="color: #f90">{{orderdata.robot_twd}}</div>-->
                <!--</div>-->
                <!--<div class="commodity_list" v-else>-->
                    <!--<div>訂單合計金額</div>-->
                    <!--<div style="color: #f90">{{orderdata.robot_rmb}}元</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div>-->
            <!--<div class="orderdata_head">-->
                <!--<span><b>付款方式</b></span>-->
                <!--<span v-if="orderdata.payment_method==1">玉山銀行</span>-->
                <!--<span v-if="orderdata.payment_method==4">聯邦銀行</span>-->
                <!--<span v-if="orderdata.payment_method==7">國泰世華銀行</span>-->
                <!--<span v-if="orderdata.payment_method==6">彰化銀行</span>-->
                <!--<span v-if="orderdata.payment_method==2">超商付款</span>-->
                <!--<span v-if="orderdata.payment_method==3">E幣餘額</span>-->
                <!--<span v-if="orderdata.payment_method==5">E幣餘額 + 補款</span>-->
                <!--<span v-if="orderdata.payment_method==null &&  orderdata.order_state!=0">您尚未選擇付款方式</span>-->
                <!--<span v-if="orderdata.payment_method==null &&  orderdata.order_state==0">您的訂單正在處理中 !</span>-->
            <!--</div>-->
            <!--<div class="orderdata_body">-->
                <!--<div v-if="orderdata.payment_method==1 || orderdata.payment_method==4 || orderdata.payment_method==6 || orderdata.payment_method==7">-->
                    <!--<span>您的虛擬帳戶</span>-->
                    <!--<span>{{orderdata.payment_account}}</span>-->
                <!--</div>-->
                <!--<div v-if="orderdata.payment_method==2">-->
                    <!--<span>您的超商代碼</span>-->
                    <!--<span>{{orderdata.payment_account}}</span>-->
                <!--</div>-->
                <!--<div v-if="orderdata.payment_method==3">-->
                    <!--<span>您的E幣餘額</span>-->
                    <!--<span>{{orderdata.r_money}}</span>-->
                <!--</div>-->
                <!--<div v-if="orderdata.payment_method==5">-->
                    <!--<span>補款金額(新臺幣)</span>-->
                    <!--<span>${{orderdata.withhold_twd}}</span>-->
                <!--</div>-->
                <!--<div v-if="orderdata.payment_method==5">-->
                    <!--<span>補款方式</span>-->
                    <!--<span v-if="orderdata.withhold_type==1">玉山銀行</span>-->
                    <!--<span v-if="orderdata.withhold_type==7">國泰世華銀行</span>-->
                    <!--<span v-if="orderdata.withhold_type==2">超商補款</span>-->
                    <!--<span v-if="orderdata.withhold_type==4">聯邦銀行</span>-->
                    <!--<span v-if="orderdata.withhold_type==6">彰化銀行</span>-->
                <!--</div>-->
                <!--<div v-if="orderdata.payment_method==5">-->
                    <!--<span>補款帳戶</span>-->
                    <!--<span>{{orderdata.payment_account}}</span>-->
                <!--</div>-->
                <!--<div v-else-if="orderdata.payment_method==null && orderdata.order_state!=0">-->
                    <!--<p style="color: #1989fa" class="godaifu" @click="gosubStitute">前往選擇付款</p>-->
                <!--</div>-->
                <!--<div v-else-if="orderdata.payment_method==null &&  orderdata.order_state==0">-->
                    <!--<p style="color: #1989fa" >請耐心等待。。。 ^ ^</p>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <div class="big_btn"  v-if="orderdata.order_state==6 && orderdata.service_type==1">
            <van-button type="danger" style="width: 100%" @click="show = true">申請退款</van-button>
        </div>
        <div class="big_btn"  v-if="orderdata.order_state==3 || orderdata.order_state==0">
            <van-button type="danger"  @click="cancel_order">取消訂單</van-button>
        </div>
        <van-dialog
                v-model="show"
                show-cancel-button
                @confirm="refundOrder"
        >
            <van-picker :columns="columns" @change="onChange" />
        </van-dialog>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                orderdata:'',
                show:false,
                merber_id:Cookies.get('merber_id'),
                refund_reason:'我不想買了',
                columns: ['我不想買了', '賣家缺貨', '規格錯誤，重新買', '其他原因']
            }
        },
        components: {},
        methods: {
            Transformation:function(line){
                line=line-1
                var s=parseInt((line*10+120))
                var h=Math.floor(s/60);
                if(s>60){
                    return h+'分'+(s%60)+'秒'
                }else {
                    return s+'秒';
                }
            },
            gosubStitute:function(){
                this.$router.push({
                    path:'/daifu',
                    query:{
                        Unfulfilled_order:true
                    }
                });
            },
            getorderDetails:function () {
                var order_id=this.$route.query.id
                this.$http.post('https://www.trillionricher.com/1.0/order_details',{
                    order_id:order_id,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success===1){
                        this.orderdata=res.body.data[0]
                    }
                },function(res){
                    console.log(res);
                });
            },
            onChange:function (picker, value, index) {
                this.refund_reason=value
            },
            refundOrder:function () {
                var order_id=this.$route.query.id
                this.$http.post('https://www.trillionricher.com/1.0/refund_order',{
                    merber_id:this.merber_id,
                    token:this.OS.token,
                    order_id:order_id,
                    refund_reason:this.refund_reason,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else if(res.body.success===1){
                        this.$toast({
                            message:'退款成功，請查收E幣餘額！',
                            type:'success',
                            duration:1500,
                        });
                    }else if(res.body.success===2){
                        this.$toast({
                            message:'退款申請已提交，請確認淘寶是否退款!',
                            type:'success',
                            duration:1500,
                        });
                    }else {
                        this.$toast({
                            message:'退款申請失敗，請確認您的網路狀態後再試。',
                            type:'fail',
                            duration:1500,
                        });
                    }
                },function(res){
                    console.log(res);
                });
            },
            cancel_order:function () {
                this.$dialog.alert({
                    message: '您將取消該筆訂單！',
                    showCancelButton:true,
                    confirmButtonText:'確認',
                }).then(() => {
                    var order_id=this.$route.query.id
                    this.$http.post('https://www.trillionricher.com/1.0/cancel_order',{
                        order_id:order_id,
                    },{emulateJSON:true}).then(function(res){
                        if(res.body.success===1){
                            this.$toast({
                                message:'訂單已取消！',
                                type:'success',
                                duration:1500,
                            });
                            this.$router.push({path:'/'})
                        }else {
                            this.$toast({
                                message:'訂單取消失敗，請聯繫客服處理!',
                                type:'fail',
                                duration:1500,
                            });
                        }
                    },function(res){
                        console.log(res);
                    });
                }).catch(() => {
                    // on cancel
                });
            },
            uporderdata:function(){
                var order_id=this.$route.query.id
                this.$http.post('https://www.trillionricher.com/1.0/order_details',{
                    order_id:order_id,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success===1){
                        this.orderdata=res.body.data[0]
                    }
                },function(res){
                    console.log(res);
                });
            },
        },
        computed: {},
        watch: {},
        mounted: function () {
            var _this=this
            if(this.merber_id==undefined){
                this.$router.push('/login');
            }else {
                this.getorderDetails()
                window.setInterval(() => {
                    setTimeout(_this.uporderdata(),0)
                }, 30000)
            }
        }
    }
</script>
