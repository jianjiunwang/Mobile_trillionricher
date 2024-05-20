<template>
    <div class="orderDeta_zb">
        <div class="pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>訂單明細</b></span>
                </router-link>
            </div>
        </div>
        <table class="order_table" >
            <tr>
                <th>訂單號</th>
                <th>商品名稱</th>
            </tr>
            <tr>
                <th>平台帳號</th>
                <th>應付款項</th>
            </tr>
            <tr >
                <td >{{orderdata.order_num}}</td>
                <td v-if="orderdata.order_type == '1'">鬥魚直播</td>
                <td v-if="orderdata.order_type == '2'">虎牙直播</td>
                <td v-if="orderdata.order_type == '3'">抖音直播</td>
                <td v-if="orderdata.order_type == '4'">快手直播</td>
            </tr>
            <tr>
                <td >{{orderdata.other_account}}</td>
                <td >NT$ {{orderdata.order_twd}}</td>
            </tr>

        </table>
        <table class="order_table" >
            <tr>
                <th>付款方式</th>
                <th>
                    <span v-if="orderdata.payment_method==1 || orderdata.payment_method==6 || orderdata.payment_method==4 || orderdata.payment_method==9">虛擬帳號</span>
                    <span v-if="orderdata.payment_method==2">超商付款</span>
                    <span v-if="orderdata.payment_method==3">錢包餘額</span>
                    <span v-if="orderdata.payment_method==5">錢包餘額 + 補款</span>
                </th>

            </tr>
            <tr>
                <th>交易創建時間</th>
                <th>交易狀態</th>
            </tr>
            <tr >
                <td>
                    <span v-if="orderdata.payment_method==9">中國信託(822) </span>
                    <span v-if="orderdata.payment_method==8">星展銀行(810) </span>
                    <span v-if="orderdata.payment_method==2">超商付款</span>
                    <span v-if="orderdata.payment_method==3">錢包餘額</span>
                    <span v-if="orderdata.payment_method==5">錢包餘額 + 補款</span>
                </td>
                <td>
                    <span v-if="orderdata.payment_method==9 || orderdata.payment_method==8">{{orderdata.payment_account}}</span>
                    <span  v-if="orderdata.payment_method==2">超商代碼 : {{orderdata.payment_account}}</span>
                </td>
            </tr>
            <tr>
                <td >{{orderdata.create_time | convTimehms}}</td>
                <td>
                    <span  v-if="orderdata.order_state==3" style="color:#FFA801">等待匯款</span>
                    <span  v-if="orderdata.order_state==4" style="color:#004bd9">處理中</span>
                    <span  v-if="orderdata.order_state==6" style="color:#49ff00">已完成</span>
                    <span  v-if="orderdata.order_state==7" style="color:#ff5854">已取消</span>
                    <span  v-if="orderdata.order_state==10" style="color:#ff0017">訂單失敗</span>
                </td>
            </tr>
        </table>
        <div style="padding: 10px">
            <van-button type="danger" block color="#e01010" @click="cancel_platorder">取消訂單</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                orderdata:{}
            }
        },
        components: {},
        methods: {
            getorderdata_zb(id){
                this.$http.post('https://www.trillionricher.com/1.0/GetPlat/',{
                    merber_id: this.OS.merber_id,
                    token:this.OS.token,
                    pid:id
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }
                    if(res.body.success==1){
                        this.orderdata =  res.body.data
                    }
                },function(res){
                    console.log(res);
                });
            },
            cancel_platorder(){
                this.$dialog.alert({
                    message: '您將取消該筆訂單！是否繼續?',
                    showCancelButton:true,
                    confirmButtonText:'確認',
                }).then(() => {
                    this.$http.post('https://www.trillionricher.com/1.0/cancel_platorder/',{
                        merber_id: this.OS.merber_id,
                        token:this.OS.token,
                        pid:this.orderdata.pid
                    },{emulateJSON:true}).then(function(res){
                        if(res.body.success===1){
                            this.$toast({
                                message:'訂單已取消！',
                                type:'success',
                                duration:1500,
                            });
                            this.getorderdata_zb(this.orderdata.pid)
                        }else {

                        }
                    },function(res){
                        console.log(res);
                    });
                }).catch(() => {
                    // on cancel
                });
            }
        },
        computed: {},
        watch: {},
        mounted: function () {
            var id=this.$route.query.id
            this.getorderdata_zb(id)
        }
    }
</script>
