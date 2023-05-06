function sortByKey(array, key, order) {
    if (!array[0][key]) throw "Enter valid key"
    if (!!order && !(order === true || order === false)) throw "Order should be a boolean value"
    var arr = array.sort((a, b) => a[key] - b[key]) || []
    if (order === true) {
        arr = arr.reverse()
    }
    return arr;
}

function generateResp(pageNum, blogData, allData) {
    allData = allData ? allData : data
    blogData = blogData.map(blog => ({
        id: blog.id || 0,
        heading: blog.heading || null,
        subHeading: blog.subHeading || null,
        partialContent: blog.partialContent || null,
        likes: blog.likes || {},
        coverImage: blog.coverImage || null,
        createdTime: blog.createdTime || null
    }))
    return ({
        data: blogData,
        hasNext: allData.length > ((pageNum) * 5),
        hasPrev: pageNum > 1,
        page: pageNum,
        totalPage: allData.length
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

module.exports = {
    sortByKey,
    generateResp,
    shuffle,
    isValuePresent
}