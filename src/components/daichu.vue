<template>
    <div class="sub_store">
        <div class="pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>支付寶點數代購訂單</b></span>
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
                        <div>轉帳手續費</div>
                        <div>{{service_charge}}</div>
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
            <h6>請輸入支付寶點數代購金額</h6>
            <div class="RMB_TWD">
                <div >
                    <span>欲代購點數</span>
                    <el-input v-model="robot_rmb" type="Number" placeholder="請輸入金額"   size="mini" oninput="if(value<0)value=0;" @input="inputrmb"></el-input>
                </div>
                <van-icon name="exchange" size="20px"></van-icon>
                <div>
                    <span>需支付款項</span>
                    <el-input  v-model="robot_twd" size="mini"  type="Number" :disabled="true"></el-input>
                </div>
            </div>
            <h6>支付寶帳戶</h6>
            <div class="sub_storeselect">
                <el-select v-model="zfbaccount" placeholder="支付寶帳戶" size="mini" style="width: 100%" >
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
                <h6>支付寶類型</h6>
                <el-select v-model="store_type" placeholder="支付寶類型" size="mini" style="width: 100%;" >
                    <el-option
                            style="font-size: 12px;"
                            v-for="item in store_type_list"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="isconfirm" style="margin-top: 10px;">
                <van-checkbox  checked-color="#07c160" icon-size="17px" v-model="isconfirm">我了解使用非本人支付寶帳戶風險，相關風險由個人承擔</van-checkbox>
            </div>
            <h6>請選擇付款方式</h6>
            <div class="payment_type" >
                <div  @click="payment_method = '3'" :style="payment_method=='3'?'border: 2px solid #2F54EB;':'border: 1px solid #CCCCCC;'">
<!--                    <van-radio-group v-model="payment_method">-->
<!--                        <van-radio name="3" checked-color="#4b0"></van-radio>-->
<!--                    </van-radio-group>-->
                    <div class="directions">
                        <p>錢包餘額付款</p>
                        <p>餘額:￥ <span class="colorgreen"> {{r_money}}</span>（不另新開手續費發票）</p>
                    </div>
                </div>



<!--                <div  @click="payment_method = '7'"  :style="payment_method=='7'?'border: 2px solid #2F54EB;':'border: 1px solid #CCCCCC;'">-->
<!--&lt;!&ndash;                    <van-radio-group v-model="payment_method">&ndash;&gt;-->
<!--&lt;!&ndash;                        <van-radio name="9" checked-color="#4b0"></van-radio>&ndash;&gt;-->
<!--&lt;!&ndash;                    </van-radio-group>&ndash;&gt;-->
<!--                    <div class="directions">-->
<!--                      <p>013 國泰銀行</p>-->
<!--                      <div v-show="payment_method == '7'" >-->
<!--                        <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>-->
<!--                        <p>若轉帳後４８小時未入帳請與我們聯絡。</p>-->
<!--                        <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>-->
<!--                        <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>-->
<!--                        <van-field-->
<!--                          v-show="payment_method == '7'"-->
<!--                          style="padding: 10px 0"-->
<!--                          placeholder="請輸入匯款帳號後五碼"-->
<!--                          v-model="bankcode"-->
<!--                        >-->
<!--                        </van-field>-->
<!--                      </div>-->

<!--                    </div>-->
<!--                </div>-->
<!--                <div  @click="payment_method = '9'"  :style="payment_method=='9'?'border: 2px solid #2F54EB;':'border: 1px solid #CCCCCC;'">-->
<!--&lt;!&ndash;                    <van-radio-group v-model="payment_method">&ndash;&gt;-->
<!--&lt;!&ndash;                        <van-radio name="9" checked-color="#4b0"></van-radio>&ndash;&gt;-->
<!--&lt;!&ndash;                    </van-radio-group>&ndash;&gt;-->
<!--                    <div class="directions">-->
<!--                      <p>822 中國信託</p>-->
<!--                      <div v-show="payment_method == '9'" >-->
<!--                        <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>-->
<!--                        <p>若轉帳後４８小時未入帳請與我們聯絡。</p>-->
<!--                        <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>-->
<!--                        <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>-->
<!--                        <van-field-->
<!--                          v-show="payment_method == '9'"-->
<!--                          style="padding: 10px 0"-->
<!--                          placeholder="請輸入匯款帳號後五碼"-->
<!--                          v-model="bankcode"-->
<!--                        >-->
<!--                        </van-field>-->
<!--                      </div>-->

