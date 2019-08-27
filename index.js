const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRouter = require('./users/router')
const wordRouter = require('./word/router')
const categoryRouter = require('./category/router')
const gameRouter = require('./games/router')
const authRouter = require('./auth/router')
const app = express()
const jsonParser = bodyParser.json()

app.use(cors())
app.use(jsonParser)
app.use(userRouter)
app.use(wordRouter)
app.use(categoryRouter)
app.use(gameRouter)
app.use(authRouter)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`listening on ${port}`))

