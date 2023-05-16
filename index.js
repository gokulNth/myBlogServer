const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors())

const fs = require('fs');

// const data = require('');
const quoteData = require('./BlogData/quote.json');
const { sortByKey, generateResp, shuffle, isValuePresent, normalizeBlogData } = require('./utils');

const port = process.env.PORT || 3001

app.get('/', (req, res) => {
    const blogs = fs.readFileSync("./BlogData/blog.json")
    const recentBlogData = sortByKey(JSON.parse(blogs), "createdTime", true).slice(0, 5)
    const popularBlogData = sortByKey(recentBlogData, "views", true).slice(0, 5)
    const blogData = shuffle([...recentBlogData, ...popularBlogData]).slice(0, 5);

    const quotesList = shuffle(sortByKey(quoteData, "createdTime", true).slice(0, 5))
    res.send({
        blog: generateResp(1, normalizeBlogData(blogData), blogData),
        quote: quotesList
    })
})

app.get('/blogs', (req, res) => {
    const { query = {} } = req;
    const { _page = '1', _limit = '5', _sortBy = 'createdTime' } = query;
    const blogs = JSON.parse(fs.readFileSync("./BlogData/blog.json"))
    const limit = parseInt(_limit) * parseInt(_page);
    const start = (parseInt(_page) - 1) * parseInt(_limit);
    const blogData = sortByKey(blogs, _sortBy, true).slice(start, limit)
    res.send({ data: generateResp(parseInt(_page), normalizeBlogData(blogData), blogs, parseInt(_limit)) })
})

app.get('/blog/:id', (req, res) => {
    const { id } = req.params
    const blogs = JSON.parse(fs.readFileSync("./BlogData/blog.json"))
    let blogData = blogs.find(blog => blog.id === id)
    res.send({ data: blogData });
})

app.patch('/blog/:id', (req, res) => {
    const { id } = req.params
    const blogs = JSON.parse(fs.readFileSync("./BlogData/blog.json"))
    const newBlogData = blogs.map(blog => {
        if (blog.id === id) {
            return Object.assign({}, blog, { views: (blog.views || 0) + 1 })
        }
        return blog;
    })
    fs.writeFileSync(`${__dirname}/BlogData/blog.json`, JSON.stringify(newBlogData, null, 2))
    res.send()
})

app.get('/quote/:id', (req, res) => {
    const { id } = req.params
    const quotes = JSON.parse(fs.readFileSync("./BlogData/quote.json"))
    let quoteData = quotes.find(quote => quote.id === id)
    res.send({ data: quoteData });
})

app.get('/:id/content', (req, res) => {
    const { id } = req.params;
    const blogs = JSON.parse(fs.readFileSync("./BlogData/blog.json"))
    const fileName = blogs.filter(blog => blog.id === id)[0].content
    res.sendFile(`${__dirname}/BlogData/Data/${fileName}`)
})

app.get('/quotes', (req, res) => {
    const { query = {} } = req;
    const { _page = '1', _limit = '5', _sortBy = "createdTime" } = query;
    const quotes = JSON.parse(fs.readFileSync("./BlogData/quote.json"))
    const limit = parseInt(_limit) * parseInt(_page);
    const start = (parseInt(_page) - 1) * parseInt(_limit);
    const quotesData = sortByKey(quotes, _sortBy, true).slice(start, limit)
    res.send({ data: generateResp(parseInt(_page), quotesData, quotes, parseInt(_limit)) })
})

app.get('/tags/:tag', (req, res) => {
    const { tag } = req.params;
    const { _page = '1', _limit = '5' } = req.query;
    const limit = parseInt(_limit) * parseInt(_page);
    const start = (parseInt(_page) - 1) * parseInt(_limit);
    const blogs = JSON.parse(fs.readFileSync("./BlogData/blog.json"))
    const tagNames = tag.toLowerCase().split(",");
    let blogDataByTag = [];
    tagNames.map(tagName => blogDataByTag = Object.assign([], blogs.filter(({ blogTag = [], relatedTags = [] }) => {
        return !!tagName ? isValuePresent(blogTag, tagName) || isValuePresent(relatedTags, tagName) : false;
    })));
    const blogData = sortByKey(blogDataByTag, "createdTime", true).slice(start, limit)
    res.send({ data: generateResp(parseInt(_page), blogData, blogData, parseInt(_limit)) })
})

app.get('/search/:searchStr', (req, res) => {
    const { searchStr } = req.params;
    const { _page = '1', _limit = '5' } = req.query;
    const end = parseInt(_limit) * parseInt(_page);
    const start = (parseInt(_page) - 1) * parseInt(_limit);
    const str = searchStr.trim().toLowerCase();
    const pageNum = parseInt(_page);
    const blogs = JSON.parse(fs.readFileSync("./BlogData/blog.json"))
    const blogDataByTag = Object.assign([], blogs.filter(({ blogTag = [], relatedTags = [], heading = {}, subHeading = {}, content = {} }) => {
        return !!str ? isValuePresent(blogTag, str)
            || isValuePresent(relatedTags, str) || content.toLowerCase().includes(str.toLowerCase())
            || (heading?.props?.children?.toLowerCase() || "").includes(str.toLowerCase())
            || (subHeading?.props?.children?.toLowerCase() || "").includes(str.toLowerCase())
            : false;
    }));
    const normalizedBlogData = normalizeBlogData(sortByKey(blogDataByTag, "createdTime", true).slice(start, end))
    res.send({ data: generateResp(pageNum, normalizedBlogData, blogDataByTag, parseInt(_limit)) })
})


// const quoteSearch = Object.assign([], quotes.filter(({ quote, quoteBy }) => {
//     return !!str ? quote.toLowerCase().includes(str.toLowerCase()) || quoteBy.toLowerCase().includes(str.toLowerCase()) : false
// }))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})