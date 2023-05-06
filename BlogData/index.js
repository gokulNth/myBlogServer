const data = [
{
    "id": "100000001",
    "createdTime": "1683014051957",
    "heading": `<div>Heading 1</div>`,
    "subHeading": "<div>SubHeading 1</div>",
    "content": require('./Data/blog1.js').data,
    "partialContent": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type `,
    "coverImage": 'blog1.jpeg',
    likes: {
        "claps": 200,
        "hearts": 10
    },
    blogTag: ["test", "qwerty"],
    relatedTags: ["test1", "test123"]
}, {
    "id": "100000010",
    "createdTime": "1683024051957",
    "heading": `<div>Heading 10</div>`,
    "content": require('./Data/blog2.js').data,
    "partialContent": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a`,
    "coverImage": 'blog2.jpeg',
    likes: {
        "claps": 234,
        "hearts": 2
    },
    blogTag: ["sample", "test"]
}, {
    "id": "100000002",
    "createdTime": "1683034051957",
    "heading": `<div>Heading 2</div>`,
    "content": require('./Data/blog2.js').data,
    "partialContent": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a`,
    "coverImage": 'blog2.jpeg',
    likes: {
        "claps": 20
    },
    blogTag: ["sample"],
    relatedTags: ["sample1", "test123", "test"]
}, {
    "id": "100000003",
    "createdTime": "1483014051957",
    "heading": `<div>This is the heading for Blog number something different maybe...</div>`,
    "subHeading": "<div>SubHeading 1</div>",
    "content": require('./Data/blog2.js').data,
    "partialContent": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type `,
    "coverImage": 'blog1.jpeg',
    blogTag: ["test", "qwerty"],
    relatedTags: ["test1", "test", "ready"]
}, {
    "id": "100000004",
    "createdTime": "1983014051957",
    "content": require('./Data/blog2.js').data,
    "partialContent": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a`,
    "coverImage": 'blog1.jpeg',
    likes: {
        "claps": 312,
        "hearts": 100
    },
    blogTag: ["sample", "test"],
    relatedTags: ["sample1", "sample", "test123"]
}, {
    "id": "100000005",
    "createdTime": "1883014051957",
    "heading": `<div>Heading 12312313</div>`,
    "subHeading": "<div>SubHeading 3</div>",
    "content": require('./Data/blog1.js').data,
    "partialContent": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type `,
    "coverImage": 'blog1.jpeg',
    likes: {
        "claps": 123,
        "hearts": 3123
    },
    blogTag: ["empty"],
    relatedTags: ["test1", "test123"]
}, {
    "id": "100000006",
    "createdTime": "1883024051917",
    "heading": `<div>Heading 23232423</div>`,
    "subHeading": "<div>SubHeading 3</div>",
    "content": require('./Data/blog2.js').data,
    "partialContent": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a`,
    "coverImage": 'blog2.jpeg',
    likes: {
        "claps": 12312,
        "hearts": 412
    },
    blogTag: ["sample"],
    relatedTags: ["sample1", "EnptySample", "test123"]
}, {
    "id": "100000007",
    "createdTime": "1883314051957",
    "subHeading": "<div>SubHeading 1</div>",
    "heading": `<div>Heading 1</div>`,
    "content": require('./Data/blog1.js').data,
    "partialContent": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type `,
    likes: {
        "claps": 121,
        "hearts": 100
    },
    blogTag: ["TEST", "qwerty"],
    relatedTags: ["test1", "TEST", "test123"]
}, {
    "id": "100000008",
    "createdTime": "1683054051957",
    "heading": `<div>Heading 2sdada</div>`,
    "content": require('./Data/blog2.js').data,
    "partialContent": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
    dummy text ever since the 1500s`,
    "coverImage": 'blog2.jpeg',
    likes: {
        "claps": 4312,
        "hearts": 123
    },
    blogTag: ["sample"],
    relatedTags: ["sample1", "samplE", "test123"]
}, {
    "id": "100000009",
    "createdTime": "1683014051957",
    "heading": `<div>dassaasdsada</div>`,
    "subHeading": "<div>SubHeading 1</div>",
    "content": require('./Data/blog1.js').data,
    "partialContent": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type `,
    "coverImage": 'blog1.jpeg',
    likes: {
        "claps": 34,
        "hearts": 5
    },
    blogTag: ["test", "qwerty"],
    relatedTags: ["test1", "test", "test123"]
}, {
    "id": "100000011",
    "createdTime": "1683054091957",
    "heading": `<div>smbfbask,fba</div>`,
    "subHeading": "<div>SubHeading 1</div>",
    "content": require('./Data/blog1.js').data,
    "partialContent": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type `,
    "coverImage": 'blog1.jpeg',
    likes: {
        "claps": 31,
        "hearts": 5
    },
    blogTag: ["test", "qwerty"],
    relatedTags: ["test1", "test", "test123"]
}]

module.exports = { data };