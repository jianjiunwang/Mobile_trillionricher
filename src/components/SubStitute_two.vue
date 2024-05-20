<template>
    <div class="substitute">
        <div class="pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>支付寶代購</b></span>
                </router-link>
            </div>
        </div>

        <div>
            <table class="order_table" >
                <tr>
                    <th colspan="3" class="trandlink">交易鏈接</th>
                </tr> 
                <tr>
                    <td colspan="3"  v-if="orderdata.pay_url!==undefined">{{orderdata.pay_url.length>80?orderdata.pay_url.slice(0,80)+'...':orderdata.pay_url}}</td>
                </tr>
               
            </table>
            <table class="order_table" >
             <tr>
                    <th>用户</th>
                    <th>平台手續費</th>
                    <th>總金額</th>

                </tr>
               
                <tr>
                    <td>{{orderdata.alipay_name+orderdata.alipay_num}}</td>
                    <td>￥ 0</td>
                    <td>￥{{orderdata.robot_rmb}}</td>
                </tr>
                <tr>
                    <th colspan="2">代付商品名稱</th>
                    <th>金額</th>
                </tr>
                <tr v-for="(item,i) in orderdata.product_name" :key="i">
                    <td colspan="2">{{item.product_name}}</td>
                    <td>{{item.product_price}}</td>
                </tr>
            </table>
        </div>
        <div style="padding:0 20px ">
            <h6>請選擇付款方式</h6>
            <div  class="payment_type">
                <div  @click="payment_method = '3'">
                    <van-radio-group v-model="payment_method">
                        <van-radio name="3" checked-color="#4b0"></van-radio>
                    </van-radio-group>
                    <div class="directions">
                        <p>錢包餘額餘額</p>
                        <p>餘額￥{{orderdata.r_money==0?0.00:orderdata.r_money}}（
                            不另新開手續費發票）</p>
                    </div>
                </div>
<!--                <div  @click="payment_method = '7'">-->
<!--                    <van-radio-group v-model="payment_method">-->
<!--                        <van-radio name="9" checked-color="#4b0"></van-radio>-->
<!--                    </van-radio-group>-->
<!--                    <div class="directions">-->
<!--                        <p>013 國泰銀行</p>-->
<!--                        <div v-show="payment_method == '7'" >-->
<!--                          <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>-->
<!--                          <p>若轉帳後４８小時未入帳請與我們聯絡。</p>-->
<!--                          <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>-->
<!--                          <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>-->
<!--                          <van-field-->
<!--                            style="padding: 10px 0"-->
<!--                            placeholder="請輸入匯款帳號後五碼"-->
<!--                            v-model="bankcode"-->
<!--                          >-->
<!--                          </van-field>-->
<!--                        </div>-->

<!--                    </div>-->
<!--                </div>-->
<!--                <div  @click="payment_method = '9'">-->
<!--                    <van-radio-group v-model="payment_method">-->
<!--                        <van-radio name="9" checked-color="#4b0"></van-radio>-->
<!--                    </van-radio-group>-->
<!--                    <div class="directions">-->
<!--                        <p>822 中國信託</p>-->
<!--                        <div v-show="payment_method == '9'" >-->
<!--                          <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>-->
<!--                          <p>若轉帳後４８小時未入帳請與我們聯絡。</p>-->
<!--                          <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>-->
<!--                          <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>-->
<!--                          <van-field-->
<!--                            style="padding: 10px 0"-->
<!--                            placeholder="請輸入匯款帳號後五碼"-->
<!--                            v-model="bankcode"-->
<!--                          >-->
<!--                          </van-field>-->
<!--                        </div>-->

