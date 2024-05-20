<template>
    <div class="login">
        <div class="pagetitle">
            <div>
                <router-link to="/personal">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>重置密碼</b></span>
                </router-link>
            </div>
        </div>
        <div class="forgotpassword">
            <div  v-show="wjmmtext">親愛的用戶您好，為提升安全性，請重新修改密碼(英數組合10-20位)。</div>
            <van-field
                    v-model="merber_phone"
                    placeholder="手機號碼"
                    label="手機號碼"
            >
                <van-button slot="button" size="small" type="primary" :disabled="phoneyzmdata.disabled" @click="fphoneyzm">{{phoneyzmdata.btntext}}</van-button>
            </van-field>
            <van-field
                    v-model="merber_phcode"
                    placeholder="請輸入6位數字驗證碼"
                    label="驗證碼"
            ></van-field>
            <van-field
                    v-model="merber_password"
                    placeholder="密碼必須由數位和字母組成且 10-20 位"
                    label="新密碼"
                    :icon="pwdicon"
                    :type="pwdtype"
                    @click-icon="showpwd"
            ></van-field>
            <van-field
                    v-model="merber_up_password"
                    placeholder="請確定新密碼"
                    label="確定新密碼"
                    :icon="pwdicon"
                    :type="pwdtype"
                    @click-icon="showpwd"
            ></van-field>
            <div style="padding: 0 20px;margin-top: 20px">
                <van-button size="small" block type="primary" small style="height: 40px;line-height: 40px" @click="forget_pad" :disabled="forget_padbeld"> 確定送出 </van-button>
            </div>
        </div>

        <van-dialog v-model="wjmmdragverify" title="請進行驗證" :showConfirmButton="false" :closeOnClickOverlay="true">
            <div style="padding: 30px 10px;font-size: 18px;font-weight: bold;margin: 0 auto"  >
                <slide-verify :l="42"
                              :r="10"
                              :w="270"
                              :h="155"
                              :imgs="imgs"
                              :accuracy="3"
                              ref="slidewjmm"
                              slider-text="向右滑動 >>>"
                              style="margin: 0 auto"
                              @success="wjmmonSuccess"
                              @fail="wjmmonFail"
                              @refresh="wjmmonRefresh"
                              @again="wjmmonAgain"
                ></slide-verify>
                <div class="slide-verify" :style="{color:textcolor}" >{{wjmmmsg}}</div>
            </div>
        </van-dialog>
    </div>
</template>

