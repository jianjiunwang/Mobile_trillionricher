const token = Cookies.get('egopay_key')
const merber_id = Cookies.get('merber_id')
const merber_name = Cookies.get('merber_name')
const merber_email = Cookies.get('merber_email')


import img0 from '../image/slideverifyimgs/img1.jpg';
import img1 from '../image/slideverifyimgs/img2.jpg';
import img2 from '../image/slideverifyimgs/img3.jpg';
import img3 from '../image/slideverifyimgs/img4.jpg';
const imgs = [img0,img1,img2,img3]
export default {
    token,imgs,merber_id,merber_name,merber_email
}
