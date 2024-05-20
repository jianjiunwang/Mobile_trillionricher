<template>
    <div class="personal">
        <div class="pagetitle">
            <div>
                <router-link to="/personal">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>修改密碼</b></span>
                </router-link>
            </div>
        </div>
        <van-field
                v-model="merber_password"
                placeholder="請輸入當前密碼"
                label="目前密碼"
                :icon="pwdicon"
                :type="pwdtype"
                @click-icon="showpwd"
        ></van-field>
        <van-field
                v-model="phoneyzm"
                placeholder="請輸入驗證碼"
                maxlength="6"
                label="驗證碼"
        >
            <van-button slot="button" size="small" type="primary" :disabled="phoneyzmdata.disabled" @click="dragverify = true">{{phoneyzmdata.btntext}}</van-button>
        </van-field>
        <van-field
                v-model="merber_up_password"
                placeholder="請輸入新密碼"
                label="新密碼"
                :icon="pwdicon"
                :type="pwdtype"
                @click-icon="showpwd"
        ></van-field>
        <van-field
                v-model="merber_up__password"
                placeholder="請確定新密碼"
                label="確定新密碼"
                :icon="pwdicon"
                :type="pwdtype"
                @click-icon="showpwd"
        ></van-field>
        <div style="padding: 0 15px;margin-top: 20px">
            <van-button  size="small" type="primary" small block  class="uodata_bt" @click="uppwd" :disabled="uppwdbled"> 送出並儲存</van-button>
        </div>
        <div class="toast"></div>
        <van-dialog v-model="dragverify" title="請進行驗證" :showConfirmButton="false" :closeOnClickOverlay="true">
            <div style="padding: 30px 10px;font-size: 18px;font-weight: bold;margin: 0 auto"  >
                <slide-verify :l="42"
                              :r="10"
                              :w="270"
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
                msg: '',   //提示内容
                textcolor:'#46ce04', //提示文字颜色
                pwdicon:'closed-eye',
                pwdtype:'password'  ,//密码输入框显示或隐藏密码
                merber_password:'',//当前密码
                merber_up_password:'',//新密码
                merber_up__password:'',//重复新密码
                phoneyzm:'',//验证码
                phoneyzmdata:{
                    disabled:false,
                    btntext:'獲取驗證碼',
                    time:'60',
                    num:3
                },
                uphone:this.$route.params.phone,
                dragverify:false,//滑块验证弹出框
                merber_phone:'',//用户手机
                uppwdbled:true,
            }
        },
        components: {},
        methods: {
            onSuccess(times){
                this.dragverify = false
                this.uppwdbled = false
                this.$http.post('https://www.trillionricher.com/1.0/forget_pad_code',{
                    merber_phone:this.merber_phone,
                },{emulateJSON:true}).then(function(res){
                    this.$refs.slideblock.reset();
                    if(res.body.success===1){
                        this.phoneyzmdata.disabled=true
                        this.phoneyzmdata.time=60
                        this.timer();
                        this.$toast({
                            message:'驗證碼已發送！',
                            type:'success',
                            duration:1000,
                        });
                    }else {
                        this.$toast({
                            message:'網絡錯誤',
                            type:'fail',
                            duration:1000,
                        });
                    }
                },function(res){
                    console.log(res);
                });
            },
            onFail(){
                this.textcolor = "#f56c6c"
                this.msg = '驗證未通過，請從新認證!'
            },
            onRefresh(){
                this.msg = ''
            },
            onAgain() {
                console.log('检测到非人为操作的哦！');
                this.msg = 'try again';
                // 刷新
                this.$refs.slideblock.reset();
            },
            timer() {
                if (this.phoneyzmdata.time > 0) {
                    this.phoneyzmdata.time--;
                    this.phoneyzmdata.btntext=this.phoneyzmdata.time+"s後重新獲取";
                    setTimeout(this.timer, 1000);
                } else{
                    this.phoneyzmdata.time=0;
                    this.phoneyzmdata.btntext="獲取驗證碼";
                    this.phoneyzmdata.disabled=false;
                }
            },
            showpwd:function () {
                if(this.pwdtype==='password'){
                    this.pwdtype='text'
                    this.pwdicon='eye-o'
                }else {
                    this.pwdtype='password'
                    this.pwdicon='closed-eye'
                }
            },
            uppwd:function(){
                var pwdReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{10,20}$/
                if(!pwdReg.test( this.merber_up_password)){
                    this.$toast({
                        message:'密碼必須由數位和字母組成且10-20位',
                        type:'fail',
                        duration:2000,
                    });
                }else if(this.merber_up_password!==this.merber_up__password){
                    this.$toast({
                        message:'兩次輸入密碼不一致!',
                        type:'fail',
                        duration:2000,
                    })
                }else {
                    this.uppwdbled  = true
                    this.$http.post('https://www.trillionricher.com/1.0/up_pwd',{
                        merber_id:this.OS.merber_id,
                        token:this.OS.token,
                        merber_password:this.merber_password,
                        merber_phcode:this.phoneyzm,
                        merber_up_password:this.merber_up_password
                    },{emulateJSON:true}).then(function(res){
                        this.uppwdbled  = false
                        if(res.body.success==-1){
                            this.$toast({
                                message:'登入過期，請重新登入！',
                                type:'fail',
                                duration:3000,
                            });
                            this.$router.push({path: '/login'})
                            this.Logout()
                        }else if(res.body.success==0){
                            this.$toast({
                                message:'當前密碼錯誤',
                                type:'fail',
                                duration:1000,
                            });
                        }else if(res.body.success==5){
                            this.$toast({
                                message:res.body.msg,
                                type:'fail',
                                duration:1000,
                            });
                        }else if(res.body.success==1){
                            this.$toast({
                                message:'密碼修改成功！',
                                type:'success',
                                duration:1000,
                            });
                            this.$router.push('/account');
                        }else if(res.body.success==3){
                            if(this.phoneyzmdata.num <=1 ){
                                this.$toast({
                                    message:"請核對您的手機號碼",
                                    type:'fail',
                                    duration:2000,
                                });
                                this.reload();
                            }else {
                                this.phoneyzm==''
                                this.phoneyzmdata.num--
                                this.$toast({
                                    message:"驗證碼錯誤，您還有"+this.phoneyzmdata.num+"次機會",
                                    type:'fail',
                                    duration:3000,
                                });
                            }
                        }
                    },function(res){
                        console.log(res);
                    });
                }
            },
            getphone:function () {
                this.$http.post('https://www.trillionricher.com/1.0/order_bank_alipay',{
                    merber_id: this.OS.merber_id,
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
            }

        },
        computed: {},
        watch: {},
        mounted: function () {
            this.getphone()
        }
    }
</script>

