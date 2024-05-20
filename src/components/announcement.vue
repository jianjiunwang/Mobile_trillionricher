<template>
    <div class="index">
        <van-nav-bar title="會員公告" left-arrow  :fixed="true" @click-left="upstep"></van-nav-bar>
        <div style="padding: 10px;overflow: auto;" >
            <van-cell  v-for="(item,i) in gonggaodata" :key="i"   @click="getgonggaolistdata(item.notice_id)">
                <template slot="title">
                      {{item.title}}
                </template>
                <template slot="label">{{item.create_time|convTime}}</template>
            </van-cell>
        </div>
        <van-dialog
                v-model="gonggaolistshow"
                style="max-height: 500px;overflow-y:auto"
        >
            <div style="padding:0 10px 20px 10px">
                <p style="text-align: center;font-size:20px;padding: 10px 0;font-weight: bold">{{gonggaolistdata.title}}</p>
                <div class="gglistcontent" v-html="gonggaolistdata.content"></div>
            </div>
        </van-dialog>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                gonggaolistshow:false,
                gonggaodata:[],
                gonggaolistdata:{}
            }
        },
        components: {},
        methods: {
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
        computed: {},
        watch: {},
        mounted: function () {
            this.getgongggao()
        }
    }
</script>
<style>
    .gglistcontent img{
        width: 100%;
    }
</style>