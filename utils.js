const { error } = require('console')
const { normalize } = require('path')

const fs = require('fs').promises

function sortByKey(array, key, order) {
    if (!array[0][key]) throw "Enter valid key"
    if (!!order && !(order === true || order === false)) throw "Order should be a boolean value"
    var arr = array.sort((a, b) => a[key] - b[key]) || []
    if (order === true) {
        arr = arr.reverse()
    }
    return arr;
}

function normalizeBlogData(blogData) {
    return blogData.map(blog => ({
        id: blog.id || 0,
        heading: blog.heading || null,
        subHeading: blog.subHeading || null,
        partialContent: blog.partialContent || null,
        views: blog.views ? blog.views + 1 : 1,
        coverImage: blog.coverImage || null,
        createdTime: blog.createdTime || null,
        duration: blog.duration || 0
    }))
}

function generateResp(pageNum, blogData, allData, limit) {
    allData = allData ? allData : data
    return ({
        hasNext: allData.length > ((pageNum) * (limit || 5)),
        hasPrev: pageNum > 1,
        page: pageNum,
        totalPage: allData.length,
        data: blogData,
    })
}

function shuffle(array) {
    let arr = array.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    return arr;
}

function isValuePresent(array, value) {
    if (!value) throw "Need search value"
    return array.some(i => i.toLowerCase().includes(value.toLowerCase()));
}

function updateFile(fileName, key, value) {
    fs.readFile(fileName)
        .then(body => JSON.parse(body))
        .then(json => {
            json[key] = value
            return json;
        }).then(json => JSON.stringify(json))
        .then(updatedFile => fs.writeFile(fileName, updatedFile))
        .catch(error => console.error(error))
}

module.exports = {
    sortByKey,
    generateResp,
    shuffle,
    isValuePresent,
    updateFile,
    normalizeBlogData
}