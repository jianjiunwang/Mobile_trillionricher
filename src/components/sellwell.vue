<template>
    <div>
        <van-nav-bar title="暢銷商品" left-arrow @click-left="upstep"></van-nav-bar>
        <div>
            <img src="https://www.trillionricher.com/upload/shop/20190925/9f29df2c74f008b7a83c8bbf6e0315d0.jpg" alt="" width="100%">
            <h2 id="goumai" style="text-align: center"> 我要購買 </h2>
            <div class="Specifications">
                <ul>
                    <li v-for="(item,index) in 3">
                        <div>
                            <span>大闸蟹</span>
                            <span>小</span>
                            <span>$ 50 TWD</span>
                        </div>
                        <van-button color="#7232dd">选购</van-button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {}
        },
        components: {},
        methods: {},
        computed: {},
        watch: {},
        mounted: function () {

        }
    }
</script>
