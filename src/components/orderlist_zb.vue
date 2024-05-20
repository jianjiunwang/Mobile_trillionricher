<template>
    <div class="order_list">
        <div class="pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>直播訂單</b></span>
                </router-link>
            </div>
        </div>
        <div>
            <table class="order_table" >
                <tr>
                    <th>直播平台</th>
                    <th>訂單號</th>
                    <th>訂單金額</th>
                </tr>
                <tr>
                    <th>應付新臺幣</th>
                    <th>完成時間</th>
                    <th>查看詳情</th>
                </tr>
                <tbody v-for="(item,i) in orderlist" style="margin:5px 0"  :key="i" :class="i%2==0?'ordaerslect':''">
                    <tr >
                        <td v-if="item.order_type == '1'">鬥魚直播</td>
                        <td v-if="item.order_type == '2'">虎牙直播</td>
                        <td v-if="item.order_type == '3'">抖音直播</td>
                        <td v-if="item.order_type == '4'">快手直播</td>
                        <td >{{item.order_num}}</td>
                        <td >{{item.product_name}}</td>
                    </tr>
                    <tr>
                        <td >{{item.order_twd}}</td>
                        <td >{{item.update_time| convTime}}</td>
                        <td @click="golistdata(item.pid)"><van-icon  name="arrow" size="20px" ></van-icon ></td>
                    </tr>
                </tbody>

            </table>
        </div>
        <div class="page">
            <van-pagination
                    v-model="Page"
                    @change="Currentpage"
                    :items-per-page=5
                    :total-items="listtotal"
                    :show-page-size="5"
                    force-ellipses
            ></van-pagination>
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
                orderlist:[],
                listtotal:0,
                loding:false,
                Page:1,
            }
        },
        components: {},
        methods: {
            Currentpage:function(page){
                this.getorder_listdata(page)
            },
            getorder_listdata:function (page) {
                this.$http.post('https://www.trillionricher.com/1.0/myplatorder',{
                    merber_id:this.OS.merber_id,
                    token:this.OS.token,
                    page:page,
                },{emulateJSON:true,before:function (request) {
                        this.loding=true
                    }}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else if(res.body.success===1){
                        this.listtotal=Number(res.body.msg)
                        this.orderlist=res.body.data
                        this.loding=false
                    }else if(res.body.success===0){
                        this.listtotal=0
                        this.orderlist=''
                        this.loding=false
                    }
                },function(res){
                    console.log(res);
                });
            },
            golistdata:function (id) {
                this.$router.push({
                    path:'/order_zb',
                    query:{
                        id:id
                    }
                });
            },
        },
        computed: {},
        watch: {},
        mounted: function () {
            this.getorder_listdata(1)
        }
    }
</script>
