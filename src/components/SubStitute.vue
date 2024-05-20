<template>
    <div class="substitute" v-loading="product_order_loading" :element-loading-text="product_order_text"  element-loading-background="rgba(0, 0, 0, 0.7)">
        <div class="pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>支付寶代購</b></span>
                </router-link>
            </div>
        </div>
        <div class="substitute_body">
            <div class="sub_select">
                <span class="subtype_title">代付類型</span>
                <el-select v-model="alipay_type" placeholder="請選擇代付類型" size="small">
                    <el-option
                            class="optinlist"
                            v-for="item in typelist"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="sub_select">
                <span class="subtype_title">代付金額</span>
                <van-field
                        v-model="userRMB"
                        clearable
                        placeholder="請輸入代付金額"
                >
                </van-field>
            </div>
            <div class="getalipay">
                <van-button size="small" style="background-color: #00A0E9"  @click="getalipay">獲取朋友帳號</van-button>
                <van-button size="small" style="background-color: #A40000"  @click="getalipay">更換朋友賬號</van-button>
            </div>
            <div class="sub_select" v-show="showalipay">
                <span class="subtype_title">您的帳戶</span>
                <van-cell class="zfb"   @click="Cope" :value="zfb" :data-clipboard-text='zfb'>
                    <van-icon slot="right-icon"  class="custom-icon" >複製</van-icon>
                </van-cell>
            </div>
            <div class="sub_select">
                <span class="subtype_title">代付連結</span>
                <van-field  v-model="url" placeholder="請輸入代付連結"  :disabled="urlbeld" />
            </div>
            <div class="subnest">
                <van-button size="small" block style="background-color: #EFB300;border-radius: 10px" @click="gopay" :disabled="BKsubdaifubled"  >下一步</van-button>
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
    import Clipboard from 'clipboard';
    let rst=new Clipboard('.zfb');
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
                platform_serve:20,//平台手续费
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
                product_order_text:'',
                product_order_loading:false,
                exchange:'',//当前汇率
                order_id:'',//订单号
                urlbeld:false,//是否禁用url输入框
                nextbeld:false,//是否禁用下一步按钮
                nextText:'下一步',//下一步内文本
                second:60,//商品信息请求时长
                OrderData:'' ,//商品明细数据
                createorderdata:{}//创建订单后返回的数据


            }
        },
        components: {},
        methods: {

            gopay:function(){
                var re =/^\d+(\.\d+)?$/;
                var reurl1 = /^https:\/\/shenghuo.alipay.com:443\/peerpaycore\/confirmPeerPay.htm\?id=.*$/
                var reurl2 = /^https:\/\/shenghuo.aliphtay.com:443\/peerpaycore\/confirmPeerPay.htm\?id=.*$/
                var reurl3 = /^https:\/\/shenghuo.alipay.com\/peerpaycore\/confirmPeerPay.htm\?id=.*$/
                var reurl4= /^#吱口令#长按复制此条消息.*$/
                var reurl5 = /^亲，打开支付宝APP首页搜索就可以帮我付款啦{1}[0-9a-zA-Z]{10,}$/

                if(this.alipay_type == ''){
                    this.$toast({
                        message:'請選擇商品類型',
                        type:'fail',
                        duration:1000,
                    });
                    return false
                }
                if(this.userRMB=='' || !re.test(this.userRMB)){
                    this.$toast({
                        message:'請輸入正確的金額',
                        type:'fail',
                        duration:1000,
                    });
                    return false
                }
                if(this.zfb == ''){
                  this.$toast({
                    message:'請先獲取朋友賬號',
                    type:'fail',
                    duration:1000,
                  });
                  return false
                }
                if (!reurl1.test(this.url) && !reurl2.test(this.url) && !reurl3.test(this.url)){
                    this.$toast({
                        // message:'請輸入正確的連結或吱口令',
                        message:'請粘貼正確的代付連結,吱口令代付目前維護中',
                        type:'fail',
                        duration:1000,
                    });
                    return false
                }
                this.product_order_loading = true
                this.$http.post('https://www.trillionricher.com/1.0/submit_url',{
                    merber_id:this.merber_id,
                    token:this.OS.token,
                    service_type:1,
                    pay_url:this.url,
                    exchange_rate:this.exchange,
                    order_money:this.userRMB,
                    pay_number:this.zfb
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else if(res.body.success===1){
                        this.order_id=res.body.data.order_id
                        this.product_order_text="等待錄入商品和金額"
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
            },
            Cope:function () {
                this.$toast({
                    message:"複製成功",
                    type:"success",
                    duration:1000
                })
            },
            submit_url:function(){
                this.urlbeld=true
                this.nextbeld=true
                this.getexchange()//获取当前汇率
                this.$http.post('https://www.trillionricher.com/1.0/submit_url',{
                    merber_id:this.merber_id,
                    token:this.OS.token,
                    service_type:1,
                    pay_url:this.url,
                    exchange_rate:this.exchange,
                    order_money:this.userRMB,
                    pay_number:this.zfb
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else if(res.body.success===1){
                        this.order_id=res.body.data.order_id
                        this.nextText="等待錄入商品和金額"
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
            },
            timer:function () {
                var _this=this
                if(this.second>0){
                    this.second--;
                    this.product_order_text = `我們正在幫您錄入代付商品和金額…請等待 ${this.second} 秒`;
                    this.$http.post('https://www.trillionricher.com/1.0/product_order',{
                        merber_id:this.merber_id,
                        token:this.OS.token,
                        order_id:this.order_id
                    },{emulateJSON:true}).then(function(res){
                        if(res.body.success===0){
                            if(this.second>0){
                                setTimeout(this.timer, 1000);
                            }else {
                                if(this.$route.path=='/substitute'){
                                    toast.clear();
                                    this.$dialog.alert({
                                        message: '您目前排在訂單處理中的第<span style="color: red;font-weight: bold">'+res.body.data.line+'</span>位，預計處理時間 <span style="color: red;font-weight: bold">'+this.Transformation(res.body.data.line)+'</span>，離開當前頁面將繼續為您處理此訂單',
                                        showCancelButton:true,
                                        confirmButtonText:'離開當前頁',
                                        cancelButtonText: '繼續等待',
                                    }).then(() => {
                                        _this.$router.push({
                                            path:'/substitute_two',
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
                        }else if(res.body.success===1){
                            this.$router.push({
                                path:'/substitute_two',
                                query:{
                                    id:res.body.data.order_id
                                }
                            });
                        }else if(res.body.success===3){
                            _this.$router.push({
                                path:'/orderdata',
                                query:{
                                    id:Number(res.msg)
                                }
                            });
                            this.$toast({
                                message:'您好，新會員代付金額限制5000，如有大額需求請與客服聯絡開通',
                                type:'fail',
                                duration:3000,
                            });

                        }
                    },function(res){
                        console.log(res);
                    });
                }
            },
            //获取朋友账户
            getalipay:function () {
                var re =/^\d+(\.\d+)?$/;
                if(this.alipay_type==''){
                    this.$toast({
                        message:'請選擇商品類型',
                        type:'fail',
                        duration:1000,
                    });
                }else if(this.userRMB=='' || !re.test(this.userRMB)){
                    this.$toast({
                        message:'請輸入正確的金額',
                        type:'fail',
                        duration:1000,
                    });
                }else {
                    this.$http.post('https://www.trillionricher.com/1.0/get_alipay',{
                        merber_id:this.merber_id,
                        token:this.OS.token,
                        alipay_type:this.alipay_type,
                        robot_rmb:this.userRMB,
                    },{emulateJSON:true}).then(function(res){
                        if(res.body.success==-1){
                            this.Logout()
                        }else if(res.body.success===1){
                            this.showalipay = true
                            this.pengyouzh=true
                            this.zfb=res.body.data
                        }
                    },function(res){
                        console.log(res);
                    });
                }
            },
            //获取汇率
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
            history_order:function(){
                this.$http.post('https://www.trillionricher.com/1.0/history_order',{
                    merber_id: this.merber_id,
                    token:this.OS.token
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else if(res.body.success==1){
                        this.$router.push({
                            name: 'Two',
                            params:{
                                id:res.body.data.order
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
            check_order:function(){
                this.$http.post('https://www.trillionricher.com/1.0/check_order',{
                    merber_id: this.merber_id,
                    token:this.OS.token,
                    service_type: 1
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                        return false
                    }
                    if(res.body.success==0){
                        this.$router.push({path: '/substitute'})
                        this.CustomerEmail=res.body.data.merber_email
                    }
                    if (res.body.success == 3){
                        this.$router.push({path: '/'})
                        this.$toast({
                            message:'請先完成身份認證',
                            type:'fail',
                            duration:3000,
                        });
                        return false
                    }
                    if (res.body.success == 4){
                        this.$router.push({path: '/'})
                        this.$toast({
                            message:'請先完成文件認證',
                            type:'fail',
                            duration:3000,
                        });
                        return false
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

                        if(oac.switch == 1){
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
                                this.history_order()
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
        },
        created: function () {
            this.Openandclose()
        }
    }
</script>
