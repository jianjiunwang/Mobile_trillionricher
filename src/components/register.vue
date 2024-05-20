<template>
    <div class="registerbody">

        <div>
            <div class="register">
                <van-field
                        placeholder="真實姓名"
                        lable="姓名"
                        v-model="merber_name"
                        :error-message="errortext.merber_name"
                        @change="merberreg(1)"
                >
                </van-field>
                <i v-if="errortext.merber_nameicon" class="iconfont icon-duihao" style="color: #19be6b"></i>
            </div>
            <div class="register">
                <van-field
                        placeholder="暱稱(選填)"
                        v-model="merber_nickname"
                ></van-field>
            </div>
            <div class="register">
                <van-field
                        placeholder="電子信箱"
                        v-model="merber_email"
                        :error-message="errortext.merber_email"
                        @change="merberreg(2)"
                        
                ></van-field>
                <i v-if="errortext.merber_emailicon" class="iconfont icon-duihao" style="color: #19be6b"></i>
            </div>
            <div class="register">
                <van-field
                        placeholder="密碼必須由數位和字母組成且 10-20 位"
                        v-model="merber_password"
                        type="password"
                  
                        :error-message="errortext.merber_password"
                        @change="merberreg(3)"
                        
                ></van-field>
                <i v-if="errortext.merber_passwordicon" class="iconfont icon-duihao" style="color: #19be6b"></i>
            </div>
            <div class="register">
                <van-field
                        placeholder="再次輸入密碼"
                        v-model="checkPass"
                        type="password"
                        :error-message="errortext.checkPass"
                        @change="merberreg(4)"
                        
                ></van-field>
                <i v-if="errortext.checkPassicon" class="iconfont icon-duihao" style="color: #19be6b"></i>
            </div>
            <div class="register">
                <van-field
                        placeholder="手機號碼"
                        v-model="merber_phone"
                        @change="merberreg(5)"
                        :error-message="errortext.merber_phone"
                        
                ></van-field>
                <i v-if="errortext.merber_phoneicon" class="iconfont icon-duihao" style="color: #19be6b"></i>
            </div>
            <div class="register">
                <van-field
                        placeholder="請填寫有註冊過的平台 ex.易購寶、易支付、火速科技等等...如沒有填寫無。"
                        v-model="history"
                        :error-message="errortext.historytext"
                        @change="merberreg(6)"

                ></van-field>
                <i v-if="errortext.historyi" class="iconfont icon-duihao" style="color: #19be6b"></i>
            </div>
            <div class="register">
                <van-field
                        placeholder="驗證碼"
                        v-model="merber_code"
                        style="margin-top: 10px;border-bottom: 1px solid #F6F7F8">
                    <van-button slot="button" size="small" style="color: #ffffff" type="primary" :disabled="yzm.disabled" @click="phoneyzm" >{{yzm.Text}}</van-button>
                </van-field>
            </div>
            <div class="subregister">
                <van-button block size="small" color="#fffffff" type="primary" round @click="onSubmit">註冊</van-button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data: function () {
            return {
                merber_name:'',
                merber_nickname:'',
                merber_email:'',
                merber_password:'',
                checkPass:'',
                merber_phone:'',
                merber_code:'',
                history:'',
                errortext:{
                    merber_name:'',
                    historytext:'',
                    historyi:false,
                    merber_nameicon:false,
                    merber_email:'',
                    merber_emailicon:false,
                    merber_password:'',
                    merber_passwordicon:false,
                    checkPass:'',
                    checkPassicon:false,
                    merber_phone:'',
                    merber_phoneicon:false,
                },
                yzm:{
                    Text:'獲取驗證碼',
                    time:60,
                    disabled:false
                },
                invite_code:'',
            }
        },
        components: {},
        methods: {
            timer() {
                this.yzm.disabled=true
                if (this.yzm.time > 0) {
                    this.yzm.time--;
                    this.yzm.Text=this.yzm.time+"s後重新獲取";
                    setTimeout(this.timer, 1000);
                } else{
                    this.yzm.time=60;
                    this.yzm.Text="獲取驗證碼";
                    this.yzm.disabled=false;
                }
            },
            phoneyzm:function(){
                if(this.merber_phone==''){
                    this.$toast({
                        message: '請輸入正確的電話',
                        type: 'fail',
                        duration: 2000,
                    })
                }else {
                    this.timer()
                    this.$http.post('https://www.trillionricher.com/1.0/get_sms_code/',{
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
                }
            },
            merberreg:function(type) {
                if(type==1){
                    var reg=/^[\u4E00-\u9FA5]{2,6}$/
                    if(!reg.test(this.merber_name)){
                        this.errortext.merber_name='請輸入正確的姓名'
                        this.errortext.merber_nameicon=false
                    }else {
                        this.errortext.merber_name=''
                        this.errortext.merber_nameicon=true
                    }
                }
                if(type==2){
                    var reg =/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
                    if(!reg.test(this.merber_email)){
                        this.errortext.merber_email='請輸入正確的郵箱'
                        this.errortext.merber_emailicon=false
                    }else {
                        this.errortext.merber_email=''
                        this.errortext.merber_emailicon=true
                    }
                }
                if(type==3){
                    var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{10,20}$/
                    if(!reg.test(this.merber_password)){
                        this.errortext.merber_password='密碼必須由數位和字母組成且10-20位'
                        this.errortext.merber_passwordicon=false
                    }else {
                        this.errortext.merber_password=''
                        this.errortext.merber_passwordicon=true
                    }
                }
                if(type==4){
                    if(this.checkPass!==this.merber_password){
                        this.errortext.checkPass='兩次輸入密碼不一致!'
                        this.errortext.checkPassicon=false
                    }else {
                        this.errortext.checkPass=''
                        this.errortext.checkPassicon=true
                    }
                }
                if(type==5){
                    var reg=/^([0][9])\d{8}$/
                    if(!reg.test(this.merber_phone)){
                        this.errortext.merber_phone='請輸入正確的電話'
                        this.errortext.merber_phoneicon=false
                    }else {
                        this.errortext.merber_phone=''
                        this.errortext.merber_phoneicon=true
                    }
                }
                if(type==6){
                    if(this.history == ""){
                        this.errortext.historytext='請填寫有註冊過的平台 ex.易購寶、易支付、火速科技等等...如沒有填寫無。'
                        this.errortext.historyi=false
                    }else {
                        this.errortext.historytext=''
                        this.errortext.historyi=true
                    }
                }
            },
            onSubmit:function () {
                if(this.errortext.merber_nameicon==false){
                    this.errortext.merber_name='請輸入正確的姓名'
                }else if(this.errortext.merber_emailicon==false){
                    this.errortext.merber_email='請輸入正確的郵箱'
                }else if(this.errortext.merber_passwordicon==false){
                    this.errortext.merber_password='密碼必須由數位和字母組成且10-20位'
                }else if(this.errortext.checkPassicon==false){
                    this.errortext.checkPass='兩次輸入密碼不一致'
                }else if(this.errortext.merber_phoneicon==false){
                    this.errortext.merber_phone='請輸入正確的電話'
                }else if(this.errortext.historyi==false){
                    this.errortext.historytext='請填寫有註冊過的平台 ex.易購寶、易支付、火速科技等等...如沒有填寫無。'
                } else {
                    this.onSubmitAJAX()
                }
            },
            onSubmitAJAX:function () {
                this.$http.post('https://www.trillionricher.com/1.0/register/',{
                    merber_name:this.merber_name,
                    merber_nickname:this.merber_nickname,
                    merber_email: this.merber_email,
                    merber_password:this.merber_password,
                    merber_phone: this.merber_phone,
                    merber_code:this.merber_code,
                    history:this.history,
                    invite_code:this.invite_code
                },{emulateJSON:true}).then(function(res){
                    console.log(res);
                    if(res.body.success==1){
                        this.$toast({
                            message:'恭喜妳，註冊成功',
                            type:'success',
                            duration:1000,
                        });
                        Cookies.set('merber_id', res.body.data.merber_id,{ expires: 1 });
                        Cookies.set('merber_name',res.body.data.merber_name,{ expires: 1 });
                        Cookies.set('egopay_key',res.body.data.token,{ expires: 1 });
                        this.$router.push('/');
                    }else if(res.body.success==3){
                        this.$toast({
                            message:'驗證碼錯誤',
                            type:'fail',
                            duration:2000,
                        });
                    }else if(res.body.success==2){
                        this.$toast({
                            message:'驗證碼已過期',
                            type:'fail',
                            duration:2000,
                        });
                    }else if(res.body.success==7){
                        this.$toast({
                            message:'此手機號已註冊',
                            type:'fail',
                            duration:2000,
                        });
                    }else{
                        this.$toast({
                            message:res.body.data,
                            type:'fail',
                            duration:2000,
                        });
                    }

                },function(res){
                    console.log(res);
                });
            }
        },
        computed: {},
        watch: {},
        mounted: function () {
          var invite_code =this.$route.query.invite_code
          if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            if(invite_code == undefined){
              this.invite_code = ''
            }else {
              this.invite_code = invite_code
            }
          }else {
            window.location.href="https://www.trillionricher.com/dist/#/Register?invite_code="+invite_code
          }

        }
    }
</script>
<style>

</style>
