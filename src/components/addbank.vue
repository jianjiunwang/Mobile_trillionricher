<template>
    <div>
        <van-nav-bar title="新增提現銀行帳戶" left-arrow @click-left="upstep" :fixed="true"></van-nav-bar>
        <div style="padding: 20px;margin-top: 50px">
            <div style="padding:10px;font-size: 14px;border-radius: 5px;background-color: rgba(254,184,168,0.4);color: #4f4f4f">
                <p>請上傳銀行存摺正反面或帶有您姓名羅馬拼音之金融卡正反面照片。（VISA金融卡可遮住信用卡卡號及安全碼）。</p>
                <p>提現銀行帳號限登記您本人名下銀行帳號，除公司戶帳號外不接受不屬於您本人之銀行帳號新增申請。</p>
                <p>以個人名義註冊卻登記公司戶之存摺帳號者，必須上傳在職相關證明，如：名片、員工識別證、印有公司大小章之在職證明。</p>
                <p>站內E幣提現匯率按申請當日之台灣銀行人民幣現金買入匯率計算。</p>
            </div>
            <div style="font-size: 14px;">
                <h3>請選擇銀⾏</h3>
                <div>
                    <el-select v-model="bank" filterable  placeholder="" >
                        <el-option
                                v-for="(item) in allbank"
                                :key="item.value"
                                :label="item.bank_code +'—'+ item.bank_name"
                                :value="item.bank_code+item.bank_name">
                        </el-option>
                    </el-select>
                </div>
                <h3>銀行帳戶姓名</h3>
                <div style="border-bottom: 1px solid #e5e5e5;line-height: 30px">
                     {{merber_name}}
                </div>
                <h3>請輸入銀行帳戶:</h3>
                <el-input  v-model="card_no"  style="margin-bottom: 20px"></el-input>
                <h3>上傳卡片或存摺正面照</h3>
                <div style="border: 1px solid #e7e7e7;height: 200px;display: flex;align-items: center;justify-content: center;position: relative">
                    <div class="uploadimg" style="z-index:13">
                        <input type="file"  id="bank_front"  @change="startRead(1)">
                        <div>
                            <i class="iconfont icon-shumajiadian" style="font-size: 20px"></i>
                        </div>
                    </div>
                    <img :src="bank_frontsrc" alt="" style="width: 100%;height: 100%;position: absolute;top:0">
                    <p v-show="bank_frontsrc"   style="color: #FE0000;z-index: 10;;position:absolute; top: 155px;font-size: 14px;font-weight: bold;opacity: 0.5;text-align: center">僅供EGP兆富通審核認證使用</p>
                    <div v-show="bank_frontsrc" style="height: 200px;width: 100%;position: absolute;top:0;z-index: 12"></div>
                </div>
                <h3>上傳卡片或存摺反面照</h3>
                <div style="border: 1px solid #e7e7e7;height: 200px;display: flex;align-items: center;justify-content: center;position: relative">
                    <div class="uploadimg" style="z-index:13">
                        <input type="file"   id="bank_reverse"  @change="startRead(2)">
                        <div>
                            <i class="iconfont icon-shumajiadian" style="font-size: 20px"></i>
                        </div>
                    </div>
                    <img :src="bank_reversesrc" alt="" style="width: 100%;height: 100%;position: absolute;top:0">
                    <p v-show="bank_reversesrc"   style="color: #FE0000;z-index: 10;;position:absolute; top: 155px;font-size: 14px;font-weight: bold;opacity: 0.5;text-align: center">僅供EGP兆富通審核認證使用</p>
                    <div v-show="bank_reversesrc" style="height: 200px;width: 100%;position: absolute;top:0;z-index: 12"></div>
                </div>
            </div>
            <div style="margin-top: 20px">
                <van-button type="primary" size="large" @click="AddBankcard">確認並送出</van-button>
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
    export default {
        data: function () {
            return {
                merber_id:Cookies.get('merber_id'),
                merber_name: Cookies.get('merber_name'),
                bank:'',
                allbank:'',
                card_no:'',
                bank_frontsrc:'',
                bank_reversesrc:'',
                loding:false,
            }
        },
        components: {},
        methods: {
            getallbank:function(){
                this.$http.post('https://www.trillionricher.com/1.0/get_bank',{
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success===1){
                        this.allbank=res.body.data
                    }
                },function(res){
                    console.log(res);
                });
            },
            startRead:function (type) {
                if(type==1){
                    var fileDom=document.getElementById('bank_front').files[0];
                    this.bank_frontsrc=window.URL.createObjectURL(fileDom)
                }
                if(type==2){
                    var fileDom=document.getElementById('bank_reverse').files[0];
                    this.bank_reversesrc=window.URL.createObjectURL(fileDom)
                }
            },
            AddBankcard:function () {
                var _this=this
                var formData = new FormData();
                var bank_frontfile=document.getElementById('bank_front').files[0];
                var bank_reversefile=document.getElementById('bank_reverse').files[0];
                var bank_code = (this.bank).substring(0, 3)
                var bank_name = (this.bank).substring(3, 10)
                formData.append("bank_front", bank_frontfile);
                formData.append("bank_reverse", bank_reversefile);
                formData.append("merber_id", this.merber_id);
                formData.append("token", this.OS.token);
                formData.append("bank_code", bank_code);
                formData.append("bank_name", bank_name);
                formData.append("card_no", this.card_no);
                if(bank_frontfile== undefined || bank_reversefile== undefined || bank_name=='' || bank_code=='' || this.card_no==''){
                    this.$toast({
                        message: '請填寫完整資料！',
                        type: 'fail',
                        duration: 1000,
                    })
                }else {
                    this.$http.post('https://www.trillionricher.com/1.0/add_bankcard',formData,{emulateJSON:true,before:function (request) {
                            _this.loding=true
                        }}).then(function(res){
                        if(res.body.success==-1){
                            this.Logout()
                        }else if(res.body.success===1){
                            _this.loding=false
                            this.$toast({
                                message: '新增銀行帳戶成功!',
                                type: 'success',
                                duration: 1000,
                            })
                            this.$router.push({path: '/personal'})
                        }else {
                            _this.loding=false
                            this.$toast({
                                message: res.body.msg,
                                type: 'fail',
                                duration: 1000,
                            })
                        }
                    },function(res){
                        console.log(res);
                    });
                }
            },
            userxx:function () {
                this.$http.post('https://www.trillionricher.com/1.0/order_bank_alipay',{
                    merber_id:this.merber_id,
                    token:this.OS.token,
                },{emulateJSON:true}).then(function(res){
                    var user_information=res.body.data
                    if(res.body.success==-1){
                        this.Logout()
                    }else if(user_information.bank_state==1){
                        this.$router.push({ path:'/addbank'})
                    }else if(user_information.bank_state==2){
                        this.$toast({
                            message: '銀行卡人工驗證中，請耐心等待認證結果！',
                            type: 'fail',
                            duration: 2000,
                        });
                        this.$router.push({ path:'/personal'})
                    }else if(user_information.bank_state==3){
                        this.$toast({
                            message: '最多只能添加3個銀行帳戶哦！',
                            type: 'fail',
                            duration: 2000,
                        });
                        this.$router.push({ path:'/personal'})
                    }
                },function(res){
                    console.log(res);
                });

            },

        },
        computed: {},
        watch: {},
        mounted: function () {
            this.getallbank()
            this.userxx()
        }
    }
</script>
