<template>
    <div class="personal">
        <div class="pagetitle">
            <div>
                <router-link to="/personal">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>修改E-mail</b></span>
                </router-link>
            </div>
        </div>
        <van-cell title="目前E-mail"  :value="uemail" ></van-cell>
        <van-field
                v-model="merber_email"
                placeholder="請輸入新E-mail"
                label="新E-mail"
        ></van-field>
        <van-cell title="手機號碼"  :value="uphone" ></van-cell>
        <van-field
                v-model="phoneyzm"
                placeholder="請輸入密碼"
                maxlength="6"
                label="驗證碼"
        >
            <van-button slot="button" size="small" type="primary" :disabled="phoneyzmdata.disabled" @click="dragverify = true">{{phoneyzmdata.btntext}}</van-button>
        </van-field>
        <div style="padding: 0 15px;margin-top: 20px">
            <van-button size="small" block class="uodata_bt" type="primary" small  @click="upemail" :disabled="upemailbled"> 送出並儲存</van-button>
        </div>
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
                merber_id:Cookies.get('merber_id'),
                merber_email:'',
                msg: '',   //提示内容
                textcolor:'#46ce04', //提示文字颜色
                upemailbled:true,
                phoneyzm:'',
                uphone:this.$route.params.phone,
                uemail:this.$route.params.email,
                phoneyzmdata:{
                    disabled:false,
                    btntext:'獲取驗證碼',
                    time:60,
                    num:3
                },
                dragverify:false,
            }
        },
        components: {},
        methods: {
            onSuccess(times){
                this.dragverify = false
                this.upemailbled = false
                this.$http.post('https://www.trillionricher.com/1.0/forget_pad_code',{
                    merber_phone:this.uphone,
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
                    }else if(res.body.success===2){
                        this.$toast({
                            message:'此手機號已註冊',
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

            upemail:function () {
                this.upemailbled = true
                var Reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)/g
                if(!Reg.test(this.merber_email)){
                    this.$toast({
                        message:'請輸入正確的E-mail',
                        type:'fail',
                        duration:1000,
                    });
                }else if(this.phoneyzm==''){
                    this.$toast({
                        message:'請輸入驗證碼',
                        type:'fail',
                        duration:1000,
                    });
                }else {
                    this.$http.post('https://www.trillionricher.com/1.0/up_email',{
                        merber_email:this.merber_email,
                        merber_id:this.merber_id,
                        token:this.OS.token,
                        merber_phone:this.uphone,
                        merber_phcode:this.phoneyzm,
                    },{emulateJSON:true}).then(function(res){
                        this.upemailbled = false
                        if(res.body.success==-1){
                            this.$toast({
                                message:'登入已過期，請重新登入！',
                                type:'fail',
                                duration:3000,
                            });
                            this.$router.push({path: '/login'})
                            this.Logout()
                        }else if(res.body.success===1){
                            this.$toast({
                                message:'E-mail修改成功！',
                                type:'success',
                                duration:1000,
                            });
                            this.$router.push('/account');
                        }else if(res.body.success===2){
                            this.$toast({
                                message:'驗證碼已過期！',
                                type:'success',
                                duration:1000,
                            });
                        }else if(res.body.success===3){
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

                    });
                }

            }
        },
        computed: {},
        watch: {},
        mounted: function () {
        }
    }
</script>