<!--                    </div>-->
<!--                </div>-->
                <div  @click="payment_method = '10'"  :style="payment_method=='10'?'border: 2px solid #2F54EB;':'border: 1px solid #CCCCCC;'">
                    <!--                    <van-radio-group v-model="payment_method">-->
                    <!--                        <van-radio name="9" checked-color="#4b0"></van-radio>-->
                    <!--                    </van-radio-group>-->
                    <div class="directions">
                        <p>108 陽信銀行</p>
                        <div v-show="payment_method == '10'" >
                            <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>
                            <p>若轉帳後４８小時未入帳請與我們聯絡。</p>
                            <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>
                            <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>
                            <van-field
                                v-show="payment_method == '10'"
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
                                <!--style="padding: 10px 0"-->
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
                <van-checkbox  checked-color="#07c160" icon-size="17px" v-model="isconfirm">我同意貨款交由兆富通代墊，金額無誤，不另做用途。
                </van-checkbox>
            </div>
            <div class="Nextstep">
                <van-button size="small" style="background-color: #434343">返回</van-button>
                <van-button size="small" style="background-color: #ffbc00;color: #3D3D3D"  @click="sub_store" :disabled="sub_storebeld">下一步</van-button>
            </div>
            <h6>問題回報</h6>
            <a href="https://line.me/R/ti/p/%40653ymryv" target="_blank"><img src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png" alt="加入好友" height="36" border="0"></a>
        </div>

        <div v-show="loding" style="width:100%;height: 100%;z-index: 9999;position:fixed;top: 0;background-color:rgba(0,0,0,0.4)">
            <div style="position: relative;top:45%;text-align: center;width: 100%">
                <van-loading color="#fff" style="margin: 0 auto " size="40px"/>
            </div>
        </div>
        <div v-html="chaoshang" style="opacity: 0"></div>

        <van-popup v-model="Supplement" style="width: 100%;padding: 10px" :close-on-click-overlay="false">
            <p style="font-size: 15px;text-align: center;padding: 10px 0">您的錢包餘額不足{{robot_rmb}},需補款 <span style="color: red">￥{{(Number(robot_rmb-r_money)+Number(service_charge)).toFixed(2)}}</span>，請選擇補款方式。</p>
            <van-radio-group v-model="withhold_type">
                <van-cell-group>

                    <!--<van-cell title="超商補款" clickable @click="withhold_type = '2'">-->
                        <!--<van-radio slot="right-icon" name="2" />-->
                    <!--</van-cell>-->
<!--                    <van-cell title="中國信託" clickable @click="withhold_type = '9'">-->
<!--                        <van-radio slot="right-icon" name="9" />-->
<!--                    </van-cell>-->
                    <van-cell title="陽信銀行" clickable @click="withhold_type = '10'">
                        <van-radio slot="right-icon" name="10" />
                    </van-cell>
