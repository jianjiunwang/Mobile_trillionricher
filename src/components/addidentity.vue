<template>
    <div class="personal">
        <div class="pagetitle">
            <div>
                <router-link to="/personal">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>身份認證</b></span>
                </router-link>
            </div>
        </div>
        <div class="addidentity">
            <div style="padding: 10px;background-color: #efb300;border-radius: 5px">
                <p style="font-size: 14px">
                    避免第三方詐騙與有心人士利用本公司作為洗錢管道，請您如實提供身份證件。
                    網站內所填寫及上傳的所有圖資，將登記造冊，保密管理。
                    <br>
                    請依據所持國民身份證記載的【身份證字號】及【發證日期】輸入資料。
                    圖片格式僅限:JPG、PNG、GIF檔。
                </p>
            </div>
            <van-field
                    label="身份證字號"
                    v-model="identity_num"
                    :error-message="errortext.identity_num"
            >
            </van-field>
            <van-field
                    label="發證地點"
                    :disabled="Locationshow"
                    v-model="region"
                    @focus="Locationshow = true"
            >
            </van-field>
            <van-field
                    label="發證日期"
                    :disabled="show"
                    @focus="show=true"
                    v-model="identity_date"
                    :error-message="errortext.identity_num"
            >
            </van-field>
            <div style="display: flex;align-items: center;padding: 10px 15px;">
                <span style="width: 90px;font-size: 14px;line-height: 24px;color:#666666">領補換類型</span>
                <van-radio-group v-model="identity_type" style="display: flex;justify-content:space-around;width:100%;font-size: 14px">
                    <van-radio name="初發">初發</van-radio>
                    <van-radio name="換發">換發</van-radio>
                    <van-radio name="補發">補發</van-radio>
                </van-radio-group>
            </div>
            <div style="font-size: 14px;padding: 10px 15px">身份證正面圖片(圖片格式僅限:JPG、PNG。)</div>
            <div style="border: 1px solid #e7e7e7;height: 200px;display: flex;align-items: center;justify-content: center;position: relative">
                <div class="uploadimg" style="z-index:13">
                    <input type="file" id="identity_front"  @change="startRead(1)" accept="image/">
                    <div>
                        <i class="iconfont icon-shumajiadian" style="font-size: 20px"></i>
                    </div>
                </div>
                <p v-show="identity_frontsrc"   style="color: #FE0000;z-index: 10;;position:absolute; top: 155px;font-size: 14px;font-weight: bold;opacity: 0.5;text-align: center">僅供EGP兆富通審核認證使用</p>
                <div v-show="identity_frontsrc" style="height: 200px;width: 100%;position: absolute;top:0;z-index: 12"></div>
                <img v-show="identity_frontsrc"  :src="identity_frontsrc" alt="" style="width: 100%;height: 100%;position: absolute;top:0">
            </div>
            <div style="font-size: 14px;padding: 10px 15px">身份證反面圖片(圖片格式僅限:JPG、PNG。)</div>
            <div style="border: 1px solid #e7e7e7;height: 200px;display: flex;align-items: center;justify-content: center;position: relative">
                <div class="uploadimg" style="z-index:13">
                    <input type="file"  id="identity_reverse"  @change="startRead(2)" accept=".jpg,.png,.gif">
                    <div>
                        <i class="iconfont icon-shumajiadian" style="font-size: 20px"></i>
                    </div>
                </div>
                <img  v-show="identity_reversesrc" :src="identity_reversesrc" alt="" style="width: 100%;height: 100%;position: absolute;top:0">
                <p v-show="identity_reversesrc"  style="color: #FE0000;z-index: 10;;position:absolute; top: 155px;font-size: 14px;font-weight: bold;opacity: 0.5;text-align: center">僅供EGP兆富通審核認證使用</p>
                <div v-show="identity_reversesrc" style="height: 200px;width: 100%;position: absolute;top:0;z-index: 12"></div>
            </div>
            <div style="font-size: 14px;padding: 10px 15px">手持身份證正面圖片(圖片格式僅限:JPG、PNG。)</div>
            <div style="border: 1px solid #e7e7e7;height: 200px;display: flex;align-items: center;justify-content: center;position: relative">
                <div class="uploadimg" style="z-index:13">
                    <input type="file" id="handheld_front"  @change="startRead(3)" accept="image/">
                    <div>
                        <i class="iconfont icon-shumajiadian" style="font-size: 20px"></i>
                    </div>
                </div>
                <p v-show="identity_handheldsrc"   style="color: #FE0000;z-index: 10;;position:absolute; top: 155px;font-size: 14px;font-weight: bold;opacity: 0.5;text-align: center">僅供EGP兆富通審核認證使用</p>
                <div v-show="identity_handheldsrc" style="height: 200px;width: 100%;position: absolute;top:0;z-index: 12"></div>
                <img v-show="identity_handheldsrc"  :src="identity_handheldsrc" alt="" style="width: 100%;height: 100%;position: absolute;top:0">
            </div>
            <div style="margin-top: 20px">
                <van-button type="primary" size="large" @click="submitUpload">確認並送出</van-button>
            </div>
        </div>
        <van-popup v-model="show" style="z-index: 999" position="bottom">
            <div style="display: flex;justify-content: space-between;border-bottom: 1px solid #e7e7e7;font-size: 15px;color: #1989fa">
                <div @click="show= false" style="margin: 10px 15px;">取消</div>
                <div @click="selectdate" style="margin: 10px 15px;">確認</div>
            </div>
            <div style="display: flex;align-items: center">
                民國
                <van-picker :columns="columnsyear" :default-index="3" style="width: 25%"  @change="selectyear"></van-picker>
                年
                <van-picker :columns="columnsmonth" :default-index="3"  style="width: 25%"  @change="selectmonth" ></van-picker>
                月
                <van-picker :columns="columnsyday" :default-index="3"  style="width: 25%"  @change="selectday" ></van-picker>
                日
            </div>
        </van-popup>
        <van-popup v-model="Locationshow" style="z-index: 999" position="bottom">
            <div style="display: flex;justify-content: center">
                <van-picker
                        :columns="Location"
                        :default-index="3"
                        style="width: 100%"
                        @confirm="onChange"
                        @cancel="Locationshow=false"
                        :show-toolbar="true"
                        confirm-button-text="確認"></van-picker>
            </div>
        </van-popup>
        <div v-show="loding" style="width:100%;height: 100%;z-index: 9999;position:fixed;top: 0;background-color:rgba(0,0,0,0.4)">
            <div style="position: relative;top:45%;text-align: center;width: 100%">
                <van-loading color="#fff" style="margin: 0 auto " size="40px"/>
            </div>
        </div>
    </div>
