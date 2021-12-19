const express = require('express')
const router = require('express-promise-router')()

const indexController = require('../controllers/controller_index.js')

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers.js')


// const passport = require(`passport`)
// require(`../middleWares/passport.js`)
// const { session } = require('passport')

router.route('/')
  .get(indexController.index)
// .get(passport.authenticate(`local`, { session: false }), indexController.index)

router.route('/:lang')
  .get(indexController.langIndex)




// router.route(`/signup`)
//  .post(validateBody(schemas.authSignUpSchema), UserController.signUp)

// router.route(`/signin`)
//  .post(validateBody(schemas.authSignInSchema), passport.authenticate(`local`, { session: false }), UserController.signIn)

// router.route(`/secret`)
//  .get(passport.authenticate(`jwt`, { session: false }), UserController.secret) // unlock mã token

// router.route('/:userID')
//  .get(validateParam(schemas.idSchema, 'userID'), UserController.getUser)
//  .put(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchema), UserController.replaceUser)
//  .patch(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userOptionalSchema), UserController.updateUser)

// router.route('/:userID/decks')
//  .get(validateParam(schemas.idSchema, 'userID'), UserController.getUserDecks)
//  .post(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.deckSchema), UserController.newUserDeck)

module.exports = router
