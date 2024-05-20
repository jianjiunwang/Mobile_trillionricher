<template>
    <div class="service" v-loading="loading" element-loading-text="正在提交，請稍等" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>線上客服</b></span>
                </router-link>
            </div>
        </div>
        <div style="padding: 10px" v-show="isupsuc">
            <p style="font-size: 15px;margin-bottom: 10px">描述內容</p>
            <textarea  placeholder="請輸入類別描述內容" rows="5" cols="30" class="servicetext" v-model="servicetext"></textarea>
            <div style="display: flex;align-items: center;margin-top: 20px">
                <div class="uploadimg" >
                    <input type="file"  @change="startRead(1)" id="imgUpFile1" style="z-index: 999">
                    <div>
                        <i class="iconfont icon-shumajiadian" style="font-size: 20px"></i>
                    </div>
                </div>
                <div style="height: 68px;position: absolute">
                    <img :src="messageimgurl" alt="" height="68px">
                </div>
            </div>
            <div style="margin-top: 50px">
                <van-button type="primary" size="large" style="height: 40px;line-height: 40px" @click="newsubmitUpload" :disabled="subbeld">送出並確認</van-button>
            </div>
        </div>
        <div v-show="!isupsuc" style="padding: 10px">
            <div style="padding: 10px;font-size: 15px">
                <p style="display: flex;justify-content: space-between">問題描述 <span>{{message.create_time |convTimehms}}</span></p>
                <p style="padding: 10px 0" v-html="message.content"></p>
                <div class="successimg" v-if="message.image!==''">
                    <span v-for="(item,i) in messageimg" :key="i">
                        <img :src="item" alt="" @click="imgshow=true;imgsrc=item" >
                    </span>
                </div>
            </div>
            <div style="padding: 10px;font-size: 15px;"  v-for="(item,i) in leave_message" :key="i" :style="{backgroundColor:item.service_name==null?'#16171c':'#efb300'}">
                <p style="display: flex;justify-content: space-between">
                    <span v-if="item.service_name!==null ">客服回覆</span>
                    <span v-if="item.service_name==null ">您的留言</span>
                    <span>{{item.create_time |convTimehms}}</span>
                </p>
                <p style="padding: 10px 0" v-html="item.content"></p>
                <div class="successimg" v-if="item.image!==null && item.image!==''">
                    <span v-for="(imglist,i) in (item.image.split(','))" :key="i">
                        <img  :src="imglist" alt="" @click="imgshow=true;imgsrc=imglist" >
                    </span>
                </div>
            </div>
            <div v-if="leave_message.length%2==0" style="padding: 10px;background-color:#efb300;font-size: 15px;">
                <p>客服回覆 </p>
                <p style="padding: 10px 0">尚未回覆,您在等一等哦^^</p>
            </div>
            <div style="padding: 10px" v-show="isupsuche">
                <p style="font-size: 15px;margin-bottom: 10px">描述內容</p>
                <textarea  placeholder="請輸入類別描述內容" rows="5" cols="30" class="servicetext" v-model="Unsolvedtext"></textarea>
                <div style="display: flex;align-items: center;margin-top: 20px">
                    <div class="uploadimg">
                        <input type="file"  @change="startRead(2)" id="imgUpFile2">
                        <div>
                            <i class="iconfont icon-shumajiadian" style="font-size: 20px"></i>
                        </div>
                    </div>
                    <div style="height: 68px;position: absolute">
                        <img :src="checkmessageimgurl" alt="" height="68px">
                    </div>
                </div>
                <div style="margin-top: 50px">
                    <van-button type="primary" size="large" style="height: 40px;line-height: 40px" @click="anew_message" :disabled="anew_subbeld">送出並確認</van-button>
                </div>
            </div>
            <div style="display: flex;justify-content: space-around;margin-top: 20px" v-if="isclose=='2'" >
                <van-button type="primary" >已解决</van-button>
            </div>
            <div style="display: flex;justify-content: space-around;margin-top: 20px" v-else >
                <van-button type="primary" @click="close_solve">已解决</van-button>
                <van-button type="danger" @click="isupsuche = true" :disabled="isclose==0"  >未解决,回覆訊息</van-button>
            </div>

        </div>

        <div v-show="imgshow" class="largeimg" @click="imgshow=false;imgsrc=''">
            <img :src="imgsrc" alt="">
        </div>
    </div>
