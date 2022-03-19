const express = require('express')
const mongoose = require('mongoose')
const { celebrate, Joi, errors } = require('celebrate')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const users = require('./routes/users')
const cards = require('./routes/cards')
const { login, createUser } = require('./controllers/users')
const { auth } = require('./middlewares/auth')
const { handleErrors } = require('./middlewares/errors')

const { PORT = 3000 } = process.env
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

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

app.use(auth)

app.use('/users', users)
app.use('/cards', cards)

app.use((req, res) => res.status(404).send({ message: 'Страница не найдена' }))

app.use(errors())
app.use(handleErrors)

app.listen(PORT)

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  autoIndex: true,
})
