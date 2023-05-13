const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors())

const fs = require('fs');

// const data = require('');
const quoteData = require('./BlogData/quote.json');
const { sortByKey, generateResp, shuffle, isValuePresent, updateFile, normalizeBlogData } = require('./utils');

const port = process.env.PORT || 3001

app.get('/', (req, res) => {
    const blogs = fs.readFileSync("./BlogData/blog.json")
    const recentBlogData = sortByKey(JSON.parse(blogs), "createdTime", true).slice(0, 5)
    const popularBlogData = sortByKey(recentBlogData, "views", true).slice(0, 5)
    const blogData = shuffle([...recentBlogData.slice(0, 2), ...popularBlogData.slice(0, 3)]);

    const quotesList = shuffle(sortByKey(quoteData, "createdTime", true).slice(0, 5))
    res.send({
        blog: generateResp(1, normalizeBlogData(blogData), blogData),
        quote: quotesList
    })
})

app.get('/blogs', (req, res) => {
    const { query = {} } = req;
    const { _page = '1', _limit = '5' } = query;
    const blogs = JSON.parse(fs.readFileSync("./BlogData/blog.json"))
    const limit = parseInt(_limit) * parseInt(_page);
    const start = (parseInt(_page) - 1) * parseInt(_limit);
    const blogData = sortByKey(blogs, "createdTime", true).slice(start, limit)
    res.send({ data: generateResp(parseInt(_page), normalizeBlogData(blogData), blogs, parseInt(_limit)) })
})

app.get('/blog/:id', (req, res) => {
    const { id } = req.params
    const blogs = JSON.parse(fs.readFileSync("./BlogData/blog.json"))
    let blogData = blogs.find(blog => {
        if (blog.id === id) return true
        return false
    })
    res.send({ data: blogData });
})

app.patch('/blog/:id', (req, res) => {
    const { id } = req.params
    const blogs = JSON.parse(fs.readFileSync("./BlogData/blog.json"))
    const newBlogData = blogs.map(blog => {
        if (blog.id === id) {
            return Object.assign({}, blog, { views: blog.views + 1 })
        }
        return blog;
    })
    fs.writeFileSync(`${__dirname}/BlogData/blog.json`, JSON.stringify(newBlogData))
    res.send()
})

app.get('/:id/content', (req, res) => {
    const { id } = req.params;
    const blogs = JSON.parse(fs.readFileSync("./BlogData/blog.json"))
    const fileName = blogs.filter(blog => blog.id === id)[0].content
    res.sendFile(`${__dirname}/BlogData/Data/${fileName}`)
})

app.get('/quotes', (req, res) => {
    const { query = {} } = req;
    const { _page = '1', _limit = '5' } = query;
    const quotes = JSON.parse(fs.readFileSync("./BlogData/quote.json"))
    const limit = parseInt(_limit) * parseInt(_page);
    const start = (parseInt(_page) - 1) * parseInt(_limit);
    const quotesData = sortByKey(quotes, "createdTime", true).slice(start, limit)
    res.send({ data: generateResp(parseInt(_page), quotesData, quotes, parseInt(_limit)) })
})

// app.get('/home', (req, res) => {
    // const { query = {} } = req;
    // const { _page = '1', _limit = '5' } = query;
    // const limit = parseInt(_limit) * parseInt(_page);
    // const start = (parseInt(_page) - 1) * parseInt(_limit);
    // const blogData = sortByKey(data, "id").slice(start, limit)
    // res.send({ data: generateResp(parseInt(_page), blogData, data) })
// })

// app.get('/recent', (req, res) => {
//     const { query = {} } = req;
//     const { _page = '1', _limit = '5' } = query;
//     const limit = parseInt(_limit) * parseInt(_page);
//     const start = (parseInt(_page) - 1) * parseInt(_limit);
//     const blogData = sortByKey(data, "createdTime", true).slice(start, limit)
//     res.send({ data: generateResp(parseInt(_page), blogData, data) })
// })

// app.get('/popular', (req, res) => {
//     const { query = {} } = req;
//     const { _page = '1', _limit = '5' } = query;
//     const limit = parseInt(_limit) * parseInt(_page);
//     const start = (parseInt(_page) - 1) * parseInt(_limit);
//     let nomalizedData = data.map((blog) => {
//         const { likes = {} } = blog;
//         return Object.assign({}, blog, { totlikes: (likes.claps || 0) + (likes.hearts || 0) })
//     });
//     const blogData = sortByKey(nomalizedData, "totlikes", true).slice(start, limit)
//     res.send({ data: generateResp(parseInt(_page), blogData, data) })
// })

// app.get('/blog/:id', (req, res) => {
//     const { id } = req.params
//     let blogData = data.find(blog => {
//         if (blog.id === id) return true
//         return false
//     })
//     const newBlogData = data.map(blog => {
//         if (blog.id === id) {
//             return Object.assign({}, blog, { views: blog.views + 1 })
//         }
//         return blog;
//     })
//     fs.writeFileSync(`${__dirname}/BlogData/blog.json`, newBlogData)
//     res.send({ data: blogData });
// })

// app.get('/:id/content', (req, res) => {
//     const { id } = req.params;
//     const fileName = data.filter(blog => blog.id === id)[0].content
//     res.sendFile(`${__dirname}/BlogData/Data/${fileName}`)
// })

// app.get('/tags/:tag', (req, res) => {
//     const { tag } = req.params;
//     const { _page = '1', _limit = '5' } = req.query;
//     const limit = parseInt(_limit) * parseInt(_page);
//     const start = (parseInt(_page) - 1) * parseInt(_limit);
//     const tagNames = tag.toLowerCase().split(",");
//     let blogDataByTag = [];
//     tagNames.map(tagName => blogDataByTag = Object.assign([], data.filter(({ blogTag = [], relatedTags = [] }) => {
//         return !!tagName ? isValuePresent(blogTag, tagName) || isValuePresent(relatedTags, tagName) : false;
//     })));
//     const blogData = sortByKey(blogDataByTag, "createdTime", true).slice(start, limit)
//     res.send({ data: generateResp(parseInt(_page), blogData, blogData) })   
// })

// app.get('/search/:searchStr', (req, res) => {
//     const { searchStr } = req.params;
//     const { _page = '1', _limit = '5' } = req.query;
//     const end = parseInt(_limit) * parseInt(_page);
//     const start = (parseInt(_page) - 1) * parseInt(_limit);
//     const str = searchStr.trim().toLowerCase();
//     const pageNum = parseInt(_page);
//     const blogDataByTag = Object.assign([], data.filter(({ blogTag = [], relatedTags = [], heading = {}, subHeading = {}, content = {} }) => {
//         return !!str ? isValuePresent(blogTag, str)
//             || isValuePresent(relatedTags, str) || content.toLowerCase().includes(str.toLowerCase())
//             || (heading?.props?.children?.toLowerCase() || "").includes(str.toLowerCase())
//             || (subHeading?.props?.children?.toLowerCase() || "").includes(str.toLowerCase())
//             : false;
//     }));
//     res.send({ data: generateResp(pageNum, sortByKey(blogDataByTag, "createdTime", true).slice(start, end), blogDataByTag) })
// })

// app.get('/')


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})