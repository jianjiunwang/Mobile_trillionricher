 <template>
    <div class="index">
      <van-swipe :autoplay="3000" indicator-color="white"  class="Carousel">
         <van-swipe-item v-for="item in banana" >
              <img src="../assets/image/banner@3x.png" alt=""  style="margin: 0 auto;display: block;border-radius: 10px; width:calc(100vw - 20px);">
          </van-swipe-item>
      </van-swipe>
	  <div class="box">
          <van-notice-bar :text="indextongzhi" background="#fff"  color="#0d397e"  left-icon="volume-o" />
          <div class="box_title">服務申請</div>
		  <div class="box_list">
		      <router-link to="/substitute">
		          <img src="../assets/image/taobao.png" alt="">
		          <span>淘寶</span>
		      </router-link>
          <router-link to="/substitute">
		          <img src="../assets/image/tianmao2.png" alt="">
		          <span>天貓</span>
		      </router-link>
			  <router-link to="/substitute">
			      <img src="../assets/image/1688.png" alt="">
			      <span>阿里巴巴</span>
			  </router-link>
<!--			  <router-link to="/substitute">-->
<!--			      <img src="../assets/image/xianyu.png" alt="">-->
<!--			      <span>闲鱼</span>-->
<!--			  </router-link>-->
		      <router-link to="/sub_store" >
		          <img src="../assets/image/alipay.png" alt="" >
		          <span>支付寶</span>
		      </router-link>
		  </div>
          <div class="box_seikuai" style="display:none;"></div>
<!--		  <div class="box_list" style="margin-top: 20px">-->
<!--		      <div @click="goservice(0)">-->
<!--		          <img src="../assets/image/douyu.png" alt="">-->
<!--		          <span>陸版鬥魚</span>-->
<!--		      </div>-->
<!--			  <div @click="goservice(1)">-->
<!--			      <img src="../assets/image/huyalogo.png" alt="">-->
<!--			      <span>陸版虎牙</span>-->
<!--			  </div>-->
<!--		      <div  @click="goservice(2)">-->
<!--		          <img src="../assets/image/douyinl.png" alt="" >-->
<!--		          <span>陸版抖音</span>-->
<!--		      </div>-->
<!--		      <div @click="goservice(3)">-->
<!--		          <img src="../assets/image/kuaishou.png" alt="" >-->
<!--		          <span>陸版快手</span>-->
<!--		      </div>-->
<!--		  </div>-->
          <div class="box_title">會員公告</div>
          <div class="inform">
              <!--<div style="display: flex;justify-content: space-between;align-items: center;">-->
                  <!--<span style="font-weight: bold;color: #666;font-size: 17px">會員公告</span>-->
                  <!--<router-link to="/announcement" >-->
                       <!--<span style="font-size: 14px;color: #1989fa;font-weight: bold" >查看更多</span>-->
                  <!--</router-link>-->
              <!--</div>-->
              <div v-for="(item,i) in gonggaodata" :key="i"  v-if='i < 5' @click="getgonggaolistdata(item.notice_id)">
                  <span style="width: 70%">{{item.title}}</span>
                  <div style="margin-top:6px">{{item.create_time|convTime}}</div>
              </div>

          </div>
          <div class="box_seikuai" style="display:none"></div>
      </div>

      <van-dialog
              v-model="yanzhengshow"
              show-cancel-button
              confirm-button-text="身份認證"
              cancel-button-text="文件認證"
              @confirm="addidentityyz"
              @cancel="addfileyz"
              cancel-button-color="#1989fa"
              confirm-button-color="#1989fa"
              :close-on-click-overlay="true"
      >
          <div style="padding:0 20px 20px 20px">
              <p style="text-align: center;font-size: 18px;padding: 10px 0">提示</p>
             <p>您尚未通過身份認證與文件認證，請盡速提交。本站與警方165反詐騙中心直接通報，勿存僥倖心態提交假資料。</p>
          </div>
      </van-dialog>
      <!--<van-dialog
              v-model="tongzhi"
              cancel-button-color="#1989fa"
              :showConfirmButton="true"
              :close-on-click-overlay="true"
              style="overflow:auto;max-height: 70%"
      >
          <div style="padding: 10px ;font-size: 14px">
              <h3 style="font-weight: bold;font-size: 20px;color: red;text-align: center;">會員公告</h3>
              <div class="tongzhistyle"  v-html="gonggaohtml"></div>
          </div>

      </van-dialog>
      <van-dialog
              v-model="gonggaolistshow"
      >
          <div style="padding:0 10px 20px 10px;max-height: 500px;overflow-y:auto">
              <p style="text-align: center;font-size:20px;padding: 10px 0;font-weight: bold">{{gonggaolistdata.title}}</p>
              <div class="gglistcontent" v-html="gonggaolistdata.content"></div>
          </div>
      </van-dialog>-->


  </div>
