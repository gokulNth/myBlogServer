const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors())

const { data } = require('./BlogData/index');
const { sortByKey, generateResp, shuffle, isValuePresent } = require('./utils');

const port = process.env.PORT || 3001

app.get('/', (req, res) => {
    const recentBlogData = sortByKey(data, "createdTime", true).slice(0, 5)
    let nomalizedData = data.map((blog) => {
        const { likes = {} } = blog;
        return Object.assign({}, blog, { totlikes: (likes.claps || 0) + (likes.hearts || 0) })
    });
    const popularBlogData = sortByKey(nomalizedData, "totlikes", true).slice(0, 5)
    const blogData = shuffle([...recentBlogData.slice(0, 2), ...popularBlogData.slice(0, 3)]);
    res.send({ data: generateResp(1, blogData, blogData) })
})

app.get('/home', (req, res) => {
    const { query = {} } = req;
    const { _page = '1', _limit = '5' } = query;
    const limit = parseInt(_limit) * parseInt(_page);
    const start = (parseInt(_page) - 1) * parseInt(_limit);
    const blogData = sortByKey(data, "id").slice(start, limit)
    res.send({ data: generateResp(parseInt(_page), blogData, data) })
})

app.get('/recent', (req, res) => {
    const { query = {} } = req;
    const { _page = '1', _limit = '5' } = query;
    const limit = parseInt(_limit) * parseInt(_page);
    const start = (parseInt(_page) - 1) * parseInt(_limit);
    const blogData = sortByKey(data, "createdTime", true).slice(start, limit)
    res.send({ data: generateResp(parseInt(_page), blogData, data) })
})

app.get('/popular', (req, res) => {
    const { query = {} } = req;
    const { _page = '1', _limit = '5' } = query;
    const limit = parseInt(_limit) * parseInt(_page);
    const start = (parseInt(_page) - 1) * parseInt(_limit);
    let nomalizedData = data.map((blog) => {
        const { likes = {} } = blog;
        return Object.assign({}, blog, { totlikes: (likes.claps || 0) + (likes.hearts || 0) })
    });
    const blogData = sortByKey(nomalizedData, "totlikes", true).slice(start, limit)
    res.send({ data: generateResp(parseInt(_page), blogData, data) })
})

app.get('/:id', (req, res) => {
    const { id } = req.params
    let blogData = data.find(blog => blog.id === id)
    res.send({ data: blogData });
})

app.get('/tags/:tag', (req, res) => {
    const { tag } = req.params;
    const { _page = '1', _limit = '5' } = req.query;
    const limit = parseInt(_limit) * parseInt(_page);
    const start = (parseInt(_page) - 1) * parseInt(_limit);
    const tagNames = tag.toLowerCase().split(",");
    let blogDataByTag = [];
    tagNames.map(tagName => blogDataByTag = Object.assign([], data.filter(({ blogTag = [], relatedTags = [] }) => {
        return !!tagName ? isValuePresent(blogTag, tagName) || isValuePresent(relatedTags, tagName) : false;
    })));
    const blogData = sortByKey(blogDataByTag, "createdTime", true).slice(start, limit)
    res.send({ data: generateResp(parseInt(_page), blogData, blogData) })   
})

app.get('/search/:searchStr', (req, res) => {
    const { searchStr } = req.params;
    const { _page = '1', _limit = '5' } = req.query;
    const end = parseInt(_limit) * parseInt(_page);
    const start = (parseInt(_page) - 1) * parseInt(_limit);
    const str = searchStr.trim().toLowerCase();
    const pageNum = parseInt(_page);
    const blogDataByTag = Object.assign([], data.filter(({ blogTag = [], relatedTags = [], heading = {}, subHeading = {}, content = {} }) => {
        return !!str ? isValuePresent(blogTag, str)
            || isValuePresent(relatedTags, str) || content.toLowerCase().includes(str.toLowerCase())
            || (heading?.props?.children?.toLowerCase() || "").includes(str.toLowerCase())
            || (subHeading?.props?.children?.toLowerCase() || "").includes(str.toLowerCase())
            : false;
    }));
    res.send({ data: generateResp(pageNum, sortByKey(blogDataByTag, "createdTime", true).slice(start, end), blogDataByTag) })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})