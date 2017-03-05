var path = require('path')
var fs = require('fs')
var express = require('express')
var router = express.Router()

const BOOKS_FILE_PATH = path.resolve(__dirname, '../data/books.json')

// middleware that is specified to this router
router.use(function timeLog(req, res, next) {
	// Foo middleware
	console.log('Time: ', Date.now())
	next()
})

router.get('/books', function (req, res) {
	console.log('All books..')
	fs.readFile(BOOKS_FILE_PATH, function (err, data) {
		if (err) {
			console.error(err)
			res.send('All books, Server not responsed....')
			process.exit(1)
		}
		res.send(JSON.parse(data))
	})
})

router.get('/books/:id', function (req, res) {
	let id = req.params.id
	fs.readFile(BOOKS_FILE_PATH, function (err, data) {
		if (err) {
			console.error(err)
			res.send('Single Book, Server not responsed!')
			process.exit(1)
		}
		books = JSON.parse(data)
		res.send(books[id] ? books.filter(book => book.id == id)[0] : null)
	})
})

router.post('/books', function (req, res) {
	console.log(req.body)
	let newBook = {
		title: req.body.title,
		author: req.body.author,
		abstract: req.body.abstract
	}
	let errors = []
	Object.keys(newBook).forEach(key => {
		if (!newBook[key] || !newBook[key].trim()) {
			errors.push({
				resource: 'Books',
				field: key,
				code: 'missing_field'
			})
		}
	})
	if (errors.length) {
		res.status(422)
		res.send({
			message: 'Validation Field',
			errors: errors
		})
	} else {
		fs.readFile(BOOKS_FILE_PATH, function (err, data) {
			if (err) {
				console.error(err)
				res.send('Add book Failed')
				process.exit(1)
			}
			let books = JSON.parse(data)
			newBook.id = books.length + 1
			console.log(newBook)
			books.push(newBook)
			fs.writeFile(BOOKS_FILE_PATH, JSON.stringify(books, null, 4), function (err) {
				if (err) {
					console.error(err)
					process.exit(1)
				}
				res.send(books)
			})
		})
	}
})

module.exports = router