<script>
    import Global from './Global'
    export default {
        data: function () {
            return {
                dragverify:false, //验证弹出框
                wjmmtext:false,//是否进行安全认证提示
                wjmmdragverify:false,//忘记密码弹出框
                msg: '',   //提示内容
                wjmmmsg:'',//忘记密码重置密码
                textcolor:'#46ce04', //提示文字颜色
                imgs:Global.imgs, //滑动图片
                url:"https://www.trillionricher.com/1.0/forget_pad/",
                forget_padbeld:true,//重置密码提交按钮禁止
                email_phone:'',//用户名
                password:'', //密码
                pwdicon:'closed-eye',
                pwdtype:'password',
                isPreservation:true,
                wjmmshow:false,
                merber_phone:'',
                merber_phcode:'',
                merber_password:'',
                merber_up_password:'',
                phoneyzmdata:{
                    disabled:false,
                    btntext:'獲取驗證碼',
                    time:'60',
                    num:3,
                },
            }
        },
        components: {},
        methods: {
            //重置密码滑动验证成功
            wjmmonSuccess(times){
                var _this=this
                this.forget_padbeld = false
                this.textcolor = "#46ce04"
                this.wjmmmsg = '驗證耗时'+(times / 1000).toFixed(1)+'s'
                if(this.merber_phone==''){
                    this.$toast({
                        message:'請輸入手機號碼',
                        type:'fail',
                        duration:1000,
                    });
                }else {

                    this.$http.post('https://www.trillionricher.com/1.0/forget_pad_code',{
                        merber_phone:this.merber_phone,
                    },{emulateJSON:true}).then(function(res){
                        this.wjmmdragverify = false
                        this.$refs.slidewjmm.reset();
                        if(res.body.success===1){
                            this.phoneyzmdata.disabled=true
                            this.phoneyzmdata.time=60
                            this.timer();
                            this.$toast({
                                message:'驗證碼已發送！',
                                type:'success',
                                duration:1000,
                            });
                        }else if(res.body.success===2){
                            this.$toast({
                                message:'此手機號未註冊',
                                type:'fail',
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
                }

            },
            //重置密码滑动验证失败
            wjmmonFail(){
                this.textcolor = "#f56c6c"
                this.msg = '驗證未通過，請從新認證!'
            },
            //重置密码滑动图片刷新
            wjmmonRefresh(){
                this.msg = ''
            },
            //重置密码检查为非人为操作回调
            wjmmonAgain() {
                console.log('检测到非人为操作的哦！');
                this.msg = 'try again';
                // 刷新
                this.$refs.slideblock.reset();
            },
            onClickLeft:function(){
                this.$router.push('/');
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


            timer() {
                if (this.phoneyzmdata.time > 0) {
                    this.phoneyzmdata.time--;
                    this.phoneyzmdata.btntext=this.phoneyzmdata.time+"s後重新獲取";
                    setTimeout(this.timer, 1000);
                } else{
                    this.phoneyzmdata.time=60;
                    this.phoneyzmdata.btntext="獲取驗證碼";
                    this.phoneyzmdata.disabled=false;
                }
            },
            fphoneyzm:function(){
                if(this.merber_phone==''){
                    this.$toast({
                        message:'請輸入手機號碼',
                        type:'fail',
                        duration:1000,
                    });
                }else {
                    this.wjmmdragverify = true
                }
            },
            forget_pad:function () {
                var _this = this
                var phoneReg = /^([0][9])\d{8}$/
                var pwdReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{10,20}$/
                if(this.merber_phone=='' || this.merber_phcode=='' || this.merber_password=='' || this.merber_up_password==''){
                    this.$toast({
                        message:'請填寫完整資料',
                        type:'fail',
                        duration:2000,
                    });
                }else if(!phoneReg.test(this.merber_phone)){
                    this.$toast({
                        message:'請輸入正確手機號碼',
                        type:'fail',
                        duration:2000,
                    });
                }else if(!pwdReg.test(this.merber_password)){
                    this.$toast({
                        message:'密碼必須由數位和字母組成且10-20位',
                        type:'fail',
                        duration:2000,
                    });
                }else if(this.merber_password !== this.merber_up_password){
                    this.$toast({
                        message:'兩次輸入密碼不一致!',
                        type:'fail',
                        duration:2000,
                    });
                }else {
                    this.forget_padbeld = true
                    this.$http.post(this.url,{
                        merber_password:this.merber_password,
                        merber_phone:this.merber_phone,
                        merber_phcode:this.merber_phcode
                    },{emulateJSON:true}).then(function(res){
                        this.forget_padbeld = false
                        if(res.body.success===1){
                            _this.$toast({
                                message:'密碼已經重置，請用新密碼登入！',
                                type:'success',
                                duration:2000,
                            });
                            this.$router.push('/login');
                        }else if(res.body.success==2){
                            _this.$toast({
                                message:'驗證碼已過期！',
                                type:'fail',
                                duration:2000,
                            });
                        }else if(res.body.success==3){
                            if(this.phoneyzmdata.num <=1 ){
                                _this.$toast({
                                    message:"請核對您的手機號碼",
                                    type:'fail',
                                    duration:2000,
                                });
                                this.reload();
                            }else {
                                _this.merber_phcode==''
                                _this.phoneyzmdata.num--
                                _this.$toast({
                                    message:"驗證碼錯誤，您還有"+this.phoneyzmdata.num+"次機會",
                                    type:'fail',
                                    duration:3000,
                                });
                            }
                        }else if(res.body.success==4){
                            _this.$toast({
                                message:'手機號不存在！',
                                type:'fail',
                                duration:2000,
                            });
                        }else {
                            _this.$toast({
                                message:'發送失敗，請刷新後重試',
                                type:'fail',
                                duration:2000,
                            });
                        }
                    },function(res){
                        console.log(res);
                    });
                }
            }
        },
        computed: {

        },
        watch: {},
        mounted: function () {

        }
    }
</script>