</template>

<script>
    import COS  from 'cos-js-sdk-v5'

    export default {
        data: function () {
            return {
                merber_id:Cookies.get('merber_id'),
                imgshow:false,

                messageimgfile:'',
                checkmessageimgfile:'',
                messageimgurl:'',
                checkmessageimgurl:'',
                imgsrc:"",
                imgurl:[],
                imgurl2:[],
                imgfile:[],
                imgfile2:[],
                servicetext:'',
                Unsolvedtext:'',
                message:{},
                messageimg:'',
                leave_message:[],
                isupsuc:false,
                isupsuche:false,
                message_id:'',
                subbeld:false,
                anew_subbeld:false,
                isclose:'',
                loading:false
            }
        },
        components: {},
        methods: {
            upsuccess:function(){
                var _this = this
                var message_id=this.$route.query.id
                if(message_id == undefined){
                    this.$http.post('https://www.trillionricher.com/1.0/check_message', {merber_id:this.merber_id,token:this.OS.token},{emulateJSON:true}).then(function(res){
                        if(res.body.success==-1){
                            this.Logout()
                        }else if(res.body.success===1){
                            this.isupsuc=true
                        }else if(res.body.success===2){
                            this.message=res.body.data.message
                            this.message_id=res.body.data.message.message_id
                            this.messageimg=res.body.data.message.image.split(',')
                            this.leave_message=res.body.data.leave_message
                        }
                    },function(res){
                        console.log(res);
                    });
                }else {
                    this.$http.post('https://www.trillionricher.com/1.0/get_message',{
                        message_id:message_id,
                    },{emulateJSON:true}).then(function(res){
                        console.log(res);
                        if(res.body.success===1){
                            this.isclose=res.body.data.message.state
                            this.message=res.body.data.message
                            this.message_id=res.body.data.message.message_id
                            this.messageimg=res.body.data.message.image.split(',')
                            this.leave_message=res.body.data.leave_message
                        }
                    },function(res){
                        console.log(res);
                    });
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
            deleteimgurl:function(i){
                this.imgurl.splice(i,1)
                this.imgfile.splice(i,1)
                this.imgurl2.splice(i,1)
                this.imgfile2.splice(i,1)
            },
            startRead:function (type) {
                if(type==1){
                    var fileObj=document.getElementById('imgUpFile1').files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(0)
                    console.log(fileObj);

                    if(!/\.(jpg|png|JPG|PNG)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.messageimgurl = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize < 1024){
                            this.messageimgfile = fileObj
                        }else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.messageimgfile =  this.base64_file(res.base64,fileObj.name)
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.messageimgfile = this.base64_file(res.base64,fileObj.name)
                            })
                        }
                    }
                }else {
                    var fileObj=document.getElementById('imgUpFile2').files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(0)
                    if(!/\.(jpg|png|JPG|PNG)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.checkmessageimgurl = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize < 1024){
                            this.checkmessageimgfile = fileObj
                        }else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.checkmessageimgfile =  this.base64_file(res.base64,fileObj.name)
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.checkmessageimgfile = this.base64_file(res.base64,fileObj.name)
                            })
                        }
                    }
                }
            },
            //新留言提交
            newsubmitUpload:function () {
                let _this = this
                this.servicetext=this.servicetext.replace(/\n|\r\n/g,"<br/>")
                if(this.servicetext==''){
                    this.$toast({
                        message: '內容不可空白',
                        type: 'fail',
                        duration: 1000,
                    })
                }else {
                    this.subbeld=true
                    this.loading = true
                    // const cos = new COS({
                    //     getAuthorization: function (options, callback) {
                    //         _this.$http.post('https://www.trillionricher.com/1.0/getaccout_cos',{
                    //             merber_id: _this.OS.merber_id,
                    //             token: _this.OS.token,
                    //         },{emulateJSON:true}).then(function(res) {
                    //             var credentials = res.credentials
                    //             callback({
                    //                 TmpSecretId: credentials.tmpSecretId,
                    //                 TmpSecretKey: credentials.tmpSecretKey,
                    //                 XCosSecurityToken: credentials.sessionToken,
                    //                 // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                    //                 StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
                    //                 ExpiredTime: res.expiredTime, // 时间戳，单位秒，如：1580000900
                    //             });
                    //         })
                    //     }
                    // })
                    var cos = new COS({
                        SecretId: 'AKIDdvyoT2wOHsKXx6ybxA7nHWWHn21kmlMi',
                        SecretKey: 'I9miOoxqXx6zmTc3PFp79uVUPElOkqfG',
                    });
                    if(_this.messageimgurl != ''){
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
                            Key:  'message/'+'message'+sign,
                            StorageClass: 'STANDARD',
                            Body: _this.messageimgfile, // 上传文件对象
                            onProgress: function(progressData) {
                            }
                        }, function(err, data) {
                            _this.$http.post('https://www.trillionricher.com/1.0/sub_message', {
                                image: 'https://'+data.Location,
                                merber_id:_this.OS.merber_id,
                                token:_this.OS.token,
                                content:_this.servicetext
                            },{emulateJSON:true}).then(function(res){
                                _this.loading = false
                                if(res.body.success==-1){
                                    _this.Logout()
                                }else if(res.body.success===1){
                                    _this.$toast({
                                        message: '您的留言已發出，請等待客服回覆!',
                                        type: 'success',
                                        duration: 1000,
                                    })
                                    _this.$router.push({path: '/'})
                                }
                            },function(res){
                                console.log(res);
                            });
                        })
                    }else {
                        _this.$http.post('https://www.trillionricher.com/1.0/sub_message', {
                            image: '',
                            merber_id:_this.OS.merber_id,
                            token:_this.OS.token,
                            content:_this.servicetext
                        },{emulateJSON:true}).then(function(res){
                            this.loading = false
                            if(res.body.success==-1){
                                _this.Logout()
                            }else if(res.body.success===1){
                                _this.$toast({
                                    message: '您的留言已發出，請等待客服回覆!',
                                    type: 'success',
                                    duration: 1000,
                                })
                                _this.$router.push({path: '/'})
                            }
                        },function(res){
                            console.log(res);
                        });
                    }





                }
            },
            //二次提交
            anew_message:function () {
                let _this = this
                this.Unsolvedtext=this.Unsolvedtext.replace(/\n|\r\n/g,"<br/>")
                if(this.Unsolvedtext==''){
                    this.$toast({
                        message: '內容不可空白',
                        type: 'fail',
                        duration: 1000,
                    })
                }else {
                    this.anew_subbeld=true
                    this.loading = true
                    // const cos = new COS({
                    //      getAuthorization: function (options, callback) {
                    //             _this.$http.post('https://www.trillionricher.com/1.0/getaccout_cos',{
                    //                 merber_id: _this.OS.merber_id,
                    //                 token: _this.OS.token,
                    //             },{emulateJSON:true}).then(function(res) {
                    //                 var credentials = res.credentials
                    //                 callback({
                    //                     TmpSecretId: credentials.tmpSecretId,
                    //                     TmpSecretKey: credentials.tmpSecretKey,
                    //                     XCosSecurityToken: credentials.sessionToken,
                    //                     // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                    //                     StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
                    //                     ExpiredTime: res.expiredTime, // 时间戳，单位秒，如：1580000900
                    //                 });
                    //             })
                    //       }
                    // })
                    var cos = new COS({
                        SecretId: 'AKIDdvyoT2wOHsKXx6ybxA7nHWWHn21kmlMi',
                        SecretKey: 'I9miOoxqXx6zmTc3PFp79uVUPElOkqfG',
                    });
                    if(_this.checkmessageimgurl != ''){
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
                            Key:  'message/'+'repeatedlymsg'+sign,
                            StorageClass: 'STANDARD',
                            Body: _this.checkmessageimgfile, // 上传文件对象
                            onProgress: function(progressData) {
                            }
                        }, function(err, data) {
                            _this.$http.post('https://www.trillionricher.com/1.0/anew_message',{
                                image: 'https://'+data.Location,
                                content:_this.Unsolvedtext,
                                message_id:_this.message_id
                            },{emulateJSON:true}).then(function(res){
                                this.anew_subbeld=false
                                this.loading = false
                                if(res.body.success===1){
                                    this.$toast({
                                        message: '您的留言已發出，請等待客服回覆!',
                                        type: 'success',
                                        duration: 1000,
                                    })
                                    this.$router.push({path: '/'})
                                }
                            },function(res){
                                console.log(res);
                            });
                        })
                    }else {
                        _this.$http.post('https://www.trillionricher.com/1.0/anew_message',{
                            image: '',
                            content:_this.Unsolvedtext,
                            message_id:_this.message_id
                        },{emulateJSON:true}).then(function(res){
                            this.anew_subbeld=false
                            if(res.body.success===1){
                                this.$toast({
                                    message: '您的留言已發出，請等待客服回覆!',
                                    type: 'success',
                                    duration: 1000,
                                })
                                this.$router.push({path: '/'})
                            }
                        },function(res){
                            console.log(res);
                        });
                    }


                }
            },
            close_solve:function () {
                this.$http.post('https://www.trillionricher.com/1.0/close_solve',{
                    message_id:this.message_id,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success===1){
                        this.$toast({
                            message: '很高興幫到您，祝您購物愉快!',
                            type: 'success',
                            duration: 1000,
                        })
                        this.$router.push({path: '/'})
                    }
                },function(res){
                    console.log(res);
                });
            },
            gettongzhi:function () {
                this.$http.post('https://www.trillionricher.com/1.0/notification',{
                    merber_id:this.merber_id,
                    token:this.OS.token
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){

                        this.Logout()
                    }else if(res.body.success===1){
                        for(var i=0;i<10;i++){
                            if(res.body.data[i].is_receive==0 && res.body.data[i].type==1){
                                this.ly_tongzhi=true
                            }
                        }
                         this.ly_tongzhi=res.body.data
                    }
                },function(res){
                    console.log(res);
                });
            }
        },
        computed: {},
        watch: {},
        mounted: function () {
            if(this.merber_id==undefined){
                this.$router.push('/login');
            }else {
                this.upsuccess()
                console.log(this.message);
            }
        }
    }
</script>
<style>
    .servicetext{
        width: 100%;
        font-size: 14px;
        background-color: #e6e6e6;
        border-radius: 5px;
        padding: 10px 20px;
        border: none;
    }
    .uploadimg{
        display: inline-block;
        position: relative;
    }
    .uploadimg>input[type=file]{
        opacity:0;
        width: 68px;
        height: 68px;
        position: absolute;
        top:0;
    }
    .uploadimg >div{
        width: 68px;
        height: 68px;
        line-height: 68px;
        border:2px  dashed #6f6f6f;
        text-align: center;
    }
    .showimg{
        width: 68px;
        height: 68px;
        margin-right: 10px;
        position: relative;
    }
    .showimg img{
        width: 100%;
        height: 100%;
    }
    .successimg{
        display: flex;
    }
    .successimg >span{
        width: 68px;
        height: 68px;
        margin-right: 10px;
    }
    .successimg >span img{
        width: 100%;
        height: 100%;
    }
    .largeimg{
        width:100%;
        height:100%;
        position:fixed;
        top:0;display: flex;
        align-items: center;
        background-color: rgba(0,0,0,0.4)
    }
    .largeimg img{
        width:100%;
    }
</style>