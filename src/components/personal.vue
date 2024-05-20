<template>
    <div class="personal">

        <!--个人名片-->
        <div class="businesscard" >
            <div style="display: flex;">
                <div class="photo" @click="">
                    <img  src="../assets/image/head_logo22.png">
                </div>
                <div class="uesrname">
                    <div>
                        <span>{{user_information.merber_nickname==''?user_information.merber_name:user_information.merber_nickname}}</span>
                    </div>
                    <div>
                        會員編號:{{user_information.merber_num}}
                    </div>
                </div>
            </div>

            <!--<div style="font-size: 14px;color: #fff;display: flex;align-items: center"><a  @click="goaccount" style="color: #fff">設定</a><van-icon name="arrow" /></div>-->
        </div>
        <div class="refund">
            <div>
                <span>￥{{user_information.r_money==null?0:user_information.r_money}}</span>
                <span>金幣退款*不提供儲值*</span>
            </div>
        </div>

        <div style="width: 98%;margin: 0 auto">
            <van-collapse accordion  v-model="alipay" class="alipaynum" >
                <van-collapse-item title="支付寶帳戶" name="1">
                    <span slot="value" style="display: flex;justify-content: flex-end" @click="$router.push({path: '/addalipay'})"><van-icon name="add" color="#1cb721" size="18px"/></span>
                    <div class="balancelist" v-for="(item,i) in user_information.alipay" :key="i">
                        <span >
                            <img src="../assets/image/check-mark.png" alt="" width="15">
                            <span>{{item.alipay_name}}</span>
                            <span>{{item.alipay_num}}</span>
                        </span>
                        <van-icon name="delete" color="red" size="18px"  @click="deletezfb_Bank(item.alipay_num,'alipay')"/>
                    </div>
                </van-collapse-item>
            </van-collapse>
            <van-collapse accordion  v-model="alipay" class="alipaynum" >
                <van-collapse-item title="修改資料" name="2">
                    <van-cell title="修改密碼" is-link  to="/up_pwd"/>
                    <van-cell title="修改暱稱" is-link @click="goupuname" :value="personal_data.merber_nickname" />
                    <van-cell title="修改手機號" is-link to='/up_ph' :value="personal_data.merber_phone" />
                    <van-cell title="修改E-mail" is-link @click="goupemail" :value="personal_data.merber_email" />
                </van-collapse-item>
            </van-collapse>
            <div class="Setup">
                <van-cell title="手機號碼" value-class="greencolor" value="已認證"  :border="false"/>
                <van-cell title="身份資訊認證" is-link value="未認證" v-if="user_information.authentication==1" @click="$router.push('/Addidentity')" ></van-cell>
                <van-cell title="身份資訊認證" value-class="yellowcolor" value="認證中" v-if="user_information.authentication==2" ></van-cell>
                <van-cell title="身份資訊認證" value-class="greencolor" value="已認證" v-if="user_information.authentication==3" ></van-cell>
                <van-cell title="身份資訊認證" value-class="redcolor" is-link value="認證失敗，請重新提交" v-if="user_information.authentication==4" @click="$router.push('/Addidentity')" ></van-cell>
                <van-cell title="防洗錢聲明書"  is-link value="未認證" v-if="user_information.fileverify_authentication==0" @click="$router.push('/addfile')" />
                <van-cell title="防洗錢聲明書" value-class="yellowcolor"  value="認證中" v-if="user_information.fileverify_authentication==1"/>
                <van-cell title="防洗錢聲明書" value-class="greencolor" value="已認證" v-if="user_information.fileverify_authentication==2"/>
                <van-cell title="防洗錢聲明書" is-link value-class="redcolor" value="認證失敗，請重新提交" v-if="user_information.fileverify_authentication==3"  @click="$router.push('/addfile')"/>
                <van-cell title="註冊邀請碼" class="merber_num" @click="Cope"  value-class="greencolor" :data-clipboard-text="'https://m.trillionricher.com/#/register?invite_code='+personal_data.merber_num" value="點擊複製邀請鏈接"  :border="false"/>
            </div>

            <!--<div class="balancelist" v-if="defeated_alipay!==undefined">-->
                <!--<span>-->
                    <!--<i class="iconfont icon-error" style="color: #ff0000"></i> &nbsp;&nbsp;-->
                    <!--<span>{{defeated_alipay.alipay_num}}</span>&nbsp;-->
                <!--</span>-->
                <!--<van-icon name="delete" color="red" size="18px"  @click="deletezfb_Bank(defeated_alipay.alipay_num,'alipay')"/>-->
            <!--</div>-->
        </div>

    </div>
</template>

<script>
import Clipboard from 'clipboard';
let rst=new Clipboard('.merber_num');
    export default {
        data: function () {
            return {
                barshow:false,
                bankshow:false,
                alipay:'',
                upuserdata:'',
                personal_data:{},
                active:3,
                merber_id:Cookies.get('merber_id'),
                user_information:{
                    defeated_bank:{}
                },
                is_authentication:'',
                rzback_s:'',
                defeated_alipay:''
            }
        },
        components: {
        },
        methods: {
            goaccount:function(){
                this.$router.push('/account');
            },
          Cope:function () {
            this.$toast({
              message:"複製成功",
              type:"success",
              duration:1000
            })
          },
            getpersonaldata:function () {
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
            goupemail:function () {
                this.$router.push({
                    name:'up_email',
                    params:{
                        phone:this.personal_data.merber_phone,
                        email:this.personal_data.merber_email,
                    }
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
            userxx:function () {
                this.$http.post('https://www.trillionricher.com/1.0/order_bank_alipay',{
                    merber_id:this.merber_id,
                    token:this.OS.token,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else {
                        this.user_information=res.body.data
                        this.defeated_alipay=res.body.data.defeated_alipay[0]
                    }
                },function(res){
                    console.log(res);
                });
            },
            bank_state:function () {
                if(this.user_information.bank_state==1){
                    this.$router.push({ path:'/addbank'})
                }else if(this.user_information.bank_state==2){
                    this.$toast({
                        message: '銀行卡人工驗證中，請耐心等待認證結果！',
                        type: 'fail',
                        duration: 2000,
                    });
                }else if(this.user_information.bank_state==3){
                    this.$toast({
                        message: '最多只能添加3個銀行帳戶哦！',
                        type: 'fail',
                        duration: 2000,
                    });
                }
            },
            deletezfb_Bank:function (num,type) {
                var text=''
                if(type=='bank'){
                    text='您將删除此銀行帳戶, 是否繼續？'
                }else {
                    text='您將删除此支付寶帳戶, 是否繼續？'
                }
                this.$dialog.alert({
                    message: text,
                    showCancelButton:true,
                    confirmButtonText:'刪除',
                    cancelButtonText: '不删除',
                }).then(() => {
                    this.$http.post('https://www.trillionricher.com/1.0/del_bank_alipay',{
                        merber_id:this.merber_id,
                        token:this.OS.token,
                        type_name:type,
                        num:num
                    },{emulateJSON:true}).then(function(res) {
                        if (res.body.success == 1) {
                            this.$toast({
                                message: '删除成功!',
                                type: 'success',
                                duration: 1500,
                            });
                            this.userxx();
                        } else {
                            this.$toast({
                                message: '网络错误!',
                                type: 'fail',
                                duration: 1000,
                            });
                        }
                    })
                }).catch(() => {

                });
            }
        },
        computed: {},

        mounted: function () {
            if(this.merber_id==undefined){
                this.$router.push('/login');
                return false
            }
            this.userxx()
            this.getpersonaldata()
        }
    }
</script>
