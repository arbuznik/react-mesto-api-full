const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const { celebrate, Joi, errors } = require('celebrate')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const users = require('./routes/users')
const cards = require('./routes/cards')
const { login, createUser, logout } = require('./controllers/users')
const { auth } = require('./middlewares/auth')
const { handleErrors } = require('./middlewares/errors')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const { NotFoundError } = require('./middlewares/errors/NotFoundError')

const { PORT = 3001 } = process.env
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(requestLogger)

app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://arbuznik.nomoredomains.work',
    'http://arbuznik.nomoredomains.work',
  ],
  methods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Cookie'],
  credentials: true,
}))

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт')
  }, 0)
})

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login)

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(
      /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9]+\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)/,
    ),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser)

app.get('/signout', logout)

app.use(auth)

app.use('/users', users)
app.use('/cards', cards)

app.use(() => {
  throw new NotFoundError('Страница не найдена')
})

app.use(errorLogger)

app.use(errors())
app.use(handleErrors)

app.listen(PORT)

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  autoIndex: true,
})
