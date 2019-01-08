Component({
    options: {
        multipleSlots: false // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        title: {
            type: Boolean,
            value: false
        },
        subTitle: {
            type: Boolean,
            value: false
        }
    },
    data: {},
    methods: {
        /*
        * 初始化数据
        * */
        display(params){
            this.setData({
                ...params
            });
        },
        // 打开弹窗
        show() {
            this.setData({
                show: true
            });
            console.log(1111)
        },
        // 关闭弹窗
        hide() {
            this.setData({
                show: false
            });
        },
        /*
        * 点击取消
        * */
        cancel(){
            this.setData({
                show: false
            });
        },
        /*
        * 点击确定
        * */
        confirm(){

        }

    }
});
