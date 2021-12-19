const express = require('express')
const router = require('express-promise-router')()

const DeviceController = require('../controllers/controllerDevice')

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers.js')


// const passport = require(`passport`)
// require(`../middleWares/passport.js`)
// const { session } = require('passport')

router.route('/list')
  .get(
    // passport.authenticate(`jwt`, { session: false }),
    DeviceController.listDevice
  )

// .post(
//   // passport.authenticate(`jwt`, { session: false }),
//   UserController.authenticate
// )
// .put(
//   // passport.authenticate(`jwt`, { session: false }),
//   UserController.updateUserInfo
// )
// .delete(passport.authenticate(`jwt`, { session: false }), UserController.del)

// router.route(`/signUp`)
//   .post(
//     validateBody(schemas.authSignUpSchema),
//     UserController.signUp
//   )
// router.route(`/confirmSignUp/:key`)
//   .get(UserController.confirmSignUp)



// router.route(`/signIn`)
//   .post(
//     validateBody(schemas.authSignInSchema),
//     // passport.authenticate(`local`, { session: false }),
//     UserController.signIn
//   )


// router.route(`/signOut`)
//   .get(UserController.signOut)


// router.route('/resetpassword')
//   .put(
//     UserController.resetPassword
//   )

// router.route('/resetpassword/:email/:passwordRandom')
//   .get(
//     UserController.saveResetPassword
//   )

// router.route('/shares')
//   .get(
//     // passport.authenticate(`jwt`, { session: false }),
//     UserController.usersShare
//   )
//   .post(
//     // passport.authenticate(`jwt`, { session: false }),
//     UserController.userSaveSharing
//   )
//   .delete(
//     // passport.authenticate(`jwt`, { session: false }),
//     UserController.deleteSharing
//   )





// router.route('/:userID')
//   .get(validateParam(schemas.idSchema, 'userID'), UserController.getUser)
//   .put(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchema), UserController.replaceUser)
//   .patch(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userOptionalSchema), UserController.updateUser)

// router.route('/:userID/decks')
//   .get(validateParam(schemas.idSchema, 'userID'), UserController.getUserDecks)
//   .post(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.deckSchema), UserController.newUserDeck)

module.exports = router
