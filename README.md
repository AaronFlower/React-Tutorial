##React Tutorial
### 搭建服务器
我们使用 Express 框架来搭建 node 服务器。会用到 body-parser 中间件来解析 http request 请求。 我们用 npm 来管理项目的依赖。
#### npm 初始化项目
```bash
> mkdir react-tutorial
> npm init
> npm i express --save-dev 
> npm i body-parser --save-dev
```
#### 编写服务器脚本
服务器脚本除了启动服务端口监听，还指定服务器根目录，以及提供两个 RESTful API. 详见 `server.js`

1. 服务器根目录，当前项目的 public 目录下, 即 `app.use('/', express.static(path.join(__dirname, 'public')))`
2. 两个 RESTful API
    - GET `/api/comments`: 获取所有评论数。
    - POST `/api/comments`: 增加一条新的评论。





