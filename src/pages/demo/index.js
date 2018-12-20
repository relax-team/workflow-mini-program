import regeneratorRuntime from '../../libs/regenerator-runtime';
import cfg from '../../config/index';
const app = getApp();
Page({
    data: {
        userInfo: {},
        quantity: 1
    },
    onLoad() {

    },
    /*
    * 数量变化
    * */
    onQuantityChange(e){
        this.setData({
            quantity: e.detail
        });
    },
});