<!--                    </div>-->
<!--                </div>           -->
                <div  @click="payment_method = '10'">
                    <van-radio-group v-model="payment_method">
                        <van-radio name="10" checked-color="#4b0"></van-radio>
                    </van-radio-group>
                    <div class="directions">
                        <p>108 陽信銀行</p>
                        <div v-show="payment_method == '10'" >
                          <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>
                          <p>若轉帳後４８小時未入帳請與我們聯絡。</p>
                          <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>
                          <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>
                          <van-field
                            style="padding: 10px 0"
                            placeholder="請輸入匯款帳號後五碼"
                            v-model="bankcode"
                          >
                          </van-field>
                        </div>

                    </div>
                </div>
                <!--<div  @click="payment_method = '8'">-->
                    <!--<van-radio-group v-model="payment_method">-->
                        <!--<van-radio name="8" checked-color="#4b0"></van-radio>-->
                    <!--</van-radio-group>-->
                    <!--<div class="directions">-->
                        <!--<p>810 星展銀行</p>-->
                        <!--<van-field-->
                                <!--v-show="payment_method == '8'"-->
                                <!--placeholder="請輸入匯款帳號後五碼"-->
                                <!--v-model="bankcode"-->
                        <!--&gt;-->
                        <!--</van-field>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<div  @click="payment_method = '2'">-->
                    <!--<van-radio-group v-model="payment_method">-->
                        <!--<van-radio name="2" checked-color="#4b0"></van-radio>-->
                    <!--</van-radio-group>-->
                    <!--<div class="directions">-->
                        <!--<p>7-11/全家/萊爾富/OK超商</p>-->
                        <!--<p>收30元的手續費，不足30臺幣按30臺幣收取</p>-->
                        <!--<p>使用超商付款不能超過5970元新台幣</p>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
            <!--<h6>手續費電子發票</h6>-->
            <!--<div class="invoice">-->
                <!--<div @click="invoice_type = '1'">-->
                    <!--<van-radio-group v-model="invoice_type">-->
                        <!--<van-radio name="1" checked-color="#4b0"></van-radio>-->
                    <!--</van-radio-group>-->
                    <!--<div class="directions">個人電子發票</div>-->
                <!--</div>-->
                <!--<div v-if="invoice_type==1">-->
                    <!--<van-field-->
                            <!--v-model="PersonalEmail"-->
                            <!--placeholder="請輸入您的電子郵箱"-->
                            <!--:error-message=PersonalEmailerror_message-->
                    <!--&gt;-->
                        <!--<van-button slot="button" size="small"  type="primary" @click="PersonalEmail = OS.merber_email">填入預設</van-button>-->
                    <!--</van-field>-->
                <!--</div>-->
                <!--<div  @click="invoice_type = '2'">-->
                    <!--<van-radio-group v-model="invoice_type">-->
                        <!--<van-radio name="2" checked-color="#4b0"></van-radio>-->
                    <!--</van-radio-group>-->
                    <!--<div class="directions">捐贈發票</div>-->
                <!--</div>-->
                <!--<div v-if="invoice_type==2">-->
                    <!--<van-field-->
                            <!--v-model="LoveCode"-->
                            <!--placeholder="請輸入捐贈碼"-->
                            <!--:error-message=LoveCodeerror_message-->
                    <!--&gt;-->
                        <!--<van-button slot="button" size="small"  type="primary" @click="random">隨機捐贈</van-button>-->
                    <!--</van-field>-->
                <!--</div>-->
                <!--<div  @click="invoice_type = '3'">-->
                    <!--<van-radio-group v-model="invoice_type">-->
                        <!--<van-radio name="3" checked-color="#4b0"></van-radio>-->
                    <!--</van-radio-group>-->
                    <!--<div class="directions">公司電子發票</div>-->
                <!--</div>-->
                <!--<div  v-if="invoice_type==3">-->
                    <!--<div >-->
                        <!--<div style="padding: 10px 15px;color: red">-->
                            <!--發票皆透過Email的方式寄出電子發票形式開立，恕不提供紙本。-->
                            <!--若是須開立統編發票，統編發票將於付款完成15天內以pdf格式寄到您的電子信箱。可以直接將pdf檔列印下來報帳-->
                        <!--</div>-->
                        <!--<van-field-->
                                <!--v-model="companyEmail"-->
                                <!--placeholder="請輸入您的電子郵箱"-->
                                <!--:error-message=companyEmailerror_message-->
                        <!--&gt;-->
                            <!--<van-button slot="button" size="small" type="primary" @click="companyEmail = OS.merber_email">填入預設</van-button>-->
                        <!--</van-field>-->
                        <!--<van-field-->
                                <!--v-model="company_num"-->
                                <!--placeholder="請輸入您公司統一編號"-->
                                <!--:error-message=company_numerror_message-->
                        <!--&gt;-->
                        <!--</van-field>-->
                        <!--<van-field-->
                                <!--v-model="company_name"-->
                                <!--placeholder="請輸入公司名稱"-->
                                <!--:error-message=company_nameerror_message-->
                        <!--&gt;-->
                        <!--</van-field>-->
                        <!--<van-field-->
                                <!--v-model="company_add"-->
                                <!--placeholder="請輸入您公司地址"-->
                                <!--:error-message=company_adderror_message-->
                        <!--&gt;-->
                        <!--</van-field>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div  @click="invoice_type = '4'">-->
                    <!--<van-radio-group v-model="invoice_type">-->
                        <!--<van-radio name="4" checked-color="#4b0"></van-radio>-->
                    <!--</van-radio-group>-->
                    <!--<div class="directions">載具/自然人憑證</div>-->
                <!--</div>-->
                <!--<div v-if="invoice_type==4" >-->
                    <!--<van-field-->
                            <!--v-model="CarruerNum"-->
                            <!--placeholder="/○○○○○○○○"-->
                            <!--:error-message=CarruerNumerror_message-->
                    <!--&gt;-->
                    <!--</van-field>-->
                <!--</div>-->



            <!--</div>-->
            <div class="isconfirm" style="margin-top: 10px;">
                <van-checkbox  checked-color="#07c160" icon-size="17px" v-model="isconfirm">我同意貨款交由兆富通代墊，金額無誤，不另做用途。</van-checkbox>
            </div>
            <div class="Nextstep">
                <van-button size="small" style="background-color: #434343" @click="cancel_order">取消訂單</van-button>
                <van-button size="small" style="background-color: #ffbc00;color: #3D3D3D"  @click="createorder" :disabled="sub_storebeld">下一步</van-button>
            </div>
        </div>



        <div v-html="chaoshang" style="opacity: 0"></div>

        <van-popup v-model="Supplement" style="width: 100%;padding: 10px" :close-on-click-overlay="false">
            <p style="font-size: 15px;text-align: center;padding: 10px 0">您的E幣餘額不足{{orderdata.robot_rmb}},需補款 <span style="color: red">￥{{(Number(orderdata.robot_rmb)-Number(orderdata.r_money)).toFixed(2)}}</span>，請選擇補款方式。</p>
            <van-radio-group v-model="withhold_type">
                <van-cell-group>

                    <!--<van-cell title="超商補款" clickable @click="withhold_type = '2'">-->
                        <!--<van-radio slot="right-icon" name="2" />-->
                    <!--</van-cell>-->
