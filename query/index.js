const express = require('express');
const bodyParser = require('body-parser')
const cors = require ('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors());

// here is where we store posts
const posts = {};

// //ex
// posts === {
//     'laksjdf': {
//         id: 'laksjdf',
//         title: 'post title',
//         comments: [
//             {id: 'lkajsf', content: 'comment!!!'}
//         ]
//     }
// }

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if(type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] }
    }

    if(type === 'CommentCreated') {

        const { id, content, postId, status } = data;

        const post = posts[postId]

        post.comments.push({id, content, status})
    }

    console.log(posts)

    res.send({})
})

app.listen(4002, () => {
    console.log('Listening on 4002')
})