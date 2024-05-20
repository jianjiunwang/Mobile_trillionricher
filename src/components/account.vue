<template>
    <div>
        <van-nav-bar title="帳號設定" left-arrow @click-left="upstep"></van-nav-bar>
        <van-cell title="修改密碼" is-link  to="/up_pwd"/>
        <van-cell title="修改暱稱" is-link @click="goupuname" :value="personal_data.merber_nickname" />
        <van-cell title="修改手機號" is-link to='/up_ph' :value="personal_data.merber_phone" />
        <van-cell title="修改E-mail" is-link @click="goupemail" :value="personal_data.merber_email" />
        <van-cell title="身份資訊認證" is-link value="未認證" v-if="user_information.authentication==1" @click="$router.push('/Addidentity')" ></van-cell>
        <van-cell title="身份資訊認證" value-class="yellowcolor" value="認證中" v-if="user_information.authentication==2" ></van-cell>
        <van-cell title="身份資訊認證" value-class="greencolor" value="已認證" v-if="user_information.authentication==3" ></van-cell>
        <van-cell title="身份資訊認證" value-class="redcolor" is-link value="認證失敗，請重新提交" v-if="user_information.authentication==4" @click="$router.push('/Addidentity')" ></van-cell>
        <van-cell title="防洗錢聲明書"  is-link value="未認證" v-if="user_information.fileverify_authentication==0" @click="$router.push('/addfile')" />
        <van-cell title="防洗錢聲明書" value-class="yellowcolor"  value="認證中" v-if="user_information.fileverify_authentication==1"/>
        <van-cell title="防洗錢聲明書" value-class="greencolor" value="已認證" v-if="user_information.fileverify_authentication==2"/>
        <van-cell title="防洗錢聲明書" is-link value-class="redcolor" value="認證失敗，請重新提交" v-if="user_information.fileverify_authentication==3"  @click="$router.push('/addfile')"/>
        <van-cell title="手機號碼" value-class="greencolor" value="已認證" />
        <!--<van-cell title="超商認證" is-link value="未認證" @click="linshi"/>-->
        <div style="padding: 0 20px;margin-top: 50px">
            <van-button type="danger" size="large" style="height: 40px;line-height: 40px" @click="myLogout">登出</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                merber_id:Cookies.get('merber_id'),
                personal_data:{},
                user_information:'',
            }
        },
        components: {},
        methods: {
            linshi:function(){
                this.$toast({
                    message:'超商即將開放，敬請期待',
                    type:'fail',
                    duration:1000,
                });
            },
            personaldata:function () {
                this.$http.post('https://www.trillionricher.com/1.0/personal_data',{
                    merber_id:this.merber_id,
                    token:this.OS.token
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else{
                        this.personal_data=res.body.data
                    }
                },function(res){
                    console.log(res);
                });
            },
            goupuname:function () {
                this.$router.push({
                    name:'up_uname',
                    params:{
                        uname:this.personal_data.merber_nickname
                    }
                });
            },
            goupemail:function () {
                this.$router.push({
                    name:'up_email',
                    params:{
                        phone:this.personal_data.merber_phone,
                        email:this.personal_data.merber_email,
                    }
                });
            },
            myLogout:function () {
                var _this=this
                Cookies.remove('merber_id','',{ path: '' });
                Cookies.remove('merber_name','',{ path: '' });
                Cookies.remove('egopay_key','',{ path: '' });
                this.$toast({
                    message:'登出成功',
                    type:'success',
                    duration:1000,
                });
                setTimeout(function (){
                    _this.$router.push('/')
                    _this.$router.go(0)
                },1000);
            },
            userxx:function () {
                this.$http.post('https://www.trillionricher.com/1.0/order_bank_alipay',{
                    merber_id:this.merber_id,
                    token:this.OS.token
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else{
                        this.user_information=res.body.data
                    }

                },function(res){
                    console.log(res);
                });
            },
        },
        computed: {},
        watch: {},
        created: function () {
            this.personaldata()
            this.userxx()
            if(this.merber_id==undefined){
                this.$router.push('/login');
            }
        }
    }
</script>
<style>
    .redcolor{
        color: red!important;
    }
    .greencolor{
        color: #44bb00!important;
    }
    .yellowcolor{
        color: #ffbc0e !important;
    }
</style>