</template>

<script>

export default {
    data:function () {
        return {
            usershow:false,
            tongzhi:false,
            gonggaohtml:'',
            merber_id:Cookies.get('merber_id'),
            wti:Cookies.get('wti'),
            banana:[],
            active:0,
            exchange:'',
		      	update_time:'',
            Keyword:'',
            pageList:[],
            gonggaolistshow:false,
            loading: false,
            finished: false,

            ly_tongzhi:false,
            notification_id:'',
            indexdata:{},
            yanzhengshow:false,
		      	notice_id:"",
            indextongzhi:'',
            gonggaodata:[],
            gonggaolistdata:{}
        }
    },
    components: {
    },
    methods:{
        Openandclose(){
            this.$http.post('https://www.trillionricher.com/1.0/notice_switch',{
            },{emulateJSON:true,})
                .then(function(res){
                    if(res.body.success==1){
                        if(res.body.data[0].switch==1){
                            this.tongzhi = true
                            this.gonggaohtml = res.body.data[0].content
                        }
                    }
                },function(res){
                    console.log(res);
                });
        },
        getnoticedata:function (type) {
          if(type != 1){
            this.$router.push({path:'/helplist',query:{notice_id:type}})
          }else{
            this.$router.push('/helplist')
          }

        },
        goservice:function(type){
            if(this.OS.merber_id==undefined){
                this.$router.push('/login');
                return false
            }

            this.$router.push({
                path:'/Platform_r',
                query:{
                    type:type
                }
            });


        },
        gettongzhi:function () {
            this.$http.post('https://www.trillionricher.com/1.0/notification',{
                merber_id:this.merber_id,
                token:this.OS.token
            },{emulateJSON:true}).then(function(res){
                if(res.body.success===1){
                    for(var i=0;i<res.body.data.length && i<10;i++){
                        if(res.body.data[i].is_receive==0 && res.body.data[i].type==1){
                            this.ly_tongzhi=true
                            this.notification_id=res.body.data[i].notification_id
                        }
                    }
                }
            },function(res){
                console.log(res);
            });
        },
        getindextongzhi(){
            this.$http.post('https://www.trillionricher.com/1.0/inform',{
                page:1
            },{emulateJSON:true,before:() =>{this.loading=true}})
                .then(function(res){
                    this.indextongzhi = res.body.data[0].content
                },function(res){
                    console.log(res);
                });
        },
        onLoad() {
            this.$http.post('https://www.trillionricher.com/1.0/discount',{
                product_name:'',
                page_no:1,
            },{emulateJSON:true,before:() =>{this.loading=true}})
                .then(function(res){
                    this.pageList.push(res.body.data.results.tbk_coupon)
                },function(res){
                    console.log(res);
                });
        },
        getyhj:function (key) {
            if(key==''){
                key='特价'
            }
            this.$http.post('https://www.trillionricher.com/1.0/discount',{
                product_name:key,
                page_no:1,
            },{emulateJSON:true,before:() =>{this.loading=true}})
            .then(function(res){
                this.pageList=res.body.data
            },function(res){
                console.log(res);
            });
        },
        funkeyword:function(){
            this.getyhj(this.Keyword)
        },
        Logout:function () {
            var _this=this
            Cookies.remove('merber_id','',{ path: '' });
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
        // handleScroll () {
        //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //     if(scrollTop<160){
        //        this.topbackgr={
        //            background:"transparent",
        //        }
        //     }else{
        //         this.topbackgr={
        //             background:"#E43130",
        //         }
        //     }
        // },
        getexchange:function(){
            this.$http.post('https://www.trillionricher.com/1.0/exchange',{
                exchange_type:4,
            },{emulateJSON:true}).then(function(res){

                if(res.body.success===1){
                    this.exchange=res.body.data[0].exchange
					this.update_time = res.body.data[0].update_time
                }
            },function(res){
                console.log(res);
            });
        },
        showbar:function () {
            if(this.barshow==false){
                this.barshow=true
            }else {
                this.barshow=false
            }
        },
        addidentityyz:function () {
            if (this.indexdata.authentication == 3) {
                this.$toast({
                    message: '身份认证已完成,文件認證尚未完成',
                    type: 'success',
                    duration: 2000,
                })
                this.$router.push({path: '/addfile'})
            } else if (this.indexdata.authentication == 2) {
                this.$toast({
                    message: '身份認證正在審核中，請耐心等待!',
                    type: 'success',
                    duration: 1000,
                })
                this.$router.push({path: '/'})
            } else {
                this.$router.push({path: '/addidentity'})
            }
        },
        addfileyz:function () {
            if(this.indexdata.authentication==2 ){
                this.$toast({
                    message: '文件認證已完成!身份认证認證尚未完成',
                    type: 'success',
                    duration: 1000,
                })
                this.$router.push({ path:'/addidentity'})
            }else if(this.indexdata.authentication==1){
                this.$toast({
                    message: '文件認證正在審核中，請耐心等待!',
                    type: 'success',
                    duration: 1000,
                })
                this.$router.push({ path:'/'})
            }else{
                this.$router.push({ path:'/addfile'})
            }
        },
        gethome:function(){
            this.$http.post('https://www.trillionricher.com/1.0/home',{
            },{emulateJSON:true}).then(function(res){
                if(res.body.success===1){
                    this.banana = res.body.data.banana
                }
            },function(res){
                console.log(res);
            });
        },
        getgongggao(){
            this.$http.post('https://www.trillionricher.com/1.0/notice',{
                page:1
            },{emulateJSON:true}).then(function(res){
                if(res.body.success===1){
                    this.gonggaodata = res.body.data
                }
            },function(res){
                console.log(res);
            });
        },
        getgonggaolistdata(id){
		    this.gonggaolistshow = true
            this.$http.post('https://www.trillionricher.com/1.0/notice_details',{
                notice_id:id
            },{emulateJSON:true}).then(function(res){
                if(res.body.success===1){
                    this.gonggaolistdata = res.body.data[0]
                }
            },function(res){
                console.log(res);
            });
        }
    },
    watch:{
        active:function (val) {
            var key=''
            if(val==1){key='家裝'}
            if(val==2){key='居家'}
            if(val==3){key='女裝'}
            if(val==4){key='男裝'}
            if(val==5){key='内衣'}
            if(val==6){key='數碼'}
            if(val==7){key='电玩'}
            if(val==8){key='汽车'}
            if(val==9){key='宠物'}
            if(val==10){key='玩具'}
            this.$http.post('https://www.trillionricher.com/1.0/discount',{
                product_name:key,
                page_no:1,
            },{emulateJSON:true,before:() =>{this.loading=true}})
                .then(function(res){
                    this.pageList=res.body.data[0]
                },function(res){
                    console.log(res);
                });
        },

    },
    mounted :function () {
        this.Openandclose()
        this.$http.post('https://www.trillionricher.com/1.0/order_bank_alipay',{
            merber_id:this.OS.merber_id,
            token:this.OS.token,
        },{emulateJSON:true}).then(function(res){
                this.indexdata=res.body.data
                if(res.body.data.authentication==1 || res.body.data.authentication==4 || res.body.data.fileverify_authentication==0 || res.body.data.fileverify_authentication==3){
                    this.yanzhengshow=true
                }else {
                    this.yanzhengshow=false
                }
        },function(res){
            console.log(res);
        });
        this.gethome()
        this.gettongzhi()
        this.getgongggao()
        this.getindextongzhi()
        this.$router.push({path: '/'})

       window.addEventListener('scroll', this.handleScroll)
        // if(this.wti==undefined){
        //     this.$dialog.alert({
        //         message: '身份證與文件人工驗證請使用網頁提交申請,銀行帳戶、支付寶帳戶手機上無法新增與刪除，請至網頁申請提交。'
        //     });
        //     Cookies.set('wti', 1,{ expires: 30 });
        // }
    }
}
</script>
