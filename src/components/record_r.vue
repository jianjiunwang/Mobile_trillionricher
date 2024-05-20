<template>
    <div class="record_r">
        <div class="pagetitle">
            <div>
                <router-link to="/">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>E幣交易記錄</b></span>
                </router-link>
            </div>
        </div>
        <table class="order_table">
            <tr>
                <th colspan="3">訂單編號</th>
                <th>內容</th>
            </tr>
            <tr>
                <th>收入</th>
                <th>支出</th>
                <th>餘額</th>
                <th>完成時間</th>
            </tr>
            <tbody v-for="(item,i) in rblist" :key="i" :class="i%2?'onebg':'twobg'">
                <tr>
                    <td colspan="3">{{item.order_num}}</td>
                    <td>{{item.detail}}</td>
                </tr>
                <tr>
                    <td class="colorgreen" v-if="(item.income_expenses).substr(0,1)=='+'">{{item.income_expenses}}</td>
                    <td v-else>0</td>
                    <td class="colorOrange" v-if="(item.income_expenses).substr(0,1)=='-'">{{item.income_expenses}}</td>
                    <td v-else>0</td>
                    <td>{{item.balance}}</td>
                    <td>{{item.create_time|convTimehms}}</td>
                </tr>

            </tbody>

        </table>
        <!--<div class="order_e" v-for="(item,i) in rblist" :key="i">-->
            <!--<div>-->
                <!--<span>訂單編號 :</span>-->
                <!--<span>{{item.order_num}}</span>-->
            <!--</div>-->
            <!--<div>-->
                <!--<span>{{item.detail}}</span><span>{{item.create_time | convTimehms}}</span>-->
            <!--</div>-->
            <!--<div>-->
                <!--<span>E幣餘額: <b>{{item.balance}}</b></span>-->
                <!--<span v-if="(item.income_expenses).substr(0,1)=='+'"  style="font-size:25px;color: #19be6b;font-weight: bold">{{item.income_expenses}}</span>-->
                <!--<span v-if="(item.income_expenses).substr(0,1)=='-'"  style="font-size:25px;color: #ff000f;font-weight: bold">{{item.income_expenses}}</span>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                merber_id:Cookies.get('merber_id'),
                rblist:{},
            }
        },
        components: {},
        methods: {
            getorderE_listdata:function () {
                this.$http.post('https://www.trillionricher.com/1.0/r_detail',{
                    merber_id:this.merber_id,
                    token:this.OS.token,
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else if(res.body.success===1){
                        this.rblist=res.body.data
                    }
                },function(res){
                    console.log(res);

                });
            }
        },
        computed: {},
        watch: {},
        mounted: function () {
            this.getorderE_listdata()
            if(this.merber_id==undefined){
                this.$router.push('/login');
            }
        }
    }
</script>
<style>
    .order_e{
        background-color: #fff;
        padding: 20px 20px 10px;
        margin-bottom: 10px
    }
    .order_e>div{
        display: flex;justify-content: space-between;margin-bottom: 10px
    }
</style>
