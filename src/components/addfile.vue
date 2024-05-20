<template>
    <div class="personal">
        <div class="pagetitle">
            <div>
                <router-link to="/personal">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>防洗錢聲明文檔上傳</b></span>
                </router-link>
            </div>
        </div>
        <div class="addfile">
            <div style="padding:10px;font-size: 12px;border-radius: 5px;background-color:#3D3D3D;color: #ffffff">
                <p>1、請先下載防洗錢聲明相關文件列印後，親筆簽名拍照。</p>
                <p>2、將親簽過後的文件拍照上傳,圖片格式僅限:JPG、PNG、GIF檔。</p>
                <p>3、防洗錢聲明均為人工驗證。 請消費者本人親筆簽名後拍照清楚上傳。 以免驗證失敗。</p>
            </div>
            <br>
            <p style="font-size: 15px;color: #666666">防洗錢聲明檔請點選以下連結下載</p>
            <a target="_blank" href="https://trillionricher-1258896139.cos.ap-tokyo.myqcloud.com/file/%E9%98%B2%E6%B4%97%E9%8C%A2%E8%AD%89%E6%98%8E%E6%9B%B8.pdf" style="color: #3399FF;font-size: 15px;margin: 20px 0;display: block">【防洗錢聲明文檔】</a>
            <a target="_blank" href="https://play.google.com/store/apps/details?id=com.adobe.reader&hl=zh_TW" style="color: #3399FF;font-size: 15px;margin: 20px 0;display: block">【Android : Adobe pdf 簽名App】</a>
            <a target="_blank" href="https://itunes.apple.com/tw/app/adobe-acrobat-reader/id469337564?mt=8" style="color: #3399FF;font-size: 15px;margin: 20px 0;display: block">【IOS : Adobe pdf 簽名App】</a>
            <p style="font-size: 15px">選擇圖片</p>
            <div style="display: flex;align-items: center;margin-top: 20px">
                <div class="uploadimg" >
                    <input type="file" multiple="multiple" @change="startRead" id="imgUpFile" >
                    <div>
                        <i class="iconfont icon-shumajiadian" style="font-size: 20px"></i>
                    </div>
                </div>
                <div style="display: flex;margin-left: 10px">
                        <img :src="filesrc" alt="" height="68px">
                </div>
            </div>
            <div style="margin-top: 50px">
                <van-button type="primary" size="large" style="height: 40px;line-height: 40px;font-size: 14px" @click="addfileUpload">送出並確認</van-button>
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
    import COS  from 'cos-js-sdk-v5'

    export default {
        data: function () {
            return {
                merber_id:Cookies.get('merber_id'),
                imgurl:[],
                imgfile:[],
                imgshow:false,
                imgsrc:'',
                filesrc:'',
                filesfile:'',
                loding:false,
            }
        },
        components: {},
        methods: {
            deleteimgurl:function(i){
                this.imgurl.splice(i,1)
                this.imgfile.splice(i,1)
            },
            startRead:function () {
                var fileObj = document.getElementById("imgUpFile").files[0];
                var fileObjsize = (fileObj.size / 1024).toFixed(1)

                if(!/\.(jpg|jpeg|png|JPG|PNG|heic|heif|HEIC|HEIF)$/.test(fileObj.name) ){
                    this.$toast({
                        message: '請選擇JPG或PNG圖片',
                        type: 'fail',
                        duration: 2000,
                    })
                }else {
                    this.filesrc = window.URL.createObjectURL(fileObj) //转base64
                    if(fileObjsize < 1024){
                        this.filesfile = fileObj
                    }else if(fileObjsize > 1024 && fileObjsize < 5120){
                        lrz(fileObj,{quality:0.7}).then(res=>{
                            this.filesfile =  this.base64_file(res.base64,fileObj.name)
                        })
                    }else if(fileObjsize > 5120){
                        lrz(fileObj,{quality:0.5}).then(res=>{
                            this.filesfile = this.base64_file(res.base64,fileObj.name)
                        })
                    }
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
            addfileUpload:function () {
                var _this = this
                if(this.filesrc == ''){
                    this.$toast({
                        message: '請選擇防洗錢聲明文件',
                        type: 'fail',
                        duration: 2000,
                    })
                }else {
                    this.loding = true

                    // var cos = new COS({
                    //     getAuthorization: function (options, callback) {
                    //         _this.$http.post('https://www.trillionricher.com/1.0/getaccout_cos',{
                    //             merber_id: _this.OS.merber_id,
                    //             token: _this.OS.token,
                    //         },{emulateJSON:true}).then(function(res) {
                    //             var credentials = res.credentials
                    //             console.log(res);
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
                        Key:  'verifyfile/'+sign,
                        StorageClass: 'STANDARD',
                        Body: _this.filesfile, // 上传文件对象
                        onProgress: function(progressData) {
                        }
                    }, function(err, data) {
                        if(data.statusCode == 200){
                            _this.$http.post('https://www.trillionricher.com/1.0/file_verify', {
                                merber_id:_this.OS.merber_id,
                                token:_this.OS.token,
                                image:"https://"+data.Location
                            },{emulateJSON:true,before:function (request) {
                                    _this.loding=true
                                }}).then(function(res){
                                if(res.body.success==-1){
                                    this.Logout()
                                }else if(res.body.success===1){
                                    _this.$toast({
                                        message: '您的防洗錢聲明文件已發出，請等待審核!',
                                        type: 'success',
                                        duration: 1000,
                                    })
                                    _this.$router.push({path: '/personal'})
                                    _this.loding=false
                                }else {
                                    _this.loding=false
                                    _this.$toast({
                                        message: '網絡錯誤',
                                        type: 'fail',
                                        duration: 2000,
                                    })
                                }
                            },function(res){
                                console.log(res);
                            });
                        }
                    })
                }
            }

        },
        computed: {},
        watch: {},
        mounted: function () {

        }
    }
</script>
