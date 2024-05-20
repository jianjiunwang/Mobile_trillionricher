<template>
    <div class="personal">
        <van-nav-bar title="新增支付寶帳戶" left-arrow :fixed="true" @click-left="upstep"></van-nav-bar>
        <div style="padding: 10px" v-loading="addalipaloading"  element-loading-background="rgba(0, 0, 0, 0.8)"  element-loading-text="正在驗證">
            <div style="padding:10px;font-size: 12px;border-radius: 5px;background-color:#3D3D3D;color: #ffffff">
                <p>支付寶帳戶實名姓名必須與身份證一致，切勿填入非本人支付寶帳戶</p>
            </div>
            <br>
            <van-field
                    label="真實姓名"
                    placeholder="請輸入您支付宝帳戶簡體姓名"
                    v-model="alipay_name"
                    :error-message="alipay_nameerrortext"
            >
            </van-field>
            <van-field
                    label="支付寶帳戶"
                    placeholder="請輸入您已實名的支付寶帳號"
                    v-model="alipay_num"
                    :error-message="insertzfberrortext"
            >
            </van-field>
        </div>
        <div style="margin-top: 20px;padding: 10px">
            <van-button type="primary" size="small" block @click="addalipay">確認並送出</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                merber_id:Cookies.get('merber_id'),
                addalipaloading:false,
                alipaylength:'',
                alipay_name:'',
                alipay_num:'',
                alipayid:'',
                insertzfberrortext:'',
                alipay_nameerrortext:'',
                timertime:90
            }
        },
        components: {},
        methods: {
            userxx:function () {
                this.$http.post('https://www.trillionricher.com/1.0/order_bank_alipay',{
                    merber_id:this.merber_id,
                    token:this.OS.token,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else {
                        this.alipaylength=res.body.data.alipay
                    }
                },function(res){
                    console.log(res);
                });
            },
            addalipay:function () {

                var _this=this

                var alipayreg=/^0?(13[0-9]|15[012356789]|18[0123456789]|19[0123456789]|14[0123456789]|17[0123456789])[0-9]{8}$/
                var alipayregs=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
                if(this.alipay_name == ''){
                    this.alipay_nameerrortext='請填寫正確的支付寶名稱'
                    return false
                }
                if(this.alipay_num == ''){
                    this.insertzfberrortext='請填寫正確的支付寶賬號'
                    return false
                }
                if(this.alipaylength>10){
                    this.$toast({
                        message: '最多添加10個支付寶賬戶!',
                        type: 'fail',
                        duration: 3000,
                    })
                    return false
                }
                this.addalipaloading = true
                this.$http.post('https://www.trillionricher.com/1.0/add_merber_alipay',{
                    merber_id: this.merber_id,
                    token:this.OS.token,
                    alipay_num: this.alipay_num,
                    company_name: '',
                    alipay_name: this.alipay_name
                },{emulateJSON:true}).then(function(res){
                    this.addalipaloading = false
                    if(res.body.success==-1){
                        this.Logout()
                    }
                    if(res.body.success===1){

                        if(res.body.data.state == 4){
                            this.$toast({
                                message: '支付寶認證成功!',
                                type: 'success',
                                duration: 2000,
                            })
                            setTimeout(function () {
                                _this.$router.push({path: '/personal'})
                            }, 2000);
                        }
                        if(es.body.data.state == 3){
                            this.$toast({
                                message: '支付寶認證失敗!',
                                type: 'fail',
                                duration: 3000,
                            })
                            this.alipay_name=''
                            this.alipay_num=''
                        }

                    }

                },function(res){
                    console.log(res);
                });

            },
        },
        computed: {},
        watch: {},
        mounted: function () {
            this.userxx()
        }
    }
</script>
<style>
    .addalipay .van-field .van-cell__title{
        max-width: 110px;
    }
</style>