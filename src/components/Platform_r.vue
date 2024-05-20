<template>
    <div class="platform_r">
        <div class="pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>申請訂單</b></span>
                </router-link>
            </div>
        </div>
        <div class="Platform_r_type">
            <h5>選擇商品</h5>
            <ul>
                <li v-for="(item,i) in Platform_r_type " :key="i" :class="{'select_type':selectp_type==i}"  @click="selectp_type = i;" >
                    <img :src="item.img" alt="">
                    <div>
                        <span>{{item.text}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="Recharge_Quantity">
            <h5>選擇面額</h5>
            <ul v-if="selectp_type == 0">
                <li v-for="(item,i) in douyu" :key="i" :class="{'select_type':Quantity_type==i}" @click="Quantity = item.num;Quantity_type=i">
                    <span>
                        <span>{{item.text}}</span>
                        <span>鱼翅</span>
                    </span>
                    <span >NT$ {{item.num}}</span>
                </li>
            </ul>
            <ul v-if="selectp_type == 1">
                <li v-for="(item,i) in huya" :key="i" :class="{'select_type':Quantity_type==i}" @click="Quantity = item.num;Quantity_type=i">
                    <span>
                        <span>{{item.text}}</span>
                        <span>虎牙幣</span>
                    </span>
                    <span >NT$ {{item.num}}</span>
                </li>
            </ul>
            <ul v-if="selectp_type == 2">
                <li v-for="(item,i) in douyin" :key="i" :class="{'select_type':Quantity_type==i}" @click="Quantity = item.num;Quantity_type=i">
                    <span>
                        <span>{{item.text}}</span>
                        <span>抖幣</span>
                    </span>
                    <span >NT$ {{item.num}}</span>
                </li>
            </ul>
            <ul v-if="selectp_type == 3">
                <li v-for="(item,i) in kuaishou" :key="i" :class="{'select_type':Quantity_type==i}" @click="Quantity = item.num;Quantity_type=i">
                    <span>
                        <span>{{item.text}}</span>
                        <span>快幣</span>
                    </span>
                    <span >NT$ {{item.num}}</span>
                </li>
            </ul>
            <h5>選擇數量</h5>
            <van-stepper v-model="Recharge_Num" integer />
            <h5>平台帳號</h5>
            <van-field
                    placeholder="請輸入平台帳號"
                    lable="姓名"
                    v-model="other_account"
            >
            </van-field>
            <h5>付款方式</h5>
            <div  @click="payment_method = '9'" style="display: flex;align-items: flex-start;">
                <van-radio-group v-model="payment_method" style="margin-top:8px">
                    <van-radio name="9" checked-color="#4b0"></van-radio>
                </van-radio-group>
                <div style="color: #ffffff;font-size: 14px;margin-left: 10px">
                    <p >822 中國信託</p>
                    <div v-show="payment_method == '9'" >
                      <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>
                      <p>若轉帳後４８小時未入帳請與我們聯絡。</p>
                      <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>
                      <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>
                      <van-field
                        v-show="payment_method == '9'"
                        style="padding: 10px 0"
                        placeholder="請輸入匯款帳號後五碼"
                        v-model="bankcode"
                      >
                    </van-field>
                  </div>
                </div>
            </div>
            <!--<div  @click="payment_method = '8'" style="display: flex;align-items: flex-start;margin: 15px 0">-->
                <!--<van-radio-group v-model="payment_method" style="margin-top:8px">-->
                    <!--<van-radio name="8" checked-color="#4b0"></van-radio>-->
                <!--</van-radio-group>-->
                <!--<div style="color: #ffffff;font-size: 14px;margin-left: 10px">-->
                    <!--<p >810 星展銀行</p>-->
                    <!--<van-field-->
                            <!--v-show="payment_method == '8'"-->
                            <!--placeholder="請輸入匯款帳號後五碼"-->
                            <!--v-model="bankcode"-->
                    <!--&gt;-->
                    <!--</van-field>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div  @click="payment_method = '2'" style="display: flex;align-items: flex-start;">-->
                <!--<van-radio-group v-model="payment_method" style="margin-top:8px">-->
                    <!--<van-radio name="2" checked-color="#4b0"></van-radio>-->
                <!--</van-radio-group>-->
                <!--<div  style="color: #ffffff;font-size: 14px;margin-left: 10px">-->
                    <!--<p>7-11/全家/萊爾富/OK超商</p>-->
                    <!--<p>收30元的手續費，不足30臺幣按30臺幣收取</p>-->
                    <!--<p>使用超商付款不能超過5970元新台幣</p>-->
                <!--</div>-->
            <!--</div>-->


            <div class="total">
                <span>總計 : <span style="color: #FE0000">NT$ {{Quantity * Recharge_Num}}</span></span>
                <van-button type="primary" block  @click="subRecharge_r">立即提交</van-button>
            </div>

        </div>
        <div v-html="chaoshang" style="opacity: 0"></div>

    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                Platform_r_type:[
                    {text:'鬥魚直播',img:require('../assets/image/douyu.png')},
                    {text:'虎牙直播',img:require('../assets/image/huyalogo.png')}  ,
                    {text:'抖音直播',img:require('../assets/image/douyinl.png')}  ,
                    {text:'快手直播',img:require('../assets/image/kuaishou.png')}
                ],
                douyu:[
                    {text:"100",num:460},
                    {text:"500",num:2300},
                    {text:"1000",num:4600},
                    {text:"10000",num:46000}
                ],
                huya:[
                    {text:"100",num:460},
                    {text:"500",num:2300},
                    {text:"1000",num:4600},
                    {text:"10000",num:46000}
                ],
                douyin:[
                    {text:"1000",num:460},
                    {text:"5000",num:2300},
                    {text:"10000",num:4600},
                    {text:"100000",num:46000}
                ],
                kuaishou:[
                    {text:"1000",num:460},
                    {text:"5000",num:2300},
                    {text:"10000",num:4600},
                    {text:"100000",num:46000}
                ],
                selectp_type:0,
                Quantity:470,
                Quantity_type:0,
                Recharge_Num:'',
                other_account:'',
                payment_method:'9',
                bankcode:'',
                chaoshang:'',
            }
        },
        components: {},
        methods: {
            subRecharge_r(){
                if(this.payment_method!=2 && this.bankcode.length !== 5){
                    this.$toast({
                        message:'請輸入匯款銀行後五位！',
                        type:'fail',
                        duration:3000,
                    });
                    return false
                }
                var product_name = ''
                var type = ''
                if(this.selectp_type == 0){product_name='鱼翅',type = 4}
                if(this.selectp_type == 1){product_name='虎牙幣',type = 3}
                if(this.selectp_type == 2){product_name='抖幣',type = 1}
                if(this.selectp_type == 3){product_name='快幣',type = 2}
                const loading = this.$toast.loading({
                    message:'正在提交',
                    forbidClick: true,
                    duration:0
                });
                this.$http.post('https://www.trillionricher.com/1.0/CreatePlatfrom/',{
                    merber_id: this.OS.merber_id,
                    token:this.OS.token,
                    order_type:this.selectp_type+1,
                    product_name:product_name,
                    order_rmb:this.Quantity * this.Recharge_Num /4.6,
                    order_twd:this.Quantity * this.Recharge_Num,
                    payment_method:this.payment_method,
                    bankcode:this.bankcode,
                    amount:this.Recharge_Num,
                    other_account:this.other_account
                },{emulateJSON:true}).then(function(res){
                    loading.clear();
                    if(res.body.success==-1){
                        this.Logout()
                    }
                    if(res.body.success==1){
                        if(this.payment_method==2){
                            this.chaoshang=res.body.data
                            window.setTimeout(function () {
                                document.getElementById("__ecpayForm").submit();
                            },100)
                            return false
                        }
                        this.$toast({
                            message:'訂單已提交，請稍後',
                            type:'success',
                            duration:1000,
                        });
                        this.$router.push({
                            path:'/order_zb',
                            query:{
                                id:res.body.data.pid
                            }
                        });
                    }else {
                        this.$toast({
                            message:'網絡錯誤！',
                            type:'fail',
                            duration:3000,
                        });
                    }
                },function(res){
                    console.log(res);
                });
            },
            history_platorder(){
                this.$http.post('https://www.trillionricher.com/1.0/history_platorder/',{
                    merber_id: this.OS.merber_id,
                    token:this.OS.token,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }
                    if(res.body.success==1){
                        this.$toast({
                            message:'您還有一筆未完成付款訂單',
                            type:'fail',
                            duration:1000,
                        });
                        this.$router.push({
                            path:'/order_zb',
                            query:{
                                id:res.body.data.pid
                            }
                        });
                    }
                },function(res){
                    console.log(res);
                });
            },
            getuserdata(){
                this.$http.post('https://www.trillionricher.com/1.0/order_bank_alipay',{
                    merber_id:this.OS.merber_id,
                    token:this.OS.token,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.data.authentication !== '3'){
                        this.$toast({
                            message:'請先完成身份認證',
                            type:'fail',
                            duration:1000,
                        });
                        this.$router.push({path: '/'})

                    }
                },function(res){
                    console.log(res);
                });
            }
        },
        computed: {},
        watch: {
            selectp_type:function (val) {
                this.Quantity_type = 0
                if(val == 0){this.Quantity = this.douyu[0].num}
                if(val == 1){this.Quantity = this.huya[0].num}
                if(val == 2){this.Quantity = this.douyin[0].num}
                if(val == 3){this.Quantity = this.kuaishou[0].num}
            }
        },
        mounted: function () {
            this.$toast({
                message:'服務更新維護中',
                type:'fail',
                duration:1000,
            });
            this.$router.push({path: '/'})
            return
            this.getuserdata()
            this.history_platorder()
            var type=this.$route.query.type
            this.selectp_type =  type

        }
    }
</script>
