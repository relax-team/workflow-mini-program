import regeneratorRuntime from '../../libs/regenerator-runtime';
import cfg from '../../config/index';

const app = getApp();
Page({
    data: {
        userInfo: {},
        quantity: 1,
        slideMenu: {
            list: [{
                id: 123,
                title: '测试侧滑菜单组件123'
            }, {
                id: 456,
                title: '测试侧滑菜单组件456'
            }]
        }
    },
    onLoad() {

    },
    /*
    * 数量变化
    * */
    onQuantityChange(e) {
        this.setData({
            quantity: e.detail
        });
    },
    /*
    * 侧滑菜单操作
    * */
    onDelete(e) {
        console.log('当前删除的ID为： ', e.detail)
    }
});
