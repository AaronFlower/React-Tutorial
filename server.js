/**
 * 利用 Node 搭建一个服务器。
 * 因为我们用 Express 框架来搭建服务， 所以用 npm 来安装 express module。
 * 并用 npm 的 package.json 来管理项目依赖。
 * 对于 http request,  我们使用 body-parser 中间件来解析，而不是自己来写代码来解析。
 */

var fs = require('fs') 	// file system
var path = require('path')
var express = require('express') 	// 使用 Express 框架。 所以要用 npm 安装一个 express module.
var bodyParser = require('body-parser') // 解析 http request 请求的中间件。
var app = new express()

var COMMENTS_FILE = path.join(__dirname, 'comments.json')

app.set('port', (process.env.PORT || 3000))

// 设置服务器目录。
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json()) // 使用 JSON parser 中间件
app.use(bodyParser.urlencoded({ // 使用 url-encoded form parser 中间件。
	extended: true
}))

// 每次请求需要在 response header 设置的内容。
app.use(function (req, res, next) {
	// 设置 CORS header.
	res.setHeader('Access-Control-Allow-Origin', '*')
	// Disable cache. 获取最新的评论
	res.setHeader('Cache-Control', 'no-cache')
	next()
})

// RESTful API , get. 获取评论。
app.get('/api/comments', function (req, res) {
	fs.readFile(COMMENTS_FILE, function (err, data) {
		if (err) {
			console.error(err)
			process.exit(1)
		}
		res.json(JSON.parse(data))
	})
})

// RESTful API, post. 新增评论。
app.post('/api/comments', function (req, res) {
	fs.readFile(COMMENTS_FILE, function (err, data) {
		if (err) {
			console.error(err)
			process.exit(1)
		}
		var comments = JSON.parse(data)
		// 生产环境当然要用数据库了.
		var newComment = {
			id: Date.now(),
			author: req.body.author,
			text: req.body.text
		}
		comments.push(newComment)
		fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function (err) {
			if (err) {
				console.error(err)
				process.exit(1)
			}
			// 返回最新的所有评论。
			res.json(comments)
		})
	})
})
// 启动服务监听。
var port = app.get('port')
app.listen(port, function () {
	console.log('Server started: http://localhost:' + port + '/')
})
