现今已有很多基于webpack打包进行开发的小程序开发框架，比较知名的有美团小程序框架[mpvue](https://github.com/Meituan-Dianping/mpvue)和腾讯开源的[wepy](https://github.com/Tencent/wepy)。   
对于vue开发和webpack打包比较熟悉的同学，以及希望后期能进一步开发，web端、小程序、weex共用一套代码打包出多端通用的应用程序，建议尝试了解和使用该框架。   
但随着微信官网对于小程序组件化开发的进一步支持，以及开发的曲线越来越低，直接使用官方开发规范进行开发，使用gulp类工具打包会更加便捷；另外，集成的小程序框架需要随着官方的更新快速做出调整，耦合性太高不易修改。
      
> 本开源项目旨在提供一套轻便、快捷的前端小程序开发工作流，快速搭建小程序系统。   

**项目目录：** 

```
.
├── src                        
│   ├── assets                  // 要上传到ftp的静态资源文件
│   ├── components              // 组件
│   │   ├── dialog   
│   │   ├── quantity   
│   ├── config              // 组件
│   │   ├── api.js   
│   │   ├── index.js   
│   ├── images                  // 项目内公用图片文件, tabbar等
│   ├── libs                    // 库文件
│   ├── pages                   // 业务页面
│   │   ├── ...                
│   ├── styles                  // 样式文件
│   ├── subPages                // 分包页面
│   │   ├── ...                
│   ├── utils                   // 通用方法
│   ├── app.js                  // 全局入口及配置
│   ├── app.json                  
│   └── app.less                  
├── .editorconfig                 
├── .eslintignore                 
├── .eslintrc.js                 
├── .gitignore                 
├── config.js                   // 配置文件，如ftp、cdn路径等，可修改
├── gulpfile.js                 // gulp打包
├── package.json                // npm的依赖、项目信息文件
├── README.md                   

```

**本项目特性：**   
> 基于Gulp 4.0开发，实时监控文件变化，高效编译。 可作为小程序快速开发整体解决方案使用。
1. 开发时使用`src`目录，建议使用WebStorm、VSCode编辑器，开启实时保存功能
2. 开发者工具引入`dist`目录，作为预览、调试工具
3. 如果有双屏显示器，开发起来完全爽的不要不要的~~

**`.WXML`**
+ 封装通用组件
    - [x] dialog （对话框）
    - [x] image （图片加载完fadeIn）
    - [ ] 其他
    
+ `@assets`关键字一键替换为`CDN`对应的`https`路径
    ```html
    <!--input-->
    <image src="@assets/test.png"></image>
    
    <!--output-->
    <image src="https://cdn.aliyun.cn/test.png"></image>
    ```


**`.JS`**
+ 全面使用es6语法，支持async/await
+ 可修改配置，支持`TypeScript`、`Coffee`编写

```javascript
function sleep(t) {
  return new Promise(resolve => {
    setTimeout(resolve, t || 10)
  })
}

async function fn() {
  await sleep(200);
}
```

**`.WXSS`**
+ iphone6尺寸作为标准设计稿，使用px作为css编写单位，自动转换为rpx
+ 可选择使用less、sass/scss编写样式

```less
/* input */
@red: #ff4d61;
body{
    padding: 20px .5px 2rpx 8.5px;
    p{
        color: @red;
    }
}
```

```css
/* output */
body {
  padding: 40rpx 1rpx 2rpx 17rpx;
}
body p {
  color: #ff4d61;
}
```

**`静态资源`**
+ 通过gulp sftp，一键上传静态资源到FTP或CDN
+ 定义api接口文档规范，配置mock数据

### 安装使用
1. 安装gulp4环境

```bash
npm install gulp-cli -g
npm install gulp@4 -D
```

2. 安装package.json中的依赖包

```bash
npm i
```

3. 启动编译   
可复制config.js并重命名为config.custom.js，然后根据个人实际需求改写相关配置信息（css预编译器、ftp服务器上传等）。 
    ```javascript
    module.exports = {
        cssCompiler: 'less',
        assetsPath: 'https://cdn.aliyun.cn',
        ftp: {
            host: '',
            port: 20021,
            user: 'root',
            pass: 'password',
            remotePath: ''
        }
    };
    ```  
接下来打开Terminal，运行如下命令：

```bash
gulp
```

4. 预览效果   
使用开发者工具打开编译后的`dist`目录即可。使用第三方编辑器（WebStorm/VsCode等）编辑`src`目录下的文件，保存修改，后台gulp进程会实时编译到`dist`目录。此时微信web开发者工具会自动编译刷新，预览开发效果。


### Q&A
+ Q:**为什么gulp打包中没有AutoPrefixer、babel转ES6功能？**  
  A: 微信开发者工具的“设置-项目设置”中已经提供了这些功能；

+ Q:**src/assets目录会被编译到dist目录吗？**  
  A: assets目录是要上传到ftp/cdn的静态资源文件，不会被编译到dist目录；
  
+ Q:**是否可以使用npm run dev命令进行开发？**  
  A: 可以。package.json文件中scripts选项新增即可；
    ```json
    {
        "scripts": {
            "dev": "gulp"
        }
    }
    ```

### Todo
- [x] 基于gulp4完成小程序开发工作流
- [ ] 完善API接口规范文档及模拟数据
- [ ] Less重写.wxss
- [ ] 增加单元测试

### 开发必备
1. [微信开发者工具下载](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)
2. [小程序开发参考文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html)

### 建议反馈
如果有功能建议或者意见反馈，欢迎创建 `Issue` 或发送 `Pull Request`，感谢你的贡献和支持。
