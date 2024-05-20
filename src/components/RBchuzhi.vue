<template>
    <div>
        <van-nav-bar title="E幣儲值" left-arrow :fixed="true" @click-left="upstep"></van-nav-bar>
        <div style="height: 120px"></div> <!--头部占位块-->
        <van-steps :active="active" style="position: fixed;top:46px;">
            <van-step>創建E幣儲值訂單</van-step>
            <van-step>付款</van-step>
            <van-step>為您儲值</van-step>
        </van-steps>
        <div v-show="Czone">
            <van-cell-group>
                <van-field v-model="robot_rmb" placeholder="請輸入E幣儲值金額" label="儲值金額" />
                <van-cell title="手續費" >0&nbsp;&nbsp;人民幣</van-cell>
                <van-cell title="總額" >{{robot_rmb}}&nbsp;&nbsp;人民幣</van-cell>
                <van-cell title="銀行匯率" >{{exchange}}&nbsp;&nbsp;</van-cell>
                <van-cell title="應付款項" >{{Math.ceil((robot_rmb*exchange))}}&nbsp;&nbsp;新台幣</van-cell>
            </van-cell-group>
            <h5 style="padding-left: 15px;margin:10px 0;">請選擇付款方式</h5>
            <div style="font-size: 14px">
                <div style="padding: 10px;display: flex;justify-content: space-between;" @click="payment_method = '4'">
                    <div style="display: flex;align-items: center">
                        <img src="../assets/image/UBOT.png" alt="" style="height: 30px;width: 30px">&nbsp;&nbsp;
                        <div>
                            <p>803 聯邦銀行</p>
                            <p>支援全台各家銀行轉入，<span style="color: red">無每日三萬元限制</span></p>
                        </div>
                    </div>
                    <van-radio-group v-model="payment_method">
                        <van-radio name="4" checked-color="#4b0"></van-radio>
                    </van-radio-group>
                </div>
                <!--<div style="padding: 10px;display: flex;justify-content: space-between;" @click="payment_method = '1'">-->
                    <!--<div style="display: flex;align-items: center">-->
                        <!--<img src="../assets/image/808.png" alt="" style="height: 30px;width: 30px">&nbsp;&nbsp;-->
                        <!--<div>-->
                            <!--<p>808 玉山銀行</p>-->
                            <!--<p>支援全台各家銀行轉入，<span style="color: red">無每日三萬元限制</span></p>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<van-radio-group v-model="payment_method">-->
                        <!--<van-radio name="1" checked-color="#4b0"></van-radio>-->
                    <!--</van-radio-group>-->
                <!--</div>-->
                <div style="padding: 10px;display: flex;justify-content: space-between;align-items: center" @click="payment_method = '2'">
                    <div style="display: flex;align-items: center">
                        <img src="../assets/image/711-icon.png" alt="" style="height: 30px;width: 30px">&nbsp;&nbsp;
                        <div>
                            <p>7-11/全家/萊爾富/OK超商</p>
                            <p style="font-size: 14px;color: #f90">收取30元的手續費，不足30臺幣按30臺幣收取</p>
                        </div>
                    </div>
                    <van-radio-group v-model="payment_method">
                        <van-radio name="2" checked-color="#4b0"></van-radio>
                    </van-radio-group>
                </div>
            </div>
            <div class="Nextstep">
                <van-button type="primary" size="large" @click="recharge_r">下一步</van-button>
            </div>
        </div>
        <div v-show="!Czone">
            <div style="font-size: 15px">
                <div class="orderdata_head" >
                    <span><b>訂單狀態</b></span>
                    <span class="zhuantai"  style="background:#004bd9" v-if="orderdata.order_state==3">等待付款</span>
                    <!--<span class="zhuantai" style="background:#FFA801">等待付款</span>-->

                </div>
                <div class="orderdata_body">
                    <div>
                        <span>訂單編號</span>
                        <span>{{orderdata.order_num}}</span>
                    </div>
                    <div>
                        <span>匯率</span>
                        <span style="color: #19be6b"><b>{{orderdata.exchange_rate}}</b></span>
                    </div>
                    <div>
                        <span>應付款(新台幣)</span>
                        <span style="color: #ed3f14"><b>{{orderdata.robot_twd}}</b></span>
                    </div>
                    <div>
                        <span>交易創建時間</span>
                        <span>{{orderdata.create_time|convTimehms}}</span>
                    </div>
                    <div>
                        <span>虛擬帳戶</span>
                        <span>{{orderdata.payment_account}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="loding" style="width:100%;height: 100%;z-index: 9999;position:fixed;top: 0;background-color:rgba(0,0,0,0.4)">
            <div style="position: relative;top:45%;text-align: center;width: 100%">
                <van-loading color="#fff" style="margin: 0 auto " size="40px"/>
            </div>
        </div>
        <div v-html="chaoshang" style="opacity: 0"></div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                merber_id:Cookies.get('merber_id'),
                active:0,
                Czone:true,
                loding:false,
                chaoshang:'',
                robot_rmb:'',//储值金额
                payment_method:'',//付款方式
                ServiceCharge:0,//手续费
                exchange:'',//汇率
                orderdata:{},
            }
        },
        components: {},
        methods: {
            getexchange:function () {
                this.$http.post('https://www.trillionricher.com/1.0/exchange',{
                    exchange_type:2,
                },{emulateJSON:true}).then(function(res){
                        this.exchange=res.body.data[0].exchange
                },function(res){
                        console.log(res);
                });
            },
            recharge_r:function () {
                var _this=this
                var re =/^\d+(\.\d+)?$/;
                if (this.robot_rmb=="" || !re.test(this.robot_rmb)) {
                    this.$toast({
                        message:'請輸入正確的儲值金額',
                        type:'fail',
                        duration:1000,
                    });
                }else if(this.payment_method==""){
                    this.$toast({
                        message:'請選擇付款方式',
                        type:'fail',
                        duration:1000,
                    });
                } else {
                    var twd= Math.ceil(this.robot_rmb * this.exchange)
                    if(this.payment_method==2 && twd>5970){
                        this.$toast({
                            message:'使用超商代付請勿超過5970元新臺幣！',
                            type:'fail',
                            duration:3000,
                        });
                    }else {
                        this.$http.post('https://www.trillionricher.com/1.0/recharge_r', {
                            merber_id: this.merber_id,
                            token: this.OS.token,
                            is_mobile: 1,
                            service_type: 2,
                            robot_rmb: this.robot_rmb,
                            robot_twd: Math.ceil(this.robot_rmb * this.exchange),
                            exchange_rate: this.exchange,
                            service_charge: 0,
                            payment_method: this.payment_method
                        }, {emulateJSON: true}).then(function (res) {
                            if (res.body.success == -1) {
                                this.Logout()
                            } else if (res.body.success == 1) {
                                if (this.payment_method == 2) {
                                    this.loding = true
                                    this.chaoshang = res.body.data
                                    window.setTimeout(function () {
                                        document.getElementById("__ecpayForm").submit();
                                    }, 100)
                                } else {
                                    this.$toast({
                                        message: '虛擬帳號已經發送到您的手機',
                                        type: 'success',
                                        duration: 1000,
                                    });
                                    this.active = 1
                                    this.orderdata = res.body.data
                                    window.setTimeout(function () {
                                        _this.$router.push({
                                            path: '/orderdata',
                                            query: {
                                                id: res.body.data.order_id
                                            }
                                        });
                                    }, 10000)
                                }
                            }
                        }, function (res) {
                            console.log(res);
                        });
                    }
                }
            },
            check_order:function () {
                this.$http.post('https://www.trillionricher.com/1.0/check_order',{
                    merber_id: this.merber_id,
                    token:this.OS.token,
                    service_type: 2
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else if(res.body.success==0){
                        this.$router.push({path:'/rbcz'})
                    }else {
                        this.$router.push({
                            path:'/orderdata',
                            query:{
                                id:res.body.data.order_id
                            }
                        });
                        this.$toast({
                            message:'您有一筆訂單未處理，請您付款或取消訂單後再下單',
                            type:'fail',
                            duration:3000,
                        });
                    }
                },function(res){
                    console.log(res);
                });
            }
        },
        computed: {},
        watch: {
            active: function (active) {
                if (active == 0) {
                    this.Czone = true
                }else if(active == 1) {
                    this.Czone = false
                }
            }
        },
        mounted: function () {
            this.$router.push('/');
        }
        //     if(this.merber_id==undefined){
        //         this.$router.push('/login');
        //     }else {
        //         this.check_order()
        //         this.getexchange()
        //     }
        // }
    }
</script>
<style>

    .van-toast--default{
        max-width: 200px !important;;
    }
</style>