</template>

<script>
    import COS  from 'cos-js-sdk-v5'
    const cos = new COS({
        SecretId: 'AKIDdvyoT2wOHsKXx6ybxA7nHWWHn21kmlMi',
        SecretKey: 'I9miOoxqXx6zmTc3PFp79uVUPElOkqfG',
    });
    export default {
        data: function () {
            return {
                merber_id:Cookies.get('merber_id'),
                show:false,
                loding:false,
                Locationshow:false,
                identity_num:'',
                region:'',
                yaer:'',
                month:'',
                day:'',
                identity_date:'',
                identity_type:'',
                identity_frontsrc:'',
                identity_reversesrc:'',
                identity_handheldsrc:'',
                identity_fronturl:'',//身份证正面上传地址
                identity_reverseurl:'',//身份证反面上传地址
                identity_handheldurl:'',//身份证反面上传地址
                identity_frontfile:'',//身份证正面上传地址
                identity_reversefile:'',//身份证反面上传地址
                identity_handheldfile:'',//身份证反面上传地址
                columnsyear: [94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120],
                columnsmonth: [1,2,3,4,5,6,7,8,9,10,11,12],
                columnsyday: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                Location:["北縣","宜縣","桃縣","竹縣","苗縣","中縣","彰縣","投縣","雲縣","嘉縣","南縣","高縣","屏縣","東縣","花縣","澎縣","基市","竹市","嘉市","連江","金門","北市","高市","新北市","中市","南市","桃市"],
                errortext:{
                    identity_num:'',
                }
            }
        },
        components: {},
        methods: {
            merberreg:function (val) {

            },
            selectyear:function(picker, value, index){
                this.year=value
            },
            selectmonth:function(picker, value, index){
                this.month=value
            },
            selectday:function(picker, value, index){
                this.day=value
            },
            selectdate:function(){
                if(this.year==undefined){this.year=94}else if(this.month==''){this.month=1}else if(this.day==''){this.day=1}else {
                    this.identity_date='民國'+this.year+'年'+this.month+'月'+this.day+'日'
                    this.show=false
                }
            },
            base64_file:function (dataurl, filename) {
                var arr = dataurl.split(","),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, { type: mime });

            },

            startRead:function (type) {
                if(type==1){
                    var fileObj = document.getElementById("identity_front").files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(1)

                    if(!/\.(jpg|jpeg|png|JPG|PNG|heic|heif|HEIC|HEIF)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.identity_frontsrc = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize < 1024){
                            this.identity_frontfile = fileObj
                        }else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.identity_frontfile =  this.base64_file(res.base64,fileObj.name)
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.identity_frontfile = this.base64_file(res.base64,fileObj.name)
                            })
                        }
                    }

                }
                if(type==2){
                    var fileObj = document.getElementById("identity_reverse").files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(1)
                    if(!/\.(jpg|jpeg|png|JPG|PNG|heic|heif|HEIC|HEIF)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.identity_reversesrc = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize <1024){
                            this.identity_reversefile = fileObj
                        } else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.identity_reversefile = this.base64_file(res.base64,fileObj.name)
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.identity_reversefile = this.base64_file(res.base64,fileObj.name)
                            })
                        }


                    }
                }
                if(type==3){
                    var fileObj = document.getElementById("handheld_front").files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(1)
                    if(!/\.(jpg|jpeg|png|JPG|PNG|heic|heif|HEIC|HEIF)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.identity_handheldsrc = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize <1024){
                            this.identity_handheldfile = fileObj
                        } else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.identity_handheldfile = this.base64_file(res.base64,fileObj.name)
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.identity_handheldfile = this.base64_file(res.base64,fileObj.name)
                            })
                        }


                    }
                }
            },
            onChange(picker, value, index) {
                this.region=this.Location[value]
                this.Locationshow=false
            },


            submitUpload:function () {
                var _this=this
                var reg=/^[A-Z](1|2)\d{8}$/;  //身份證的正規表示式
                var city = [1,10,19,28,37,46,55,64,39,73,82,2,11,20,48,29,38,47,56,65,74,83,21, 3,12,30]
                if(this.identity_num !==''){
                    this.identity_num=this.identity_num.toUpperCase();
                    var  identity_num=this.identity_num.split('');
                    var total = city[identity_num[0].charCodeAt(0)-65];
                    for(var i=1; i<=8; i++){
                        total += eval(identity_num[i]) * (9 - i);
                    }
                    total += eval(identity_num[9]);
                }
                if(!reg.test( this.identity_num ) || total%10 !== 0 ||this.identity_num =='') {
                    this.$toast({
                        message: '請輸入正確的身份證字號',
                        type: 'fail',
                        duration: 1000,
                    })
                } else if(this.region==''){
                    this.$toast({
                        message: '請選擇發證地點',
                        type: 'fail',
                        duration: 1000,
                    })
                }else if(this.year=='' || this.month=='' || this.day==''){
                    this.$toast({
                        message: '請選擇發證日期',
                        type: 'fail',
                        duration: 1000,
                    })
                }else if(this.identity_type==''){
                    this.$toast({
                        message: '請選擇領補換類型',
                        type: 'fail',
                        duration: 1000,
                    })
                }else if(this.identity_frontsrc == ''  || this.identity_reversesrc ==  ''){
                    this.$toast({
                        message: '請選擇身份證圖片',
                        type: 'fail',
                        duration: 1000,
                    })
                }else {
                   this.loding = true
                   // const cos = new COS({
                   //      getAuthorization: function (options, callback) {
                   //          _this.$http.post('https://www.trillionricher.com/1.0/getaccout_cos',{
                   //              merber_id: _this.OS.merber_id,
                   //              token: _this.OS.token,
                   //          },{emulateJSON:true}).then(function(res) {
                   //              var credentials = res.credentials
                   //              callback({
                   //                  TmpSecretId: credentials.tmpSecretId,
                   //                  TmpSecretKey: credentials.tmpSecretKey,
                   //                  XCosSecurityToken: credentials.sessionToken,
                   //                  // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                   //                  StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
                   //                  ExpiredTime: res.expiredTime, // 时间戳，单位秒，如：1580000900
                   //              });
                   //          })
                   //      }
                   //  })
                    let timestamp = Date.parse(new Date());
                    let num = '';
                    for(var i=0;i<5;i++)
                    {
                        num+=Math.floor(Math.random()*10);
                    }
                    let sign = timestamp + num
                    cos.putObject({
                        Bucket: 'trillionricher-1258896139',
                        Region: 'ap-tokyo',
                        Key:  'identity_front/'+'front'+sign,
                        StorageClass: 'STANDARD',
                        Body: _this.identity_frontfile, // 上传文件对象
                        onProgress: function(progressData) {
                        }
                    }, function(err, data) {
                        if(data.statusCode == 200){
                            _this.identity_fronturl = 'https://'+data.Location
                            cos.putObject({
                                Bucket: 'trillionricher-1258896139',
                                Region: 'ap-tokyo',
                                Key:  'identity_reverse/'+'reverse'+sign,
                                StorageClass: 'STANDARD',
                                Body: _this.identity_reversefile, // 上传文件对象
                                onProgress: function(progressData) {
                                }
                            }, function(err, data) {
                                if(data.statusCode == 200){
                                    _this.identity_reverseurl = 'https://'+data.Location
                                    cos.putObject({
                                        Bucket: 'trillionricher-1258896139',
                                        Region: 'ap-tokyo',
                                        Key:  'identity_front/'+'front'+sign,
                                        StorageClass: 'STANDARD',
                                        Body: _this.identity_frontfile, // 上传文件对象
                                        onProgress: function(progressData) {
                                        }
                                    }, function(err, data) {
                                        if(data.statusCode == 200){
                                            _this.identity_fronturl = 'https://'+data.Location
                                            cos.putObject({
                                                Bucket: 'trillionricher-1258896139',
                                                Region: 'ap-tokyo',
                                                Key:  'identity_reverse/'+'reverse'+sign,
                                                StorageClass: 'STANDARD',
                                                Body: _this.identity_handheldfile, // 上传文件对象
                                                onProgress: function(progressData) {
                                                }
                                            }, function(err, data) {
                                                if(data.statusCode == 200){
                                                    _this.identity_handheldurl = 'https://'+data.Location
                                                    _this.$http.post('https://www.trillionricher.com/1.0/add_identity',{
                                                            identity_front:_this.identity_fronturl,
                                                            identity_reverse:_this.identity_reverseurl,
                                                            identity_hand:_this.identity_handheldurl,
                                                            merber_id:_this.OS.merber_id,
                                                            token:_this.OS.token,
                                                            identity_num:_this.identity_num,
                                                            year:_this.year,
                                                            month: _this.month,
                                                            day: _this.day,
                                                            identity_type: _this.identity_type,
                                                            region:_this.region},
                                                        {emulateJSON:true,before:function (request) {
                                                                _this.loding=true
                                                            }}).then(function(res){
                                                        if(res.body.success==-1){
                                                            this.Logout()
                                                        }else if(res.body.success===1){
                                                            _this.loding=false
                                                            this.$toast({
                                                                message: '您的身份認證資訊已成功提交，請等待審核!',
                                                                type: 'success',
                                                                duration: 1000,
                                                            })
                                                            this.$router.push({path: '/personal'})
                                                        }else {
                                                            _this.loding=false
                                                            this.$toast({
                                                                message: '您等身份認證已成功或正在審核中。 請等待',
                                                                type: 'fail',
                                                                duration: 1000,
                                                            })
                                                        }
                                                    },function(res){
                                                        console.log(res);
                                                    });

                                                }
                                            });
                                        }
                                    });

                                }
                            });
                        }
                    });



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
    .addidentity .van-field__control{
        text-align: center;
    }
</style>
