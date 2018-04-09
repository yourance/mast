var fs = require('fs')

var movieFilePath = 'db/movie.json'

const loadMovies = () => {
    const content = fs.readFileSync(movieFilePath, 'utf8')
    const ms = JSON.parse(content)
    return ms
}

var m = {
    data: loadMovies()
}

m.all = function() {
    var ms = this.data
    return ms
}

// 导出一个对象的时候用 module.exports = 对象 的方式

module.exports = m
