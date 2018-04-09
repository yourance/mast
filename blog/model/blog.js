const fs = require('fs')

const blogFilePath = 'db/blog.json'


// 这是一个用来存储 Blog 数据的对象
class ModelBlog {
    constructor(form) {
        // a = b || c 意思是如果 b 会转成 false（比如 undefined, null），
        // 就把 c 赋值给 a
        this.title = form.title || ''
        this.author = form.author || ''
        this.content = form.content || ''
        // 生成一个 unix 时间
        this.created_time = Math.floor(new Date() / 1000)
    }
}

const loadBlogs = () => {
    // 确保文件有内容，这里就不用处理文件不存在或者内容错误的情况了
    var content = fs.readFileSync(blogFilePath, 'utf8')
    var blogs = JSON.parse(content)
    // console.log('load blogs', blogs)
    return blogs
}

/*
b 这个对象是要导出给别的代码用的对象
它有一个 data 属性用来存储所有的 blogs 对象
它有 all 方法返回一个包含所有 blog 的数组
它有 new 方法来在数据中插入一个新的 blog 并且返回
它有 save 方法来保存更改到文件中
*/

var b = {
    data: loadBlogs(),
}

b.all = function() {
    var blogs = this.data
    // 遍历 blog，插入 comments
    var comment = require('./comment')
    var comments = comment.all()
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        var cs = []
        for (var j = 0; j < comments.length; j++) {
            var c = comments[j]
            if (blog.id == c.blog_id) {
                cs.push(c)
            }
        }
        blog.comments = cs
    }
    return blogs
}

b.new = function(form) {
    var m = new ModelBlog(form)
    console.log('m', m, this)
    // console.log('new blog', form, m)
    // 设置新数据的 id
    var d = this.data[this.data.length - 1]
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    // 把数据加入 this.data 数组
    this.data.push(m)
    // 把最新数据保存到文件中
    this.save()
    // 返回新建的数据
    return m
}

/*
它能够删除指定 id 的数据
删除后保存修改到文件中
*/
b.delete = function(id) {
    var blogs = this.data
    var found = false
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        if (blog.id == id) {
            found = true
            break
        }
    }
    // 用 splice 函数删除数组中的一个元素
    // 如果没有找到，i 的值就是无用值，删除也不会报错

    blogs.splice(i, 1)

    return found
}

b.get = function(id) {
    var blogs = this.data
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        if (blog.id == id) {
            var comment = require('./comment')
            var comments = comment.all()
            var cs = []
            for (var j = 0; j < comments.length; j++) {
                var c = comments[j]
                if (blog.id == c.blog_id) {
                    cs.push(c)
                }
            }
            blog.comments = cs
            return blog
        }
    }
    // 循环结束都没有找到, 说明出错了,那就返回一个空对象
    return {}
}

b.save = function() {
    var s = JSON.stringify(this.data, null, 2)
    console.log('s', s)
    fs.writeFile(blogFilePath, s, (error) => {
        if (error != null) {
            console.log('error', error)
        } else {
            console.log('保存成功')
        }
    })
}

// 导出一个对象的时候用 module.exports = 对象 的方式
// 这样引用的时候就可以直接把模块当这个对象来用了
module.exports = b

// module.exports.new = b.new
// module.exports.all = b.all