<!--                    <van-cell title="中國信託" clickable @click="withhold_type = '9'">-->
<!--                        <van-radio slot="right-icon" name="9" />-->
<!--                    </van-cell>        -->
                    <van-cell title="陽信銀行" clickable @click="withhold_type = '10'">
                        <van-radio slot="right-icon" name="9" />
                    </van-cell>
<!--                    <van-cell title="ATM銀行轉帳(013 國泰銀行)" clickable @click="withhold_type = '7'">-->
<!--                        <van-radio slot="right-icon" name="9" />-->
<!--                    </van-cell>-->
                    <!--<van-cell title="星展銀行" clickable @click="withhold_type = '8'">-->
                        <!--<van-radio slot="right-icon" name="8" />-->
                    <!--</van-cell>-->
                    <van-field
                            v-show="withhold_type == '9' || withhold_type == '7' || withhold_type == '10'"
                            placeholder="請輸入匯款帳號後五碼"
                            v-model="bankcode"
                    >
                    </van-field>
                </van-cell-group>
            </van-radio-group>
            <div>
                <van-button type="primary" size="large" @click="BKcreateorderajax" >確定並送出</van-button>
                <van-button  size="large" style="margin-top: 10px" @click="payment_method='';paypwd='';Supplement=false">重新選擇付款方式</van-button>
            </div>
        </van-popup>

        <van-popup v-model="toolTipbox" style="width: 70%;padding:  20px" :close-on-click-overlay="false">
            <p style="font-size: 18px;line-height: 30px;font-weight: bold">您好，礙於支付寶管制嚴重，提交代付金額限額不可超過5000人民幣。請拆單處理。</p>
            <div style="margin-top: 30px">
                <van-button type="primary" size="large" @click="goindex">確定</van-button>
            </div>
        </van-popup>
        <van-dialog v-model="dragverify" title="請進行驗證" :showConfirmButton="false" style="width: 95%">
            <div style="padding-bottom: 10px">
                <div style="padding: 30px 20px;font-size: 18px;font-weight: bold;margin: 0 auto" v-show="!slideshow" >
                    <slide-verify
                            :l="42"
                            :r="10"
                            :w="310"
                            :h="155"
                            :imgs="OS.imgs"
                            :accuracy="3"
                            ref="slideblock"
                            slider-text="向右滑動 >>>"
                            style="margin: 0 auto"
                            @success="onSuccess"
                            @fail="onFail"
                            @refresh="onRefresh"
                            @again="onAgain"
                    ></slide-verify>
                </div>
                <div style="font-size: 18px;font-weight: bold;margin: 0 auto;padding: 0 20px" v-show="slideshow" >
                    <div class="phone">
                        <div style="display: flex;justify-content: space-between;padding: 20px 0    ">
                            <span>手機號碼</span>
                            <span style="font-weight: bold;font-size: 18px;margin-left: 10px">{{merber_phone}}</span>
                        </div>
                        <div style="margin: 0;display: flex">
                            <el-input  maxlength="6"  v-model="phone_code"  placeholder="請輸入驗證碼"></el-input>
                            <el-button type="primary" @click="slideshow = false" :disabled="yzm.bled">{{yzm.text}}</el-button>
                        </div>
                        <div class="bottombt" > <el-button type="primary" @click="EBcreateorderajax"  :disabled="EBsubdaifubled" >送出並驗證</el-button></div>
                    </div>
                </div>
                <div class="slide-verify" :style="{color:textcolor}" >{{msg}}</div>
            </div>
        </van-dialog>
    </div>
