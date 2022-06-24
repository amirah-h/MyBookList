const createError = require('http-errors')

let booklist = []
let idno = 0

exports.index = function (req, res) {
    res.send(booklist)
}

exports.create = function (req, res, next) {
    if(!req.body.author) {
        return(next(createError(400, "author is required")))
    }
    booklist.push({id: idno, author: req.body.author, title: req.body.title, status: req.body.status})
    res.send({result: true})
    idno++
}

exports.show = function (req, res, next) {
    const bookitem = booklist.find((book) => book.id == req.params.id)
    if(!bookitem) {
        return(next(createError(404, "no book with that id")))
    }
    res.send(bookitem)
}

exports.delete = function (req, res, next) {
    const bookitem = booklist.find((book) => book.id == req.params.id)
    if(!bookitem) {
        return(next(createError(404, "no book with that id")))
    }
    booklist = booklist.filter((book) => book.id != req.params.id)
    res.send({result: true})
}

exports.update = function (req, res, next) {
    const bookitem = booklist.find((book) => book.id == req.params.id)
    if (!req.body.author) {
        return (next(createError(404, "author is required")))
    }
    if (!bookitem) {
        return (next(createError(404, "no book with that id")))
    }
    booklist = booklist.map((book) =>{
        if (book.id == req.params.id) {
            book.author = req.body.author
            book.title = req.body.title
            book.status = req.body.status
        }
        return book
    })
    res.send({ result: true })
}    