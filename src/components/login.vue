<template>
    <div class="login">
        <!--<van-nav-bar title="登入" left-arrow  @click-left="onClickLeft"></van-nav-bar>-->
        <div style="width: 80px;height: 80px;margin: 50px auto ">
            <img src="../assets/image/head_logo22.png" width="100%">
        </div>
        <div>
            <van-field
                    v-model="email_phone"
                    placeholder="請輸入手機號碼"
            ></van-field>
            <van-field
                    v-model="password"
                    placeholder="請輸入密碼"
                    :icon="pwdicon"
                    :type="pwdtype"
                    @click-icon="showpwd"

            ></van-field>
            <div class="Forgotpawd">
                <router-link to="/forgotpassword" >忘記密碼 ？</router-link>
            </div>
            <div class="Forgotpawd" >
                <van-button size="small" type="primary" round block @click="login" style="margin-bottom: 20px" >登入</van-button>
                <router-link to="/register">
                    <van-button size="small"  block type="warning" round>會員註冊</van-button>
                </router-link>
            </div>
        </div>
        <van-dialog v-model="dragverify" title="請進行驗證" :showConfirmButton="false" :closeOnClickOverlay="true">
            <div style="padding: 30px 10px;font-size: 18px;font-weight: bold;margin: 0 auto"  >
                <slide-verify :l="42"
                              :r="10"
                              :w="270"
                              :h="155"
                              :imgs="imgs"
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
    import Global from './Global'
    export default {
        inject:['reload'],
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
                phonebled:'',//强制修改密码手机输入框锁定
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
            wjmmshowFun(){
                this.wjmmshow = true
                this.phonebled = false

            },
            //滑动验证成功
            onSuccess(times){
                this.textcolor = "#46ce04"
                this.msg = '驗證耗时'+(times / 1000).toFixed(1)+'s'
                var _this=this
                this.$http.post('https://www.trillionricher.com/1.0/login',{
                    email_phone:this.email_phone,
                    password:this.password,
                    aging:this.isPreservation?30:1
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==0){
                        this.$toast({
                            message:'帳號或密碼錯誤',
                            type:'fail',
                            duration:1000,
                        });
                        this.dragverify = false
                        this.$refs.slideblock.reset();
                    }else if(res.body.success==1){
                        this.dragverify = false
                        this.$refs.slideblock.reset();
                        Cookies.set('merber_email', res.body.data.merber_email,{ expires: 1 });
                        Cookies.set('merber_id', res.body.data.merber_id,{ expires: 1 });
                        Cookies.set('merber_name', res.body.data.merber_name,{ expires: 1 });
                        Cookies.set('egopay_key', res.body.data.token,{ expires: 1 });

                        this.$toast({
                            message:'登入成功',
                            type:'success',
                            duration:1000,
                        });
                        _this.$router.push('/')
                        window.location.reload()
                    }else if(res.body.success==3){
                        this.wjmmtext = true
                        this.wjmmshow = true
                        this.url = "https://www.trillionricher.com/Kv4I1llx6/renewal_user"
                        this.phonebled = true
                        this.merber_phone = this.email_phone
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
            login:function(){
                var reg=/^([0][9])\d{8}$/
                if(!reg.test(this.email_phone)){
                    this.$toast({
                        message:'請輸入手機號碼',
                        type:'fail',
                        duration:1000,
                    });
                }else if(this.password == ""){
                    this.$toast({
                        message:'請輸入正確密碼',
                        type:'fail',
                        duration:1000,
                    });
                }else {
                    this.dragverify = true
                }

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
        },
        computed: {},
        watch: {},
        mounted: function () {
        }
    }
</script>
<style>
    .van-toast--default{
        width: 230px !important;
    }
    .slide-verify{
        text-align: center;
        color: #46ce04;
        margin-top: 10px;
        font-size: 14px;
    }

</style>
