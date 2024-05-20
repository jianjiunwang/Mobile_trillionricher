<template>
    <div class="sub_store">
        <div class="pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>代收訂單</b></span>
                </router-link>
            </div>
        </div>
        <div>
            <table class="order_table onebg">
                <tr>
                    <td>
                        <div>我欲代購</div>
                        <div class="colorgreen">{{robot_rmb==''?0:robot_rmb}}</div>
                    </td>
                    <td>
                        <div>匯率</div>
                        <div>{{exchange}}</div>
                    </td>

                </tr>
                <tr>
                    <td >
                        <div>總額</div>
                        <div class="colorgreen">{{(Number(robot_rmb)+service_charge)}}</div>
                    </td>
                    <td>
                        <div class="colorgreen">應付款項</div>
                        <div>NT${{Math.ceil(((Number(robot_rmb)+service_charge)*exchange))}}</div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="sub_storebody">
            <div class="sub_storeselect" style="margin-top: 30px">
                <h6>类型</h6>
                <el-select v-model="service_type" size="mini" style="border-radius:10px;width: 200px;" >
                    <el-option
                        style="font-size: 12px"
                        v-for="item in service_type_list"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <h6  v-show="service_type == 3">支付寶賬號</h6>
                <el-select  v-show="service_type == 3" v-model="zfbaccount" placeholder="支付寶帳戶" size="mini" style="border-radius:10px;width: 200px;" >
                    <el-option
                        @click="selectaccount(item.alipay_num)"
                        style="font-size: 12px"
                        v-for="item in alipay"
                        :key="item.value"
                        :label="item.alipay_name+item.alipay_num"
                        :value="item.alipay_num"
                    >
                    </el-option>
                </el-select>
                <h6>請輸入匯率</h6>
                <el-input v-model="exchange" type="Number" placeholder="請輸入匯率"   size="mini" ></el-input>
                <h6>銀行碼後五位</h6>
                <el-input v-model="bankcode" type="Number" placeholder="請輸入銀行碼後五位"   size="mini" ></el-input>
            </div>
            <div class="RMB_TWD">
                <div style="margin-right: 20px">
                    <span>欲代購點數</span>
                    <el-input v-model="robot_rmb" type="Number" placeholder="請輸入金額"   size="mini" oninput="if(value<0)value=0;" @input="inputrmb"></el-input>
                </div>
                <van-icon name="exchange" size="20px"></van-icon>
                <div style="margin-left: 20px">
                    <span>需支付款項</span>
                    <el-input  v-model="robot_twd" size="mini"  type="Number" :disabled="true"></el-input>
                </div>
            </div>

            <div class="Nextstep">
                <van-button size="small" style="background-color: #434343">返回</van-button>
                <van-button size="small" style="background-color: #ffbc00;color: #3D3D3D"  @click="sub_store" >下一步</van-button>
            </div>
        </div>

        <div v-show="loding" style="width:100%;height: 100%;z-index: 9999;position:fixed;top: 0;background-color:rgba(0,0,0,0.4)">
            <div style="position: relative;top:45%;text-align: center;width: 100%">
                <van-loading color="#fff" style="margin: 0 auto " size="40px"/>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    inject:['reload'],
    data: function () {
        return {
            store_type:'',
            loding:false,
            chaoshang:'',
            merbervip:{},
            account:[''],
            robot_rmb:'',//代储金额
            robot_twd:'',//代储台币金额
            service_charge:0,//手续费
            exchange:'',//汇率
            r_money:0,//R币余额
            alipay:[],//已认证支付宝
            zfbaccount:'請選擇支付寶帳戶',//支付宝帐号
            isconfirm:false,
            payment_method:'3',
            Czone:true,
            orderdata:{},
            sub_storebeld:false,
            bankcode:'',
            exchangelist:[],
            service_type:'3',
            service_type_list:[
                {
                    value: '3',
                    label: '代儲'
                },
                {
                    value: '5',
                    label: '代收'
                }
            ]
        }
    },
    components: {},
    methods: {

        selectaccount:function (val) {
            this.account=['']
            this.zfbaccount=val
        },

        getzhifubao:function(){
            this.$http.post('https://www.trillionricher.com/1.0/order_bank_alipay',{
                merber_id:this.OS.merber_id,
                token:this.OS.token
            },{emulateJSON:true}).then(function(res){
                if(res.body.success==-1){
                    this.Logout()
                }else{
                    this.merber_vip = res.body.data.merber_vip
                    this.merber_phone = res.body.data.merber_phone
                    this.r_money = Number(res.body.data.r_money)
                    this.alipay=res.body.data.alipay

                }
            },function(){

            });
        },
        //提交代储参数验证
        sub_store:function () {

            if(this.robot_rmb == ''){
                this.$toast({
                    message:'儲值金額不能為空',
                    type:'fail',
                    duration:1000,
                });
                return false
            }
            if(this.service_type == 3 && this.zfbaccount=="請選擇支付寶帳戶"){
                this.$toast({
                    message:'請選擇支付寶帳戶',
                    type:'fail',
                    duration:1000,
                });
                return false
            }
            if(this.exchange==""){
                this.$toast({
                    message:'請輸入匯率',
                    type:'fail',
                    duration:1000,
                });
                return false
            }
            if(this.bankcode==""){
                this.$toast({
                    message:'請輸入銀行碼後5位',
                    type:'fail',
                    duration:1000,
                });
                return false
            }
            this.sub_storeAjax()
        },
        //提交代储
        sub_storeAjax:function(){
            this.sub_storebeld=true
            //------------
            this.$http.post('https://www.trillionricher.com/1.0/elsestore', {
                merber_id: this.OS.merber_id,
                token: this.OS.token,
                bankcode:this.bankcode,
                exchange_rate: this.exchange,
                robot_rmb: this.robot_rmb,
                pay_url:this.zfbaccount,
                robot_twd: this.robot_twd ,
                service_type:this.service_type,
            }, {emulateJSON: true}).then(function (res) {
                if(res.body.success==-1){
                    this.Logout()
                }else if(res.body.success==1){
                    this.$toast({
                        message:'虛擬帳號已經發送到您的手機',
                        type:'success',
                        duration:1000,
                    });
                    this.$router.push({
                        path:'/orderdata',
                        query:{
                            id:res.body.data.order_id
                        }
                    });
                }else {
                    this.$toast({
                        message:'錯誤',
                        type:'error',
                        duration:1000,
                    });
                }
            }, function () {

            });
        },

        inputrmb:function (e) {
            this.robot_twd=Math.ceil(e*this.exchange);
        },
    },
    computed: {

    },
    watch: {
        exchange:function (val){
            this.robot_twd = Math.ceil(Number(this.robot_rmb)*val)
        }
    },
    created: function () {
        if(this.$route.query.key!== '5Luj5pS2'){
            this.$router.push({ path:'/'})
            return
        }
        this.getzhifubao()
    },

}
</script>
<style>
.van-cell__value{
    width: 60%;
}
.van-steps{
    z-index: 1000;
}


.van-password-input__security li{
    border: 1px solid #363738;
    margin-left: 2px;
}
.slide-verify{
    text-align: center;
    color: #46ce04;
}
.bottombt{
    display: flex;
    flex-direction: row-reverse;
    padding-top: 10px;
    margin-top:10px;
    border-top: 1px solid #e7e7e7
}
</style>
