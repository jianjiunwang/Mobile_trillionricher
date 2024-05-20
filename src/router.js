import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index'
import Personal from './components/personal'
import Login from './components/login'
import Register from './components/register'
import OrderList from './components/ordeList'
import Account from './components/account'
import Updatepwd from './components/accounts/updatePassword'
import Username from './components/accounts/updateusername'
import Phone from './components/accounts/updatephone'
import Email from './components/accounts/updateemail'
import SubStitute from './components/SubStitute'
import SubStitute_Two from './components/SubStitute_two'
import Rchuzhi from './components/RBchuzhi'
import Daichu from './components/daichu'
import Zkl from './components/zhikouling'
import Record_r from './components/record_r'
import Orderdata from './components/orderdata'
import Customerservice from './components/Customerservice'
import AddBank from './components/addbank'
import Addidentity from './components/addidentity'
import Addfile from './components/addfile'
import Helplist from './components/helplist'
import Addalipay from './components/addalipay'
import Sellwell from './components/sellwell'
import Notification from './components/notification'
import Announcement from './components/announcement'
import ForgotPassword from './components/Forgotpassword'
import Platform_r from './components/Platform_r'
import orderdeta_zb from './components/orderdeta_zb'
import orderlist_zb from './components/orderlist_zb'
import Daishou from './components/daishou'



Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {path: '/', component: Index},
        {path: '/personal', component: Personal},
        {path: '/login', component: Login},
        {path: '/register', component: Register},
        {path: '/order_list', component: OrderList},
        {path: '/account', component: Account,},
            {path:'/up_pwd',component:Updatepwd},
            {path:'/up_uname/:uname',name:'up_uname',component:Username},
            {path:'/up_ph',component:Phone},
            {path:'/up_email/:phone,:email',name:'up_email',component:Email},
        {path:'/substitute',component:SubStitute},
        {path:'/substitute_two',component:SubStitute_Two,name:'Two'},
        {path:'/rbcz',component:Rchuzhi},
        {path:'/sub_store',component:Daichu},
        {path:'/zkl',component:Zkl},
        {path:'/record_r',component:Record_r},
        {path:'/orderdata',component:Orderdata},
        {path:'/service',component:Customerservice},
        {path:'/addbank',component:AddBank},
        {path:'/addidentity',component:Addidentity},
        {path:'/addfile',component:Addfile},
        {path:'/helplist',component:Helplist},
        {path:'/addalipay',component:Addalipay},
        {path:'/sellwell',component:Sellwell},
        {path:'/notification',component:Notification},
        {path:'/daishou',component:Daishou},
        {path:'/announcement',component:Announcement},
        {path:'/forgotpassword',component:ForgotPassword},
        {path:'/platform_r',component:Platform_r},
        {path:'/order_zb',component:orderdeta_zb},
        {path:'/orderlist_zb',component:orderlist_zb},
    ]
});