</template>

<script>
    export default {
        inject:['reload'],
        data: function () {
            return {

                showalipay:false,
                Supplement:false,
                withhold_type:'1',
                msg: '',   //提示内容
                textcolor:'#46ce04', //提示文字颜色
                toolTipbox:false,
                dragverify:false, //验证弹出框
                slideshow:true,//滑块和手机验证码开关
                EBsubdaifubled:true,//E币补款提交按钮开关
                BKsubdaifubled:false,
                phone_code:'',//E币付款手机验证码
                platform_serve:0,//平台手续费
                bankcode:'',
                yzm:{
                    text:'獲取驗證碼',
                    time:60,
                    bled:false,
                    num:3
                },
                merber_phone:'',
                merber_phcode:'',
                typelist:[
                    {
                        value:1,
                        label:'實物商品'
                    },
                    {
                        value:2,
                        label:'虛擬商品'
                    },
                    {
                        value:10,
                        label:'集運代付'
                    }
                ],//代付类型选择

                merber_id:Cookies.get('merber_id'),
                merber_name:Cookies.get('merber_name'),
                merber_email:Cookies.get('merber_email'),

                loding:false,
                chaoshang:'',
                lefttext:"取消",
                pengyouzh:false,
                R_ye:'2321',
                zfb:'',  //朋友账户
                active:0,   //当前步骤
                alipay_type:'',//类型，实物传1 ，虚拟传2
                userRMB:'',//用户输入的金额
                url:'',//用户输入的URL
                payment_method:'',//付款方式

                donation_num:[
                    {num:'88888',name:'財團法人中華民國兒童癌症基金會'},
                    {num:'16888',name:'財團法人癌症希望基金會'},
                    {num:'1980198',name:'財團法人張老師基金會'},
                    {num:'876',name:'財團法人心路社會福利基金會'},
                    {num:'8282',name:'財團法人法律扶助基金會'},
                    {num:'9527',name:'財團法人罕見疾病基金會'},
                    {num:'5299',name:'社團法人台灣導盲犬協會'},
                    {num:'8957282',name:'財團法人流浪動物之家基金會'},
                    {num:'178',name:'社團法人台灣伴侶權益推動聯盟'},
                    {num:'852',name:'社團法人台灣露德協會'},
                ],
                invoice_type:'',//发票类型
                myEmail:'',//我的邮箱
                LoveCode:'',//爱心码
                PersonalEmailerror_message:'',//个人邮箱错误提示
                LoveCodeerror_message:'',//捐赠码错误提示
                companyEmailerror_message:"",//公司邮箱错误
                company_numerror_message:"",//公司编号错误
                company_adderror_message:"",//公司地址错误
                CarruerNumerror_message:"",//公司地址错误
                company_nameerror_message:"",//公司名称错误
                company_name:'',//公司名称
                PersonalEmail:'',//个人邮箱(参数)
                CustomerEmail:'',//邮箱（参数）
                companyEmail:'',//公司邮箱
                company_num:"",//公司编号
                company_add:'',//公司地址
                CarruerNum:'',//载具编号

                exchange:'',//当前汇率
                order_id:'',//订单号
                urlbeld:false,//是否禁用url输入框
                nextbeld:false,//是否禁用下一步按钮
                nextText:'下一步',//下一步内文本
                second:60,//商品信息请求时长
                orderdata:'' ,//商品明细数据
                sub_storebeld:false,
                RiskTakingBook:false,
                isconfirm:false,

            }
        },
        components: {},
        methods: {
            goindex(){
                this.toolTipbox = false
                this.$router.push('/')
            },
            //滑动验证成功
            onSuccess(times){
                this.msg = ""
                this.textcolor = "#46ce04"
                this.slideshow = true
                this.EBsubdaifubled = false
                // this.phonetimer()
                // this.$toast({
                //     message:'驗證碼已發送',
                //     type:'success',F
                //     duration:1000,
                // });
                this.$http.post('https://www.trillionricher.com/1.0/get_check',{
                    merber_id:this.OS.merber_id,
                    token:this.OS.token,
                    merber_phone:this.merber_phone
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==2){
                        this.$toast({
                            message: '此手機號已註冊',
                            type: 'fail',
                            duration: 2000,
                        })
                    }else if(res.body.success==1){
                        this.msg = ""
                        this.phonetimer()
                        this.$toast({
                            message:'驗證碼已發送',
                            type:'success',
                            duration:1000,
                        });
                    }
                },function(res){
                });
            },
            //滑动验证失败
            onFail(){
                this.textcolor = "#f56c6c"
                this.msg = '驗證未通過，請從新認證!'
            },
            //滑动图片刷新
            onRefresh(){
                this.msg = ''
            },
            //检查为非人为操作回调
            onAgain() {
                this.msg = 'try again';
                // 刷新
                this.$refs.slideblock.reset();
            },

            phonetimer() {
                this.yzm.bled=true
                if (this.yzm.time > 0) {
                    this.yzm.time--;
                    this.yzm.text=this.yzm.time+"s後重新獲取";
                    setTimeout(this.phonetimer, 1000);
                } else{
                    this.yzm.time=0;
                    this.yzm.text="獲取驗證碼";
                    this.yzm.bled=false;
                }
            },
            phoneyzm:function(){
                this.phonetimer()
                this.$http.post('https://www.trillionricher.com/1.0/forget_pad_code/',{
                    merber_phone:this.merber_phone,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==2){
                        this.$toast({
                            message: '此手機號已註冊',
                            type: 'fail',
                            duration: 2000,
                        })
                    }else if(res.body.success==1){
                        this.$toast({
                            message:'驗證碼已發送',
                            type:'success',
                            duration:1000,
                        });
                    }
                },function(res){
                });
            },



            Other_ways:function () {
                this.waysshow=true
            },
            cancel_order:function(){
                this.$dialog.alert({
                    message: '您將取消該筆訂單！',
                    showCancelButton:true,
                    confirmButtonText:'確認',
                }).then(() => {
                    this.$http.post('https://www.trillionricher.com/1.0/cancel_order',{
                        order_id:this.orderdata.order_id,
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
                    });
                }).catch(() => {
                    // on cancel
                });
            },

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

            // 提交代付参数验证
            createorder:function () {
                    if (this.payment_method==''){
                        this.$toast({
                            message:"請選擇付款方式",
                            type:"fail",
                            duration:1000
                        })
                        return false
                    }
                    if((this.payment_method == 7 || this.payment_method == 9 ) && this.bankcode.length !== 5){
                        this.$toast({
                            message:'請輸入匯款銀行後五位 ',
                            type:'fail',
                            duration:1000,
                        });
                        return false
                    }
                   this.createorder_ajax()
            },
            //提交代付
            createorder_ajax:function(){
                var _this=this
                var twd=this.orderdata.robot_rmb*this.exchange
                if(this.payment_method==2 && twd>5970){
                    this.$toast({
                        message:'使用超商代付請勿超過5970元新臺幣！',
                        type:'fail',
                        duration:3000,
                    });
                }else if(this.payment_method==3){
                    if(Number(this.orderdata.r_money) <=0 ){
                        this.$toast({
                            message:'您沒有可用的E幣,请使用其他付款方式！',
                            type:'fail',
                            duration:3000,
                        });
                    }else {
                        this.dragverify = true
                    }
                }else {
                    this.nextbeld=true
                    //-----------获取随机数
                    var timestamp = Date.parse(new Date());
                    var num = '';
                    for(var i=0;i<5;i++)
                    {
                        num+=Math.floor(Math.random()*10);
                    }
                    var sign = timestamp + num
                    //------------
                    this.$http.post('https://www.trillionricher.com/1.0/create_order',{
                        sign:sign,
                        order_id:this.orderdata.order_id,
                        merber_id:this.merber_id,
                        token:this.OS.token,
                        is_mobile:1,
                        payment_method:this.payment_method,
                        alipay_type:this.alipay_type,
                        service_charge:'',
                        remarks:'',
                        bankcode:this.bankcode,
                        platform_serve:this.platform_serve,//平台手续费
                        invoice_type:'',//发票方式
                        CustomerEmail:this.merber_email,
                        CustomerAddr:this.company_add,//公司地址
                        CustomerIdentifier:this.company_num,//公司编号
                        LoveCode:this.LoveCode,//爱心码
                        CustomerName:'',//名字
                        CarruerNum:this.CarruerNum,//载具编号
                    },{emulateJSON:true}).then(function(res){
                        if(res.body.success==-1){
                            this.Logout()
                        }else if(res.body.success===1){
                            if(this.payment_method==2){
                                this.loding=true
                                this.chaoshang=res.body.data
                                window.setTimeout(function () {
                                    document.getElementById("__ecpayForm").submit();
                                },100)
                            }else{
                                if(res.body.data.payment_method==1){
                                    _this.$toast({
                                        message:'您的虛擬付款帳號已經通過短信發送到您的手機',
                                        type:'success',
                                        duration:3000,
                                    });
                                }else if(res.body.data.payment_method==3){
                                    _this.$toast({
                                        message:'付款成功！',
                                        type:'success',
                                        duration:3000,
                                    });
                                }
                                this.nextText='返回首頁'
                                this.createorderdata=res.body.data
                                this.active=2
                                window.setTimeout(function () {
                                    _this.$router.push({
                                        path:'/orderdata',
                                        query:{
                                            id:res.body.data.order_id
                                        }
                                    });
                                },10000)
                            }
                        }else if(res.body.success==4){
                            this.$dialog.alert({
                                message: 'E幣餘額不足,請充值',
                                showCancelButton:true,
                                confirmButtonText:'前往儲值',
                                cancelButtonText: '重新選擇',
                            }).then(() => {
                                _this.$router.push({ path:'/rbcz'})
                            }).catch(() => {
                                // on cancel
                            });
                        }else if(res.body.success==11){
                            this.$toast({
                                message:'重複操作，請您稍後再試！',
                                type:'fail',
                                duration:3000,
                            });
                            _this.$router.push({ path:'/order_list'})
                        }else if(res.body.success==9){
                          this.$toast({
                            message:'驗證碼已過期，請重新請求！',
                            type:'fail',
                            duration:3000,
                          });
                        }
                    },function(res){

                    });
                }
            },
            //E币付款
            EBcreateorderajax:function(){
                if(this.phone_code.length !== 6){
                    this.$toast({
                        message:"請輸入正確得驗證碼",
                        type:"fail",
                        duration:1000
                    })
                }else {
                    if(Number(this.orderdata.r_money) >= Number(this.orderdata.robot_rmb)){
                        var _this=this
                        this.nextbeld=true
                        this.EBsubdaifubled = true
                        //-----------获取随机数
                        var timestamp = Date.parse(new Date());
                        var num = '';
                        for(var i=0;i<5;i++)
                        {
                            num+=Math.floor(Math.random()*10);
                        }
                        var sign = timestamp + num
                        //------------
                        this.$http.post('https://www.trillionricher.com/1.0/create_order',{
                            sign:sign,
                            order_id:this.orderdata.order_id,
                            merber_id:this.merber_id,
                            token:this.OS.token,
                            is_mobile:1,
                            payment_method:this.payment_method,
                            alipay_type:this.alipay_type,
                            service_charge:'',
                            platform_serve:this.platform_serve,//平台手续费

                            remarks:'',
                            withhold_type:this.withhold_type,
                            payment_code:this.phone_code,
                            invoice_type:'',//发票方式
                            CustomerEmail:this.merber_email,
                            merber_phone:this.merber_phone,
                            CustomerAddr:this.company_add,//公司地址
                            CustomerIdentifier:this.company_num,//公司编号
                            LoveCode:this.LoveCode,//爱心码
                            CustomerName:'',//名字
                            CarruerNum:this.CarruerNum,//载具编号
                        },{emulateJSON:true}).then(function(res){
                            this.loding=false
                            this.EBsubdaifubled = false
                            if(res.body.success==-1){
                                this.Logout()
                            }else if(res.body.success===1){
                                this.dragverify = false

                                this.$toast({
                                    message:'付款成功！',
                                    type:'success',
                                    duration:3000,
                                });
                                this.$router.push({
                                  path:'/orderdata',
                                  query:{
                                    id:res.body.data.order_id
                                  }
                                });
                            }else if(res.body.success==8){
                                if(this.yzm.num <=1){
                                    _this.$toast({
                                        message:'请核对您的手机号码！',
                                        type:'fail',
                                        duration:3000,
                                    });
                                    _this.reload();
                                }else {
                                    this.$toast({
                                        message:'驗證碼錯誤！',
                                        type:'fail',
                                        duration:3000,
                                    });
                                    this.Supplement=false
                                    this.EBsubdaifubled = false
                                    this.yzm.num --
                                    this.phone_code = ""
                                    this.textcolor = "#f56c6c"
                                    this.msg = "驗證碼錯誤，您還有"+this.yzm.num+"次機會"
                                }

                            }else if(res.body.success==11){
                                this.$toast({
                                    message:'重複操作，請您稍後再試！',
                                    type:'fail',
                                    duration:3000,
                                });
                                _this.$router.push({ path:'/order_list'})
                            }else if(res.body.success==9){
                              this.$toast({
                                message:'驗證碼已過期，請重新請求！',
                                type:'fail',
                                duration:3000,
                              });
                            }
                        },function(res){

                        });
                    }else {
                        this.Supplement =true
                    }
                }


            },
            //补款
            BKcreateorderajax:function(){
                var _this=this
                this.nextbeld=true
                this.BKsubdaifubled = true
                this.payment_method = 5
                if((this.withhold_type == "9" || this.withhold_type == "7" )&& this.bankcode.length !== 5){
                    this.$toast({
                        message:'請輸入匯款銀行後五位！',
                        type:'fail',
                        duration:3000,
                    });
                    return false
                }
                //-----------获取随机数
                var timestamp = Date.parse(new Date());
                var num = '';
                for(var i=0;i<5;i++)
                {
                    num+=Math.floor(Math.random()*10);
                }
                var sign = timestamp + num
                //------------

                var w_rmb = Number(this.orderdata.robot_rmb)-Number(this.orderdata.r_money).toFixed(2)
                var w_twd=Math.ceil(w_rmb*this.exchange)
                this.$http.post('https://www.trillionricher.com/1.0/create_order',{
                    sign:sign,
                    order_id:this.orderdata.order_id,
                    merber_id:this.merber_id,
                    token:this.OS.token,
                    is_mobile:1,
                    payment_method:this.payment_method,
                    alipay_type:this.alipay_type,
                    service_charge:'',
                    remarks:'',
                    bankcode:this.bankcode,
                    platform_serve:this.platform_serve,//平台手续费
                    withhold_type:this.withhold_type,
                    withhold_rmb:w_rmb,
                    withhold_twd:w_twd,
                    remain_rmb:this.orderdata.r_money,

                    payment_code:this.phone_code,
                    invoice_type:'',//发票方式
                    CustomerEmail:this.merber_email,
                    merber_phone:this.merber_phone,
                    CustomerAddr:this.company_add,//公司地址
                    CustomerIdentifier:this.company_num,//公司编号
                    LoveCode:this.LoveCode,//爱心码
                    CustomerName:'',//名字
                    CarruerNum:this.CarruerNum,//载具编号
                },{emulateJSON:true}).then(function(res){
                    this.BKsubdaifubled = false
                    if(res.body.success==-1){
                        this.Logout()
                    }else if(res.body.success===1){
                        this.Supplement=false
                        this.dragverify = false
                        if(this.withhold_type==2){
                            this.loding=true
                            this.chaoshang=res.body.data
                            window.setTimeout(function () {
                                document.getElementById("__ecpayForm").submit();
                            },100)
                        }else{
                            this.$toast({
                                message:'您的虛擬付款帳號已經通過短信發送到您的手機',
                                type:'success',
                                duration:3000,
                            });
                            this.$router.push({
                              path:'/orderdata',
                              query:{
                                id:res.body.data.order_id
                              }
                            });
                        }
                    }else if(res.body.success==8){
                        if(this.yzm.num <=1){
                            _this.$toast({
                                message:'请核对您的手机号码！',
                                type:'fail',
                                duration:3000,
                            });
                            _this.reload();
                        }else {
                            this.$toast({
                                message:'驗證碼錯誤！',
                                type:'fail',
                                duration:3000,
                            });
                            this.Supplement=false
                            this.EBsubdaichubled = false
                            this.yzm.num --
                            this.phone_code = ""
                            this.textcolor = "#f56c6c"
                            this.msg = "驗證碼錯誤，您還有"+this.yzm.num+"次機會"
                        }

                    }else if(res.body.success==9){
                      this.$toast({
                        message:'驗證碼已過期，請重新請求！',
                        type:'fail',
                        duration:3000,
                      });
                    }else if(res.body.success==11){
                        this.$toast({
                            message:'重複操作，請您稍後再試！',
                            type:'fail',
                            duration:3000,
                        });
                        _this.$router.push({ path:'/order_list'})
                    }
                },function(res){

                });
            },
            getphone:function () {
                this.$http.post('https://www.trillionricher.com/1.0/order_bank_alipay',{
                    merber_id: this.merber_id,
                    token:this.OS.token,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    } else if(res.body.success==1){
                        this.merber_phone=res.body.data.merber_phone
                    }
                },function(res){
                });
            },
            Openandclose:function () {
                this.$http.post('https://www.trillionricher.com/1.0/notice_switch',{},
                    {emulateJSON:true}).then(function(res){

                    if(res.body.success==1){
                        var oac = res.body.data[2]

                        if(oac.switch == 2){
                            this.$toast({
                                message:oac.content,
                                type:'fail',
                                duration:3000,
                            });
                            this.$router.push({path: '/'})
                            return false
                        }else {
                            if(this.merber_id==undefined){
                                this.$router.push('/login');
                            }else {
                                this.check_order()
                                this.getexchange()
                                this.getphone()
                            }
                        }
                    }
                },function(res){
                });
            },
            getorderdata:function(id){
                this.$http.post('https://www.trillionricher.com/1.0/product_order',{
                    merber_id:this.merber_id,
                    token:this.OS.token,
                    order_id:id
                },{emulateJSON:true}).then(function(res){
                        if(res.body.success===1){
                            this.orderdata = res.body.data
                        }
                })
            },
            getsuborder:function () {
                var id = this.$route.params.id
                if(id == undefined){
                    this.$router.push({
                        path:'/substitute',
                    });
                }
                this.getorderdata(id)
            }
        },
        computed: {},
        watch: {},
        mounted: function () {
            this.getsuborder()
            this.getphone()
        }
    }
</script>
