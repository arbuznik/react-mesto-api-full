const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { NotFoundError } = require('../middlewares/errors/NotFoundError')
const { ConflictError } = require('../middlewares/errors/ConflictError')
const { ValidationError } = require('../middlewares/errors/ValidationError')

const { NODE_ENV, JWT_SECRET } = process.env

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users.map((user) => {
      const {
        _id, name, about, avatar, email,
      } = user
      return {
        _id, name, about, avatar, email,
      }
    })))
    .catch(next)
}

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден')
      }

      const {
        _id, name, about, avatar, email,
      } = user
      res.send({
        _id, name, about, avatar, email,
      })
    })
    .catch(next)
}

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден')
      }

      const {
        _id, name, about, avatar, email,
      } = user
      res.send({
        _id, name, about, avatar, email,
      })
    })
    .catch(next)
}

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => res.status(200).send({
      name, about, avatar, email,
    }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictError('Email already exists'))
      } else if (error.name === 'ValidationError') {
        next(new ValidationError('Validation Error'))
      } else {
        next(error)
      }
    })
}

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((userItem) => {
      res.send({
        _id: userItem._id,
        name: userItem.name,
        about: userItem.about,
        avatar: userItem.avatar,
        email: userItem.email,
      })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Validation Error'))
      } else {
        next(err)
      }
    })
}

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((userItem) => {
      res.send({
        _id: userItem._id,
        name: userItem.name,
        about: userItem.about,
        avatar: userItem.avatar,
        email: userItem.email,
      })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Validation Error'))
      } else {
        next(err)
      }
    })
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      )
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      }).send({ message: 'Auth successfull' })
    })
    .catch(next)
}

module.exports.logout = (req, res) => res.status(200).clearCookie('jwt').send({ message: 'Logout successfull' })
