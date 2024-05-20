import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import Vant from 'vant';
import router from './router'
import 'vant/lib/index.css';
import VueResource from 'vue-resource'
import './assets/iconfont/iconfont.css'
import Cookies from './assets/js/cookie'
import global_ from './assets/js/global_variable'
import { Notify } from 'vant';
import SlideVerify from 'vue-monoplasty-slide-verify';
import lrz from 'lrz'
Vue.use(SlideVerify);
Vue.use(Notify);


Vue.prototype.OS = global_

Vue.prototype.upstep = function (){
    router.go(-1)
}
Vue.use(VueResource)
Vue.use(Vant);
Vue.use(router);
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.filter('convTime', function(value) {
    value = value*1000
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d
})
Vue.filter('convTimehms', function(value) {
    value = value*1000
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
})
Vue.prototype.Logout = function (){
    this.$toast({
        message:'登入過期，請重新登入！',
        type:'fail',
        duration:3000,
    });
    this.$router.push({path: '/login'})
    Cookies.remove('merber_id','',{ path: '' });
    Cookies.remove('merber_name','',{ path: '' });
    Cookies.remove('egopay_key','',{ path: '' });
    Cookies.remove('merber_nickname','',{ path: '' });
    Cookies.remove('head_portrait','',{ path: '' });
}
new Vue({
    el:"#app",
    router,
  render: h => h(App),
}).$mount('#app')
