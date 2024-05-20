<template>
    <div class="tabbar">
        <van-tabbar v-model="active" style="z-index: 999;background-color: #fff;">
            <van-tabbar-item icon="wap-home" to="/" @click="active = 0">首頁</van-tabbar-item>
            <van-tabbar-item icon="add-o" @click="service= true;active = 1">服務申請</van-tabbar-item>
            <van-tabbar-item v-if="merber_id==null" icon="contact" to="/login" @click="active = 2">未登入</van-tabbar-item>
            <van-tabbar-item v-else icon="contact" to="/personal" @click="active = 2">我的</van-tabbar-item>
        </van-tabbar>
        <van-action-sheet
                    v-model="service"
                    name="ser"
                    :actions="actions"
                    @select="onSelect"
                    cancel-text="取消"
        ></van-action-sheet>
    </div>
</template>

<script>
    export default {
        data:function () {
            return {
                active:0,
                merber_id:Cookies.get('merber_id'),
                service:false,//服务弹出框开关
                actionsval:'',
                actions:[
                    {name:'淘寶/天貓/阿里巴巴',value:2},
                    {name:'支付寶服務',value:3},

                ],
            }
        },
        methods:{
            onSelect(item) {

                if(this.merber_id==undefined){
                    this.$router.push('/login');
                  this.service=false
                }else {
                    // 点击选项时默认不会关闭菜单，可以手动关闭
                    this.service = false;
                    if(item.value==1){
                        this.$router.push('/Platform_r');
                    }else if(item.value==2){
                        this.$router.push('/substitute');
                    }else if(item.value==3){
                        this.$router.push('/sub_store');
                    }else if(item.value==4){
                        this.$router.push('/rbcz');
                    }
                    this.actionsval=item.value
                }
            }
        },
        watch:{
        },
        matched:function(){
        }
    }
</script>

