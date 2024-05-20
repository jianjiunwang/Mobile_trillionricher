<template>
    <div class="personal">
        <div class="pagetitle">
            <div>
                <router-link to="/personal">
                    <van-icon name="arrow-left" size="14px"></van-icon>
                    <span style="margin-left: 10px"><b>修改暱稱</b></span>
                </router-link>
            </div>
        </div>
        <van-cell title="目前暱稱"  :value="uname" />
        <van-field
                v-model="merber_username"
                label="新暱稱"
        />
        <div style="padding: 0 15px;margin-top: 20px">
            <van-button size="small" class="uodata_bt"  type="primary" small block @click="upname"> 送出並儲存</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                merber_username:'',
                merber_id:Cookies.get('merber_id'),
                uname:this.$route.params.uname
            }
        },
        components: {},
        methods: {
            upname:function () {
                this.$http.post('https://www.trillionricher.com/1.0/up_personal/',{
                    merber_id:this.merber_id,
                    token:this.OS.token,
                    merber_nickname:this.merber_username
                },{emulateJSON:true}).then(function(res){
                    if(res.body.success==-1){
                        this.Logout()
                    }else if(res.body.success===1){
                        this.uname=this.merber_username
                        this.$toast({
                            message:res.body.msg,
                            type:'success',
                            duration:1000,
                        });
                        this.$router.push('/account');
                    }
                },function(res){
                    console.log(res);
                });
            }
        },
        computed: {},
        watch: {},
        mounted: function () {
        }
    }
</script>
