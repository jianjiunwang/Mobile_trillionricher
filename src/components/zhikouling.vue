<template>
    <div>
        <van-nav-bar title="吱口令" left-arrow :fixed="true" @click-left="upstep"></van-nav-bar>
        <div style="height: 120px"></div> <!--头部占位块-->
        <van-steps :active="active" style="position: fixed;top:46px;width: 96%;">
            <van-step>吱口令</van-step>
            <van-step>創建訂單</van-step>
            <van-step>付款</van-step>
            <van-step>為您代付</van-step>
        </van-steps>
        <div class="url" v-if="active==0">
            <div  style="padding: 0 0 0 20px;font-size: 15px;margin:10px 0">
                <b>複製吱口令到下面輸入框</b>
            </div>
            <van-cell-group>
                <van-field type="textarea" v-model="url" placeholder="請輸入吱口令"  :disabled="urlbeld" />
            </van-cell-group>
        </div>
        <div v-else-if="active==1" style="font-size: 15px">
            <div style="border-top: 1px solid #f6f7f8;padding: 10px">匯率：{{exchange}}</div>
            <div style="border-top: 1px solid #f6f7f8;padding: 10px">
                <b>商品信息</b>
            </div>
            <div class="commodity_list" v-for="(val,index) in OrderData.product_name" :key="index">
                <div style="width: 70%">{{val.product_name}}</div>
                <div style="width: 30%;color: #f90;text-align: right">{{val.product_price}}元</div>
            </div>
            <div class="commodity_list">
                <div>訂單合計金額</div>
                <div style="color: #f90">{{OrderData.robot_rmb}}元</div>
            </div>
            <div style="padding: 10px;">
                <b>請選擇付款方式</b>
            </div>
            <div style="padding: 10px;display: flex;justify-content: space-between;" @click="payment_method = '3'">
                <div style="display: flex;align-items: center">
                    <img src="../assets/image/rmb2.png" alt="" style="height: 30px;width: 30px">
                    <span>E幣餘額</span>&nbsp;&nbsp;
                    <span>￥{{OrderData.r_money==0?0.00:OrderData.r_money}}（不另新開手續費發票）</span>
                </div>
                <van-radio-group v-model="payment_method">
                    <van-radio name="3" checked-color="#4b0"></van-radio>
                </van-radio-group>
            </div>

            <!--<div style="padding: 10px;display: flex;justify-content: space-between;" @click="payment_method = '4'">-->
                <!--<div style="display: flex;align-items: center">-->
                    <!--<img src="../assets/image/UBOT.png" alt="" style="height: 30px;width: 30px">&nbsp;&nbsp;-->
                    <!--<div>-->
                        <!--<p>803 聯邦銀行</p>-->
                        <!--<p>支援全台各家銀行轉入，<span style="color: red">無每日三萬元限制</span></p>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<van-radio-group v-model="payment_method">-->
                    <!--<van-radio name="4" checked-color="#4b0"></van-radio>-->
                <!--</van-radio-group>-->
            <!--</div>-->

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

            <!--<div style="padding: 10px;display: flex;justify-content: space-between;" @click="payment_method = '6'">-->
                <!--<div style="display: flex;align-items: center">-->
                    <!--<img src="../assets/image/zhyh.png" alt="" style="height: 30px;width: 30px">&nbsp;&nbsp;-->
                    <!--<div>-->
                        <!--<p>009 彰化銀行</p>-->
                        <!--<p>支援全台各家銀行轉入，<span style="color: red">無每日三萬元限制</span></p>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<van-radio-group v-model="payment_method">-->
                    <!--<van-radio name="6" checked-color="#4b0"></van-radio>-->
                <!--</van-radio-group>-->
            <!--</div>-->

            <div style="padding: 10px;display: flex;justify-content: space-between;" @click="payment_method = '7'">
                <div style="display: flex;align-items: center">
                    <img src="../assets/image/guotai.jpg" alt="" style="height: 30px;width: 30px">&nbsp;&nbsp;
                    <div>
                        <p>013 國泰世華銀行</p>
                        <p>支援全台各家銀行轉入，<span style="color: red">無每日三萬元限制</span></p>
                    </div>
                </div>
                <van-radio-group v-model="payment_method">
                    <van-radio name="7" checked-color="#4b0"></van-radio>
                </van-radio-group>
            </div>

            <div style="padding: 10px;display: flex;justify-content: space-between;align-items: center" @click="payment_method = '2'">
                <div style="display: flex;align-items: center">
                    <img src="../assets/image/711-icon.png" alt="" style="height: 30px;width: 30px">&nbsp;&nbsp;
                    <div>
                        <p>7-11/全家/萊爾富/OK超商</p>
                        <p style="font-size: 14px;color: #f90">收取30元的手續費，不足30臺幣按30臺幣收取</p>
                        <p style="font-size: 14px;color: red">使用超商付款不能超過5970元新台幣</p>
                    </div>
                </div>
                <van-radio-group v-model="payment_method">
                    <van-radio name="2" checked-color="#4b0"></van-radio>
                </van-radio-group>
            </div>
            <div style="padding: 10px;" class="invoice">
                <b>手續費電子發票</b>
                <van-radio-group v-model="invoice_type" >
                    <van-cell-group>
                        <van-cell title="個人電子發票" clickable @click="invoice_type = '1'">
                            <van-radio name="1" />
                        </van-cell>
                        <div v-if="invoice_type==1" style="border-bottom: 1px solid #e7e7e7">
                            <van-field
                                    v-model="PersonalEmail"
                                    label="E-mail"
                                    placeholder="請輸入您的電子郵箱"
                                    :error-message=PersonalEmailerror_message
                            >
                                <van-button slot="button" size="mini" type="primary" @click="PersonalEmail = merber_email">填入預設</van-button>
                            </van-field>
                        </div>
                        <van-cell title="捐贈發票" clickable @click="invoice_type = '2'">
                            <van-radio name="2" />
                        </van-cell>
                        <div v-if="invoice_type==2" style="border-bottom: 1px solid #e7e7e7">
                            <div style="display: flex">
                                <van-field
                                        v-model="LoveCode"
                                        border
                                        label="愛心碼"
                                        placeholder="如未填入将随机捐赠"
                                        :error-message=LoveCodeerror_message
                                >
                                </van-field>
                            </div>
                        </div>
                        <van-cell title="公司電子發票" clickable @click="invoice_type = '3'">
                            <van-radio name="3" />
                        </van-cell>
                        <div v-if="invoice_type==3" style="border-bottom: 1px solid #e7e7e7">
                            <div style="padding: 10px 15px;color: red">
                                發票皆透過Email的方式寄出電子發票形式開立，恕不提供紙本。
                                若是須開立統編發票，統編發票將於付款完成15天內以pdf格式寄到您的電子信箱。可以直接將pdf檔列印下來報帳
                            </div>
                            <van-field
                                    v-model="companyEmail"
                                    label="E-mail"
                                    placeholder="請輸入您的電子郵箱"
                                    :error-message=companyEmailerror_message
                            >
                                <van-button slot="button" size="mini" type="primary" @click="companyEmail = merber_email">填入預設</van-button>
                            </van-field>
                            <van-field
                                    v-model="company_num"
                                    border
                                    label="公司統編"
                                    placeholder="請輸入您公司統一編號"
                                    :error-message=company_numerror_message
                            >
                            </van-field>
                            <van-field
                                    v-model="company_name"
                                    border
                                    label="公司名稱"
                                    placeholder="請輸入公司名稱"
                                    :error-message=company_nameerror_message
                            >
                            </van-field>
                            <van-field
                                    v-model="company_add"
                                    border
                                    label="公司地址"
                                    placeholder="請輸入您公司地址"
                                    :error-message=company_adderror_message
                            >
                            </van-field>
                        </div>
                        <van-cell title="載具/自然人憑證" clickable @click="invoice_type = '4'">
                            <van-radio name="4" />
                        </van-cell>
                        <div v-if="invoice_type==4" style="border-bottom: 1px solid #e7e7e7">
                            <van-field
                                    v-model="CarruerNum"
                                    border
                                    label="請輸入編碼"
                                    placeholder="/○○○○○○○○"
                                    :error-message=CarruerNumerror_message
                            >
                            </van-field>
                        </div>
                    </van-cell-group>
                </van-radio-group>
            </div>

        </div>
        <div v-else-if="active==2" style="font-size: 15px" >
            <div>
                <div class="orderdata_head">
                    <span><b>訂單狀態</b></span>
                    <span class="zhuantai" v-if="createorderdata.order_state==4" style="background:#004bd9" >等待付款</span>
                    <span class="zhuantai" v-else style="background:#FFA801">等待付款</span>

                </div>
                <div class="orderdata_body">
                    <div>
                        <span>訂單編號</span>
                        <span>{{createorderdata.order_num}}</span>
                    </div>
                    <div>
                        <span>匯率</span>
                        <span style="color: #19be6b"><b>{{createorderdata.exchange}}</b></span>
                    </div>
                    <div>
                        <span>應付款(新台幣)</span>
                        <span style="color: #ed3f14"><b>{{createorderdata.robot_twd}}</b></span>
                    </div>
                    <div>
                        <span>交易創建時間</span>
                        <span>{{createorderdata.create_time |convTimehms}}</span>
                    </div>
                </div>
            </div>
            <div>
                <div class="orderdata_head">
                    <span><b>商品信息</b></span>
                    <span></span>
                </div>
                <div class="orderdata_body">
                    <div class="commodity_list" v-for="val in createorderdata.product_name">
                        <div style="width: 70%">{{val.product_name}}</div>
                        <div style="width: 30%;color: #f90;text-align: right">{{val.product_price}}元</div>
                    </div>
                    <div class="commodity_list">
                        <div>訂單合計金額</div>
                        <div style="color: #f90">{{createorderdata.robot_rmb}}元</div>
                    </div>
                </div>
            </div>
            <div>
                <div class="orderdata_head">
                    <span><b>付款方式</b></span>
                    <span v-if="createorderdata.payment_method==1">玉山銀行</span>
                    <span v-if="createorderdata.payment_method==4">聯邦銀行</span>
                    <span v-if="createorderdata.payment_method==7">國泰世華銀行</span>
                    <span v-if="createorderdata.payment_method==6">彰化銀行</span>
                    <span v-if="createorderdata.payment_method==2">超商付款</span>
                    <span v-if="createorderdata.payment_method==3">E幣餘額</span>
                    <span v-if="createorderdata.payment_method==5">E幣餘額 + 補款</span>
                </div>
                <div class="orderdata_body">
                    <div v-if="createorderdata.payment_method==1">
                        <span>您的虛擬帳戶</span>
                        <span>{{createorderdata.payment_account}}</span>
                    </div>
                    <div v-if="createorderdata.payment_method==2">
                        <span>您的超商代碼</span>
                        <span>{{createorderdata.payment_account}}</span>
                    </div>
                    <div v-if="createorderdata.payment_method==3">
                        <span>您的E幣餘額</span>
                        <span>{{(createorderdata.r_money*1).toFixed(2)}}</span>
                    </div>
                    <div v-if="createorderdata.payment_method==5">
                        <span>補款金額(新臺幣)</span>
                        <span>${{createorderdata.withhold_twd}}</span>
                    </div>
                    <div v-if="createorderdata.payment_method==5">
                        <span>補款方式</span>
                        <span v-if="createorderdata.withhold_type==1">玉山銀行</span>
                        <span v-if="createorderdata.withhold_type==2">超商補款</span>
                        <span v-if="createorderdata.withhold_type==7">國泰世華銀行</span>
                        <span v-if="createorderdata.withhold_type==4">聯邦銀行</span>
                        <span v-if="createorderdata.withhold_type==6">彰化銀行</span>
                    </div>
                    <div v-if="createorderdata.payment_method==5">
                        <span>補款帳戶</span>
                        <span>{{createorderdata.payment_account}}</span>
                    </div>
                    <div>
                        <span style="display:flex;align-items: center;color: #ed3f14"><van-icon name="clock-o" />請在24小時內完成付款，超時訂單自動取消</span>
                    </div>
                </div>
            </div>
            <div>
                <div class="orderdata_head">
                    <span><b>發票</b></span>
                    <span></span>
                </div>
                <div class="orderdata_body">
                    <div>
                        <span>本訂單無手續費，故不開立發票。</span>
                    </div>

                </div>
            </div>
            <div>
                <div class="orderdata_head">
                    <span><b>訂單留言</b></span>
                    <span></span>
                </div>
                <div class="orderdata_body">
                    <div style="height: 50px">
                        <span>暫無留言！</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flexbottom">
            <van-button type="danger" style="width: 50%" @click="cancel_order">{{ lefttext}}</van-button>
            <van-button type="primary" style="width: 50%" @click="createorder" :disabled="nextbeld">{{nextText}}</van-button>
        </div>
        <div style="height: 50px"></div>
        <div v-show="loding" style="width:100%;height: 100%;z-index: 9999;position:fixed;top: 0;background-color:rgba(0,0,0,0.4)">
            <div style="position: relative;top:45%;text-align: center;width: 100%">
                <van-loading color="#fff" style="margin: 0 auto " size="40px"/>
            </div>
        </div>
        <div v-html="chaoshang" style="opacity: 0"></div>
        <van-popup v-model="Supplement" style="width: 100%;padding: 10px" :close-on-click-overlay="false">
            <p style="font-size: 15px;text-align: center;padding: 10px 0">您的E幣餘額不足{{OrderData.robot_rmb}},需補款 <span style="color: red">￥{{OrderData.robot_rmb-OrderData.r_money}}</span>，請選擇補款方式。</p>
            <van-radio-group v-model="withhold_type">
                <van-cell-group>
                    <!--<van-cell title="聯邦銀行" clickable @click="withhold_type = '4'">-->
                        <!--<van-radio slot="right-icon" name="4" />-->
                    <!--</van-cell>-->
                    <!--<van-cell title="玉山銀行" clickable @click="withhold_type = '1'">-->
                        <!--<van-radio slot="right-icon" name="1" />-->
                    <!--</van-cell>-->
                    <van-cell title="超商補款" clickable @click="withhold_type = '2'">
                        <van-radio slot="right-icon" name="2" />
                    </van-cell>
                    <!--<van-cell title="彰化銀行" clickable @click="withhold_type = '6'">-->
                        <!--<van-radio slot="right-icon" name="6" />-->
                    <!--</van-cell>-->
                    <van-cell title="國泰世華銀行" clickable @click="withhold_type = '7'">
                        <van-radio slot="right-icon" name="7" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <div>
                <van-button type="primary" size="large" @click="BKcreateorderajax">確定並送出</van-button>
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
                            <el-button type="primary" @click="slideshow = false" :disabled="yzm.bled">{{yzm.text}}</el-button>
                        </div>
                        <div class="bottombt" > <el-button type="primary" @click="EBcreateorderajax" :disabled="EBsubdaifubled">送出並驗證</el-button></div>
                    </div>
                </div>
                <div class="slide-verify" :style="{color:textcolor}" >{{msg}}</div>
            </div>
        </van-dialog>
        <van-popup v-model="toolTipbox" style="width: 70%;padding:  20px" :close-on-click-overlay="false">
            <p style="font-size: 18px;line-height: 30px;font-weight: bold">您好，礙於支付寶管制嚴重，提交代付金額限額不可超過5000人民幣。請拆單處理。</p>
            <div style="margin-top: 30px">
                <van-button type="primary" size="large" @click="goindex">確定</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    export default {
        inject:['reload'],
        data: function () {
            return {
                msg: '',   //提示内容
                textcolor:'#46ce04', //提示文字颜色
                toolTipbox:false,
                dragverify:false, //验证弹出框
                slideshow:true,//滑块和手机验证码开关
                EBsubdaifubled:true,//E币补款提交按钮开关
                BKsubdaifubled:false,
                phone_code:'',//E币付款手机验证码
                platform_serve:20,//平台手续费

                Supplement:false, //补款弹出框
                withhold_type:'', //发票类型
                yzm:{
                    text:'獲取驗證碼',
                    time:60,
                    disabled:false,
                    num:3
                },
                merber_phone:'',
                merber_phcode:'',

                merber_id:Cookies.get('merber_id'),
                merber_name:Cookies.get('merber_name'),
                merber_email:Cookies.get('merber_email'),

                loding:false,
                chaoshang:'',
                active:0,
                OrderData:{},
                createorderdata:{},
                url:'',
                urlbeld:false,
                second:60,
                payment_method:'',
                isconfirm:false,
                exchange:'',
                nextText:'下一步',
                lefttext:"取消",
                order_id:'',
                nextbeld:false,//是否禁用下一步按钮

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
                //     type:'success',
                //     duration:1000,
                // });
                this.$http.post('https://www.trillionricher.com/Kv4I1llx6/get_check',{
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

            phonetimer() {
                this.yzm.disabled=true
                if (this.yzm.time > 0) {
                    this.yzm.time--;
                    this.yzm.text=this.yzm.time+"s後重新獲取";
                    setTimeout(this.phonetimer, 1000);
                } else{
                    this.yzm.time=0;
                    this.yzm.text="獲取驗證碼";
                    this.yzm.disabled=false;
                }
            },

            //获取汇率
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
            getexchange:function(){
                this.$http.post('https://www.trillionricher.com/1.0/exchange',{
                    exchange_type:1,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success===1){
                        this.exchange=res.body.data[0].exchange
                    }
                },function(res){
                    console.log(res);
                });
            },
            timer:function () {
                var _this=this
                var Toast=this.$toast
                const toast = Toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    loadingType: 'spinner',
                    message: '正在查詢您購買的商品，請等待 60 秒'
                });
                if(this.second>0){
                    this.second--;
                    toast.message = `正在查詢您購買的商品，請等待 ${this.second} 秒`;
                    this.$http.post('https://www.trillionricher.com/1.0/product_order',{
                        order_id:this.order_id
                    },{emulateJSON:true}).then(function(res){
                        if(res.body.success===0){
                            if(this.second>0){
                                setTimeout(this.timer, 1000);
                            }else {
                                if(this.$route.path=='/zkl'){
                                    toast.clear();
                                    this.$dialog.alert({
                                        message: '您目前排在訂單處理中的第<span style="color: red;font-weight: bold">'+res.body.data.line+'</span>位，預計處理時間 <span style="color: red;font-weight: bold">'+this.Transformation(res.body.data.line)+'</span>，離開當前頁面將繼續為您處理此訂單',
                                        showCancelButton:true,
                                        confirmButtonText:'離開當前頁',
                                        cancelButtonText: '繼續等待',
                                    }).then(() => {
                                        _this.$router.push({
                                            path:'/orderdata',
                                            query:{
                                                id:res.body.data.order_id
                                            }
                                        });
                                    }).catch(() => {
                                        _this.second=60
                                        setTimeout(this.timer, 1000);
                                    });
                                }
                            }

                        }else if(res.body.success===2){
                            toast.clear()
                            this.$dialog.alert({
                                message: '您的連結失效請重新獲取連結'
                            }).then(()=>{
                                    location.reload()
                                }
                            );
                        }else if(res.body.success===3){
                            this.toolTipbox = true

                        }else if(res.body.success===1){
                            this.OrderData=res.body.data
                            this.active=1
                            this.nextText='下一步'
                            this.lefttext='取消訂單'
                            this.nextbeld=false
                            toast.clear()
                        }
                    },function(res){
                    });
                }
            },
            //代付参数验证
            createorder:function () {
                var _this=this
                if(this.nextText=='下一步'){
                    if (this.active==1) {
                        if (this.payment_method==''){
                            this.$toast({
                                message:"請選擇付款方式",
                                type:"fail",
                                duration:1000
                            })
                        }else if(this.invoice_type==''){
                            this.$toast({
                                message:"請選擇發票處理方式",
                                type:"fail",
                                duration:1000
                            })
                        }else if(this.invoice_type==1){
                            var mailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)/g
                            if(this.PersonalEmail=='' || !mailReg.test(this.PersonalEmail)){
                                this.PersonalEmailerror_message='請輸入正確的郵箱格式'
                            }else {
                                this.merber_email = this.PersonalEmail
                                this.company_add=''//公司地址
                                this.company_num=''//公司编号
                                this.LoveCode=''//爱心
                                this.CarruerNum=''//载具编号
                                this.createorder_ajax()
                            }
                        }else if(this.invoice_type==2){
                            var codeReg=/^[0-9]{3,7}/
                            if(this.LoveCode==''){
                                var code=this.donation_num[Math.round(Math.random()*(this.donation_num.length-1))]
                                this.LoveCode=code.num
                                this.createorder_ajax()
                            }else if(!codeReg.test(this.LoveCode)){
                                this.LoveCodeerror_message='請輸入正確愛心碼'
                            }else {
                                this.merber_email = Cookies.get('merber_email')
                                this.company_add=''//公司地址
                                this.company_num=''//公司编号
                                this.CarruerNum=''//载具编号
                                this.createorder_ajax()
                            }
                        }else if(this.invoice_type==3){
                            var mailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)/g
                            if(!mailReg.test(this.companyEmail)){
                                this.companyEmailerror_message='請輸入正確的郵箱格式'
                            }else if(!this.isValidGUI(this.company_num)){
                                this.company_numerror_message='請輸入正確的公司編號'
                            }else if( this.company_add==''){
                                this.company_adderror_message='請輸入正確的公司地址'
                            }else if(this.company_name == ''){
                                this.company_nameerror_message='請輸入正確的公司名稱'
                            }else{
                                this.merber_email=this.companyEmail
                                this.LoveCode=''//爱心
                                this.CarruerNum=''//载具编号
                                this.createorder_ajax()
                            }
                        }else if(this.invoice_type==4){
                            var carReg=/^[A-Z]{2}[0-9]{14}$/
                            var car_tReg=/^\/{1}[0-9A-Z]{7}$/
                            var car2_Reg=/^\/[A-Z0-9\+\-\.]{7}$/
                            if(!carReg.test(this.CarruerNum) && !car_tReg.test(this.CarruerNum) && !car2_Reg.test(this.CarruerNum)){
                                this.CarruerNumerror_message='請輸入正確載具編碼(字母須大寫)'
                            }else {
                                this.merber_email = Cookies.get('merber_email')
                                this.company_add=''//公司地址
                                this.company_num=''//公司编号
                                this.LoveCode=''//爱心
                                this.createorder_ajax()
                            }
                        }else {
                            this.createorder_ajax()
                        }
                    }
                }else {
                    this.$router.push('/')
                }
            },
            //创建代付
            createorder_ajax:function(){
                var _this=this
                var twd=this.OrderData.robot_rmb*this.exchange
                if(this.payment_method==2 && twd>5970){
                    this.$toast({
                        message:'使用超商代付請勿超過5970元新臺幣！',
                        type:'fail',
                        duration:3000,
                    });
                }else if(this.payment_method==3 ){
                    if(Number(this.OrderData.r_money) <=0 ){
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
                        order_id:this.order_id,
                        merber_id:this.merber_id,
                        token:this.OS.token,
                        is_mobile:1,
                        payment_method:this.payment_method,
                        alipay_type:this.alipay_type,
                        service_charge:'',
                        remarks:'',
                        platform_serve:this.platform_serve,//平台手续费
                        invoice_type:this.invoice_type,//发票方式
                        CustomerEmail:this.merber_email,
                        CustomerAddr:this.company_add,//公司地址
                        CustomerIdentifier:this.company_num,//公司编号
                        LoveCode:this.LoveCode,//爱心码
                        CustomerName:this.invoice_type==3?this.company_name:this.merber_name,//名字
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
                        }
                    },function(res){

                    });
                }
            },
            //E币付款
            EBcreateorderajax:function(){
                var _this=this
                this.nextbeld=true

                if(this.phone_code == ""){
                    this.$toast({
                        message:'請輸入正確得驗證碼！',
                        type:'fail',
                        duration:3000,
                    });
                }else {

                    if(Number(this.OrderData.r_money) >= Number(this.OrderData.robot_rmb)){
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
                            order_id:this.order_id,
                            merber_id:this.merber_id,
                            token:this.OS.token,
                            is_mobile:1,
                            payment_method:this.payment_method,
                            alipay_type:this.alipay_type,
                            service_charge:'',
                            remarks:'',
                            withhold_type:this.withhold_type,
                            payment_code:this.phone_code,
                            invoice_type:this.invoice_type,//发票方式
                            CustomerEmail:this.merber_email,
                            platform_serve:0,//平台手续费

                            merber_phone:this.merber_phone,
                            CustomerAddr:this.company_add,//公司地址
                            CustomerIdentifier:this.company_num,//公司编号
                            LoveCode:this.LoveCode,//爱心码
                            CustomerName:this.invoice_type==3?this.company_name:this.merber_name,//名字
                            CarruerNum:this.CarruerNum,//载具编号
                        },{emulateJSON:true}).then(function(res){
                            this.loding=false
                            this.EBsubdaifubled = false
                            if(res.body.success==-1){
                                this.Logout()
                            }else if(res.body.success===1){
                                this.Supplement=false
                                if(this.withhold_type==2){
                                    this.loding=true
                                    this.chaoshang=res.body.data
                                    window.setTimeout(function () {
                                        document.getElementById("__ecpayForm").submit();
                                    },100)
                                }else{
                                    if(res.body.data.payment_method==1 || res.body.data.payment_method==5){
                                        this.$toast({
                                            message:'您的虛擬付款帳號已經通過短信發送到您的手機',
                                            type:'success',
                                            duration:3000,
                                        });
                                    }else if(res.body.data.payment_method==3){
                                        this.$toast({
                                            message:'付款成功！',
                                            type:'success',
                                            duration:3000,
                                        });
                                    }
                                    this.dragverify = false
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
                    order_id:this.order_id,
                    merber_id:this.merber_id,
                    token:this.OS.token,
                    is_mobile:1,
                    payment_method:this.payment_method,
                    alipay_type:this.alipay_type,
                    service_charge:'',
                    remarks:'',
                    platform_serve:this.platform_serve,//平台手续费
                    withhold_type:this.withhold_type,
                    payment_code:this.paypwd,
                    invoice_type:this.invoice_type,//发票方式
                    CustomerEmail:this.merber_email,
                    CustomerAddr:this.company_add,//公司地址
                    CustomerIdentifier:this.company_num,//公司编号
                    LoveCode:this.LoveCode,//爱心码
                    CustomerName:this.invoice_type==3?this.company_name:this.merber_name,//名字
                    CarruerNum:this.CarruerNum,//载具编号
                },{emulateJSON:true}).then(function(res){
                    this.BKsubdaifubled = false
                    if(res.body.success==-1){
                        this.Logout()
                    }else if(res.body.success===1){
                        this.dragverify = false
                        this.Supplement=false
                        if(this.withhold_type==2){
                            this.loding=true
                            this.chaoshang=res.body.data
                            window.setTimeout(function () {
                                document.getElementById("__ecpayForm").submit();
                            },100)
                        }else{
                            if(res.body.data.payment_method==1 || res.body.data.payment_method==5){
                                this.$toast({
                                    message:'您的虛擬付款帳號已經通過短信發送到您的手機',
                                    type:'success',
                                    duration:3000,
                                });
                            }else if(res.body.data.payment_method==3){
                                this.$toast({
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
                    }
                },function(res){

                });
            },
            cancel_order:function(){
                var _this=this
                if(this.lefttext=='取消'){
                    this.$router.push('/');
                }  else {
                    this.$http.post('https://www.trillionricher.com/1.0/cancel_order',{
                        order_id:this.order_id,
                    },{emulateJSON:true}).then(function(res){
                        if(res.body.success===1){
                            this.$toast({
                                message:'訂單已取消',
                                type:'success',
                                duration:1000,
                            });
                            setTimeout(function (){
                                _this.$router.push('/')
                                _this.$router.go(0)
                            },1000);
                        }
                    },function(res){
                        console.log(res);
                    });
                }
            },
            check_order:function () {
                var Unfulfilled_order=this.$route.query.Unfulfilled_order
                if(Unfulfilled_order==true){
                    this.$http.post('https://www.trillionricher.com/1.0/history_order',{
                        merber_id: this.merber_id,
                        token:this.OS.token
                    },{emulateJSON:true}).then(function(res){
                        if(res.body.success==-1){
                            this.Logout()
                        }else if(res.body.success==1){
                            this.order_id=res.body.data.order_id
                            this.OrderData=res.body.data
                            this.active=1
                        }
                    },function(res){
                        console.log(res);
                    });
                }else {
                    this.$http.post('https://www.trillionricher.com/1.0/check_order',{
                        merber_id: this.merber_id,
                        token:this.OS.token,
                        service_type: 1
                    },{emulateJSON:true}).then(function(res){
                        if(res.body.success==-1){
                            this.Logout()
                        }else if(res.body.success==0){
                            this.$router.push({path: '/zkl'})
                            this.CustomerEmail=res.body.data.merber_email
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
                    console.log(res);
                });
            },
            Openandclose:function () {
                this.$http.post('https://www.trillionricher.com/1.0/notice_switch',{},
                    {emulateJSON:true}).then(function(res){

                    if(res.body.success==1){
                        var oac = res.body.data[2]

                        if(oac.switch == 2){
                            console.log(1);
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
                    console.log(res);
                });
            }

        },
        computed: {},
        watch: {
            url:function (url) {
                if (url == ''  || /^#给我转账#.*$/.test(url)) {
                    this.$toast({
                        message:'請輸入正確的吱口令',
                        type:'fail',
                        duration:1000,
                    });
                }else{
                    this.urlbeld=true
                    this.nextbeld=true
                    this.getexchange()//获取当前汇率
                    this.$http.post('https://www.trillionricher.com/1.0/submit_url',{
                        merber_id:this.merber_id,
                        token:this.OS.token,
                        service_type:1,
                        pay_url:this.url,
                        exchange_rate:this.exchange,
                        order_money:0,
                        pay_number:0,
                    },{emulateJSON:true}).then(function(res){
                        if(res.body.success==-1){
                            this.Logout()
                        }else if(res.body.success===1){
                            this.nextText="等待錄入商品和金額"
                            this.order_id=res.body.data.order_id
                            this.timer()
                        }else if(res.body.success===3){
                            this.$toast({
                                message:'這個代付連結已經提交過啦！',
                                type:'fail',
                                duration:1000,
                            });
                        }
                    },function(res){
                        console.log(res);
                    });
                }
            }
        },
        created: function () {
            this.Openandclose()
        }

    }
</script>
<style>
    *{
        box-sizing: border-box;
    }
    .url .van-field__body textarea{
        height: 100px;
        background-color: #e6e6e6;
        border-radius: 5px;
        padding:10px 20px;
    }
    .van-steps{
        width: 100%;
        z-index: 1000;
    }
    .Createorder{
        width:100%;
        position: fixed;
        bottom: 50px;
        padding: 10px;
        display: flex;
        flex-direction: row-reverse;
        background-color: #fff;
    }
    .Createorder .van-button{

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