<!--                    <van-cell title="ATM銀行轉帳(013 國泰銀行)" clickable @click="withhold_type = '7'">-->
<!--                        <van-radio slot="right-icon" name="7" />-->
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
                <van-button type="primary" size="large" @click="BK_storeAjax" :disabled="BKsubdaichubled">確定並送出</van-button>
                <van-button  size="large" style="margin-top: 10px" @click="payment_method='';paypwd='';Supplement=false">重新選擇付款方式</van-button>
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
                            <el-button type="primary" @click="slideshow = false" :disabled="yzm.bled" style="color: #fff">{{yzm.text}}</el-button>
                        </div>
                        <div class="bottombt" > <el-button type="primary" @click="EBstoreAjax" :disabled="EBsubdaichubled">送出並驗證</el-button></div>
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
                RiskTakingBook:false,
                msg: '',   //提示内容
                textcolor:'#46ce04', //提示文字颜色

                dragverify:false, //验证弹出框
                slideshow:true,//滑块和手机验证码开关
                EBsubdaichubled:true,//E币补款提交按钮开关
                BKsubdaichubled:false,//补款提交按钮开关
                phone_code:'',//E币付款手机验证码

                Supplement:false,
                withhold_type:'',
                bankcode:'',

                yzm:{
                    text:'獲取驗證碼',
                    time:60,
                    bled:false,
                    num:3
                },
                merber_phone:'', //用户手机号
                merber_phcode:'',
                store_type:'',
                store_type_list:[
                    {text:'個人',value:1},
                    {text:'廠商公司',value:2},
                    {text:'運費',value:3},
                ],
                loding:false,
                chaoshang:'',
                merbervip:{},
                account:[''],
                robot_rmb:'',//代储金额
                robot_twd:'',//代储台币金额
                service_charge:0,//手续费
                exchange:0,//汇率
                r_money:0,//R币余额
                alipay:[],//已认证支付宝
                zfbaccount:'請選擇支付寶帳戶',//支付宝帐号
                merber_vip:'',//是否是会员
                isconfirm:false,
                payment_method:'3',
                Czone:true,
                orderdata:{},
                sub_storebeld:false,
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
                invoice_type:'1',//发票类型
                myEmail:'',//我的邮箱
                LoveCode:'',//爱心码
                PersonalEmailerror_message:'',//个人邮箱错误提示
                LoveCodeerror_message:'',//捐赠码错误提示
                companyEmailerror_message:"",//公司邮箱错误
                company_numerror_message:"",//公司编号错误
                company_adderror_message:"",//公司地址错误
                company_nameerror_message:"",//公司名称错误
                CarruerNumerror_message:"",//公司地址错误
                PersonalEmail:'',//个人邮箱
                CustomerEmail:'',//邮箱（参数）
                company_name:'',//公司名称
                companyEmail:'',//公司邮箱
                company_num:"",//公司编号
                company_add:'',//公司地址
                CarruerNum:'',//载具编号
                platform_serve:0,//平台手续费
                exchangelist:[],
            }
        },
        components: {},
        methods: {
            //滑动验证成功
            onSuccess(times){
                this.textcolor = "#46ce04"
                this.slideshow = true
                this.EBsubdaichubled = false
                // this.timer()
                // this.$toast({
                //     message:'驗證碼已發送',
                //     type:'success',
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
                        this.timer()
                        this.$toast({
                            message:'驗證碼已發送',
                            type:'success',
                            duration:1000,
                        });
                    }
                },function(res){
                    console.log(res);
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
                console.log('检测到非人为操作的哦！');
                this.msg = 'try again';
                // 刷新
                this.$refs.slideblock.reset();
            },
            random(){
               var code=this.donation_num[Math.round(Math.random()*(this.donation_num.length-1))];
               this.LoveCode=code.num
            },

            timer() {
                this.yzm.bled=true
                if (this.yzm.time > 0) {
                    this.yzm.time--;
                    this.yzm.text=this.yzm.time+"s後重新獲取";
                    setTimeout(this.timer, 1000);
                } else{
                    this.yzm.time=0;
                    this.yzm.text="獲取驗證碼";
                    this.yzm.bled=false;
                }
            },

            phoneyzm:function(){
                this.timer()
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
                    console.log(res);
                });
            },

            isValidGUI:function(taxId){
                var invalidList = "00000000,11111111";
                if (/^\d{8}$/.test(taxId) == false || invalidList.indexOf(taxId) != -1) {
                    return false;
                }
                var validateOperator = [1, 2, 1, 2, 1, 2, 4, 1],
                    sum = 0,
                    calculate = function(product) { // 個位數 + 十位數
                        var ones = product % 10,
                            tens = (product - ones) / 10;
                        return ones + tens;
                    };
                for (var i = 0; i < validateOperator.length; i++) {
                    sum += calculate(taxId[i] * validateOperator[i]);
                }

                return sum % 10 == 0 || (taxId[6] == "7" && (sum + 1) % 10 == 0);
            },

            getexchange:function () {
                this.$http.post('https://www.trillionricher.com/1.0/exchange',{
                    exchange_type:3,
                },{emulateJSON:true}).then(function(res){
                    this.exchange=res.body.data[0].exchange
                    this.exchangelist = res.body.data
                },function(res){
                    console.log(res);
                });
            },

            selectaccount:function (val) {
                this.account=['']
                this.zfbaccount=val
            },

            getzhifubao:function(){
                var _this = this
                this.$http.post('https://www.trillionricher.com/1.0/order_bank_alipay',{
                    merber_id:this.OS.merber_id,
                    token:this.OS.token
                },{emulateJSON:true}).then(function(res){
                    console.log(res);
                    if(res.body.success==-1){
                        this.Logout()
                    }else{
                        this.merber_vip = res.body.data.merber_vip
                        this.merber_phone = res.body.data.merber_phone
                        this.r_money = Number(res.body.data.r_money)
                        this.alipay=res.body.data.alipay
                        console.log(this.r_money);
                    }
                },function(res){
                    console.log(res);
                });
            },
            //提交代储参数验证
            sub_store:function () {
                var _this=this
                var mailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)/g
                if(this.robot_rmb == ''){
                    this.$toast({
                        message:'儲值金額不能為空',
                        type:'fail',
                        duration:1000,
                    });
                    return false
                }
                if(this.robot_rmb < 5){
                    this.$toast({
                        message:'儲值金額不能少於5',
                        type:'fail',
                        duration:1000,
                    });
                    return false
                }
                if(this.merbervip.growth_value ==0  && Number(this.robot_rmb) > Number(this.merbervip.vip_value)){
                    this.$toast({
                        message:'超過額度，代儲額度限制單筆'+this.merbervip.vip_value+'，如果問題請聯絡客服中心。',
                        type:'fail',
                        duration:3000,
                    });
                    return false
                }
                if(this.zfbaccount=="請選擇支付寶帳戶"){
                    this.$toast({
                        message:'請選擇支付寶帳戶',
                        type:'fail',
                        duration:1000,
                    });
                    return false
                }
                if(this.store_type==""){
                    this.$toast({
                        message:'請選擇支付寶類型',
                        type:'fail',
                        duration:1000,
                    });
                    return false
                }
                if(this.isconfirm==false){
                    this.$toast({
                        message:'你未同意風險承擔說明 ',
                        type:'fail',
                        duration:1000,
                    });
                    return false
                }
				if(this.payment_method == 3 &&  Number(this.r_money)<=0 ){
					this.$toast({
					    message:'錢包餘額為0，請重新選擇付款方式 ',
					    type:'fail',
					    duration:1000,
					});
					return false
				}
                if((this.payment_method == "9" || this.payment_method == "7") && this.bankcode.length !== 5){
                    this.$toast({
                        message:'請輸入匯款銀行後五位 ',
                        type:'fail',
                        duration:1000,
                    });
                    return false
                }
                // if(this.invoice_type==1){
                //     this.merber_email = this.PersonalEmail
                //     this.company_add=''//公司地址
                //     this.company_num=''//公司编号
                //     this.LoveCode=''//爱心
                //     this.CarruerNum=''//载具编号
                //     if(!mailReg.test(this.PersonalEmail)){
                //         this.PersonalEmailerror_message='請輸入正確的郵箱格式'
                //         return false
                //     }
                //
                // }
                // if(this.invoice_type==2){
                //     var codeReg=/^[0-9]{3,7}/
                //     this.merber_email = Cookies.get('merber_email')
                //     this.company_add=''//公司地址
                //     this.company_num=''//公司编号
                //     this.CarruerNum=''//载具编号
                //     if(!codeReg.test(this.LoveCode)){
                //         this.LoveCodeerror_message='請輸入正確愛心碼'
                //         return false
                //     }
                // }
                // if(this.invoice_type==3){
                //     this.merber_email = this.companyEmail
                //     this.LoveCode=''//爱心
                //     this.CarruerNum=''//载具编号
                //     if(!mailReg.test(this.companyEmail)){
                //         this.companyEmailerror_message='請輸入正確的郵箱格式'
                //         return false
                //     }
                //     if(!this.isValidGUI(this.company_num)){
                //         this.company_numerror_message='請輸入正確的公司編號'
                //         return false
                //     }
                //     if( this.company_add==''){
                //         this.company_adderror_message='請輸入正確的公司地址'
                //         return false
                //     }
                //     if(this.company_name == ''){
                //         this.company_nameerror_message='請輸入正確的公司名稱'
                //         return false
                //     }
                // }
                // if(this.invoice_type==4){
                //     var carReg=/^[A-Z]{2}[0-9]{14}$/
                //     var car_tReg=/^\/{1}[0-9A-Z]{7}$/
                //     var car2_Reg=/^\/[A-Z0-9\+\-\.]{7}$/
                //     this.merber_email = Cookies.get('merber_email')
                //     this.company_add=''//公司地址
                //     this.company_num=''//公司编号
                //     this.LoveCode=''//爱心
                //     if(!carReg.test(this.CarruerNum) && !car_tReg.test(this.CarruerNum) && !car2_Reg.test(this.CarruerNum) ){
                //         this.CarruerNumerror_message='請輸入正確載具編碼(字母須大寫)'
                //         return false
                //     }
                //
                // }
                //服务时间提醒
                this.sub_storeAjax()
                // var date=new Date();
                // var aa=date.getHours()
                // if(aa<9 || aa>=22){
                //     this.$dialog.alert({
                //         message: '支付寶對凌晨作業進行控管，服務時間由AM 10:00~PM10:00，非服務時間送出的訂單會於AM 10:00開始處理，兆富通感謝你的配合!',
                //         messageAlign:'left',
                //         showCancelButton:true,
                //         confirmButtonText:'確定，繼續交易',
                //         cancelButtonText: '取消',
                //     }).then(() => {
                //         this.sub_storeAjax()
                //     }).catch(() => {
                //         _this.$router.push({ path:'/'})
                //     });
                // }else {
                //     this.sub_storeAjax()
                // }

            },
            //提交代储
            sub_storeAjax:function(){
                var _this=this
                var twd=Math.ceil((Number(this.robot_rmb)+this.service_charge)*this.exchange)
                if(this.payment_method==3 || this.payment_method==5) {
                    this.dragverify = true
                }else if(this.payment_method==2 && twd>5970){
                    this.$toast({
                        message:'使用超商代付請勿超過5970元新臺幣！',
                        type:'fail',
                        duration:3000,
                    });
                }else {
                    this.sub_storebeld=true
                    //-----------获取随机数
                    var timestamp = Date.parse(new Date());
                    var num = '';
                    for(var i=0;i<5;i++)
                    {
                        num+=Math.floor(Math.random()*10);
                    }
                    var sign = timestamp + num
                    //------------
                    this.$http.post('https://www.trillionricher.com/1.0/sub_store', {
                        sign:sign,
                        merber_id: this.OS.merber_id,
                        token: this.OS.token,
                        is_mobile:1,
                        exchange_rate: this.exchange,
                        robot_rmb: this.robot_rmb,
                        pay_url:this.zfbaccount,
                        payment_method: this.payment_method,
                        robot_twd: Math.ceil((Number(this.robot_rmb)+this.service_charge+ this.platform_serve)*this.exchange) ,
                        service_charge:this.service_charge,
                        platform_serve:this.platform_serve,//平台手续费
                        bankcode:this.bankcode,
                        invoice_type:this.invoice_type,//发票方式
                        CustomerEmail:this.merber_email,
                        CustomerAddr:this.company_add,//公司地址
                        CustomerIdentifier:this.company_num,//公司编号
                        LoveCode:this.LoveCode,//爱心码
                        CustomerName:this.invoice_type==3?this.company_name:this.OS.merber_name,//名字
                        CarruerNum:this.CarruerNum,//载具编号
                        store_type:this.store_type

                    }, {emulateJSON: true}).then(function (res) {
                        if(res.body.success==-1){
                            this.Logout()
                        }else if(res.body.success==1){
                            if(this.payment_method==2){
                                this.loding=true
                                this.chaoshang=res.body.data
                                window.setTimeout(function () {
                                    document.getElementById("__ecpayForm").submit();
                                },100)
                            }else{
                                if(this.payment_method==1){
                                    this.$toast({
                                        message:'虛擬帳號已經發送到您的手機',
                                        type:'success',
                                        duration:1000,
                                    });
                                }else if(this.payment_method==3){
                                    this.$toast({
                                        message:'付款成功',
                                        type:'success',
                                        duration:1000,
                                    });
                                }
                                _this.$router.push({
                                    path:'/orderdata',
                                    query:{
                                        id:res.body.data.order_id
                                    }
                                });

                            }
                        }else if(res.body.success==11){
                            this.$toast({
                                message:'重複操作，請您稍後再試！',
                                type:'fail',
                                duration:3000,
                            });
                            _this.$router.push({ path:'/order_list'})
                        }
                    }, function (res) {
                        console.log(res);
                    });
                }

            },
            //E币付款提交代储
            EBstoreAjax:function(){
                var _this =this
                if(this.phone_code == ""){
                    this.$toast({
                        message:'請輸入正確得驗證碼！',
                        type:'fail',
                        duration:3000,
                    });
                }else {
                    this.EBsubdaichubled = true
                    if(Number(this.robot_rmb) > Number(this.r_money)){
                        this.payment_method = 5
                        this.Supplement = true
                    }else {

                        //-----------获取随机数
                        var timestamp = Date.parse(new Date());
                        var num = '';
                        for(var i=0;i<5;i++)
                        {
                            num+=Math.floor(Math.random()*10);
                        }
                        var sign = timestamp + num
                        //------------
                        this.$http.post('https://www.trillionricher.com/1.0/sub_store', {
                            sign:sign,
                            merber_id: this.OS.merber_id,
                            token: this.OS.token,
                            is_mobile:1,
                            exchange_rate: this.exchange,
                            robot_rmb: this.robot_rmb,
                            pay_url:this.zfbaccount,
                            payment_method: this.payment_method,
                            robot_twd: Math.ceil((Number(this.robot_rmb)+this.service_charge+this.platform_serve)*this.exchange),
                            service_charge:this.service_charge,
                            withhold_type:this.withhold_type,
                            payment_code:this.phone_code,//验证码
                            merber_phone:this.merber_phone,
                            invoice_type:this.invoice_type,//发票方式
                            CustomerEmail:this.merber_email,
                            CustomerAddr:this.company_add,//公司地址
                            CustomerIdentifier:this.company_num,//公司编号
                            LoveCode:this.LoveCode,//爱心码
                            CustomerName:this.invoice_type==3?this.company_name:this.merber_name,//名字
                            CarruerNum:this.CarruerNum,//载具编号
                            platform_serve:this.platform_serve,//平台手续费
                            store_type:this.store_type
                        }, {emulateJSON: true}).then(function (res) {
                            this.loding=false
                            this.EBsubdaichubled = false

                            if(res.body.success==-1){
                                this.Logout()
                            }else if(res.body.success==1){
                                this.dragverify = false
                                this.$toast({
                                    message:'付款成功',
                                    type:'success',
                                    duration:1000,
                                });
                                this.active = 1
                                this.orderdata=res.body.data
                                _this.$router.push({
                                    path:'/orderdata',
                                    query:{
                                        id:res.body.data.order_id
                                    }
                                });


                            }else if(res.body.success==8) {
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

                            }else if(res.body.success==11){
                                this.$toast({
                                    message:'重複操作，請您稍後再試！',
                                    type:'fail',
                                    duration:3000,
                                });
                                _this.$router.push({ path:'/order_list'})
                            }
                        }, function (res) {
                            console.log(res);
                        });
                    }
                }

            },
            //补款提交代储
            BK_storeAjax:function(){
                var _this=this
                this.sub_storebeld=true
                if((this.withhold_type == "9" || this.withhold_type == "7" )&& this.bankcode.length !== 5){
                    this.$toast({
                        message:'請輸入匯款銀行後五位！',
                        type:'fail',
                        duration:3000,
                    });
                    return false
                }
                if(this.payment_method==5 && this.withhold_type==''){
                    this.$toast({
                        message:'請選擇補款付款方式！',
                        type:'fail',
                        duration:3000,
                    });
                }else {
                    this.BKsubdaichubled = true
                    //-----------获取随机数
                    var timestamp = Date.parse(new Date());
                    var num = '';
                    for(var i=0;i<5;i++)
                    {
                        num+=Math.floor(Math.random()*10);
                    }
                    var sign = timestamp + num
                    //------------
                    var w_rmb = (Number(this.robot_rmb-this.r_money)+Number(this.service_charge)).toFixed(2)
                    var w_twd=Math.ceil(w_rmb*this.exchange)

                    this.$http.post('https://www.trillionricher.com/1.0/sub_store', {
                        sign:sign,
                        merber_id: this.OS.merber_id,
                        token: this.OS.token,
                        is_mobile:1,
                        exchange_rate: this.exchange,
                        robot_rmb: this.robot_rmb,
                        pay_url:this.zfbaccount,
                        payment_method: this.payment_method,
                        robot_twd: Math.ceil((Number(this.robot_rmb)+this.service_charge+ this.platform_serve)*this.exchange) ,
                        service_charge:this.service_charge,
                        withhold_type:this.withhold_type,
                        withhold_rmb:w_rmb,
                        withhold_twd:w_twd,
                        remain_rmb:this.r_money,

                        payment_code:this.phone_code,//支付密码
                        invoice_type:this.invoice_type,//发票方式
                        CustomerEmail:this.merber_email,
                        platform_serve:this.platform_serve,//平台手续费
                        CustomerAddr:this.company_add,//公司地址
                        CustomerIdentifier:this.company_num,//公司编号
                        LoveCode:this.LoveCode,//爱心码
                        CustomerName:this.invoice_type==3?this.company_name:this.OS.merber_name,//名字
                        CarruerNum:this.CarruerNum,//载具编号
                        merber_phone:this.merber_phone,
                        bankcode:this.bankcode,
                        store_type:this.store_type
                    }, {emulateJSON: true}).then(function (res) {
                        this.loding=false
                        this.BKsubdaichubled = false
                        if(res.body.success==-1){
                            this.Logout()
                        }else if(res.body.success==1){
                            this.Supplement=false
                            this.dragverify = false
                            if(this.withhold_type==2){
                                this.loding=true
                                this.chaoshang=res.body.data
                                window.setTimeout(function () {
                                    document.getElementById("__ecpayForm").submit();
                                },100)
                            }else{
                                if(this.payment_method==1 || this.payment_method==5){
                                    this.$toast({
                                        message:'虛擬帳號已經發送到您的手機',
                                        type:'success',
                                        duration:1000,
                                    });
                                }else if(this.payment_method==3){
                                    this.$toast({
                                        message:'付款成功',
                                        type:'success',
                                        duration:1000,
                                    });
                                }
                                _this.$router.push({
                                    path:'/orderdata',
                                    query:{
                                        id:res.body.data.order_id
                                    }
                                });
                            }
                        }else if(res.body.success==8) {
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

                        }else if(res.body.success==11){
                            this.$toast({
                                message:'重複操作，請您稍後再試！',
                                type:'fail',
                                duration:3000,
                            });
                            _this.$router.push({ path:'/order_list'})
                        }
                    }, function (res) {
                        console.log(res);
                    });
                }
            },

            check_order:function () {
                this.$http.post('https://www.trillionricher.com/1.0/check_order',{
                    merber_id: this.OS.merber_id,
                    token:this.OS.token,
                    service_type: 3
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else if(res.body.success==0){
                        this.CustomerEmail=res.body.data.merber_email
                        this.merbervip = res.body.data

                    }else if (res.body.success == 3){
                        this.$router.push({path: '/'})
                        this.$toast({
                            message:'請先完成身份認證',
                            type:'fail',
                            duration:3000,
                        });
                    }else if (res.body.success == 4){
                        this.$router.push({path: '/'})
                        this.$toast({
                            message:'請先完成文件認證',
                            type:'fail',
                            duration:3000,
                        });
                    }else if(res.body.success == 5){
                        this.$router.push({path: '/'})
                        this.$toast({
                            message:'支付寶服務暫時關閉，開放另行通知',
                            type:'fail',
                            duration:3000,
                        });
                    }else {
                        this.CustomerEmail=res.body.data.merber_email
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
            },

            inputrmb:function (e) {
                if(e<100){this.exchange = this.exchangelist[0].exchange}
                if(e>=100 && e<500){this.exchange = this.exchangelist[1].exchange}
                if(e>=500 && e<2000){this.exchange = this.exchangelist[2].exchange}
                if(e>=2000 && e<5000){this.exchange = this.exchangelist[3].exchange}
                if(e>=5000 && e<10000){this.exchange = this.exchangelist[4].exchange}
                if(e>=10000 && e<40000){this.exchange = this.exchangelist[5].exchange}
                if(e>=40000 && e<80000){this.exchange = this.exchangelist[6].exchange}
                if(e>=80000 && e<100000){this.exchange = this.exchangelist[7].exchange}
                if(e>=100000 && e<200000){this.exchange = this.exchangelist[8].exchange}
                if(e>=200000 && e<300000){this.exchange = this.exchangelist[9].exchange}
                if(e>=300000 && e<=500000){this.exchange = this.exchangelist[10].exchange}
                this.robot_twd=Math.ceil(e*this.exchange);
                // var sxf=e*0.0025;
                // if(sxf<=2){
                //     this.service_charge=2
                // }else if(sxf >=100){
                //     this.service_charge=100
                // }else {
                //     this.service_charge=Math.ceil(sxf)
                // }
            },

            Openandclose:function () {
                if(this.OS.merber_id==undefined){
                    this.$router.push('/login');
                    return false
                }
                this.$http.post('https://www.trillionricher.com/1.0/notice_switch',{},
                    {emulateJSON:true}).then(function(res){

                    if(res.body.success==1){
                        var oac = res.body.data[3]

                        if(oac.switch == 1){
                            this.$toast({
                                message:oac.content,
                                type:'fail',
                                duration:3000,
                            });
                            this.$router.push({path: '/'})
                            return false
                        }else {

                            this.check_order()
                            this.getexchange()
                        }
                    }
                },function(res){
                    console.log(res);
                });
            }
        },
        computed: {

        },
        watch: {
        },
        created: function () {
            this.Openandclose()
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
        border-top: 1px solid #e7e7e7;
        color: #ffffff;
    }
</style>
