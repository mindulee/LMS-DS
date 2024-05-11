const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware')
const cors = require('cors');
const app = express()
const PORT = 3000


app.use(cors());
//http://localhost:3000

app.use('/Admin' , createProxyMiddleware({
    target: 'http://localhost:3003' ,
    pathRewrite:{
        '^/Admin' : ''
    }
}))

app.use('/Course' , createProxyMiddleware({
    target: 'http://localhost:3001' ,
    pathRewrite:{
        '^/Course' : ''
    }
}))

app.use('/Learner' , createProxyMiddleware({
    target: 'http://localhost:3004' ,
    pathRewrite:{
        '^/Learner' : ''
    }
}))


app.use('/User' , createProxyMiddleware({
    target: 'http://localhost:9000' ,
    pathRewrite:{
        '^/User' : ''
    }
}))



app.listen(PORT , () => {
    console.log(` service running on ${PORT}`)
})