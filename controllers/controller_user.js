/**
  * We can interact with mongoose in three different ways:
  * [v] Callback
  * [v] Promises
  * [v] Async/await (Promises)
  */
const User = require('../models/model_user')



const moduleUser = require('../modules/module_user.js')

const index = async (req, res, next) => {
  const users = await User.find({})
  console.log(__file, __line, `sssssssssssssssss`);
  return res.status(200).json({ users })
}

const signOut = async (req, res, next) => {
  res.clearCookie("Authorization");
  req.logout();
  return res.status(200).json({ code: 200, message: "SignOut OK" });
}

const authenticate = async (req, res, next) => {
  return res.status(201).json({ code: 200, message: `Authenticate OK` })
}


// /*
// ########  ######## ##       ######## ######## ######## 
// ##     ## ##       ##       ##          ##    ##       
// ##     ## ##       ##       ##          ##    ##       
// ##     ## ######   ##       ######      ##    ######   
// ##     ## ##       ##       ##          ##    ##       
// ##     ## ##       ##       ##          ##    ##       
// ########  ######## ######## ########    ##    ######## 
// */
// const del = async (req, res, next) => {
//   let userId = req.user.sub.userId,
//     query = `
//     DELETE FROM breath_mof_user WHERE UserId='${userId}';
//     DELETE FROM user WHERE userId='${userId}';
//     `.replace(/(\r\n|\n|\r)/gm, ``).replace(/(\t)/gm, ` `).replace(/\s\s+/g, ` `)
//   delUser = await queryNoResult(query)
//   if (delUser) {
//     return await list(req, res, next) // trả về list device
//   } else {
//     return res.status(400).json({ code: 400, message: `Lỗi khi xóa thiết bị` })
//   }
// }

// const delUser = async (req, res, next) => {
//   console.json(__file, __line, req.user);
//   return res.status(201).json({ code: 200, message: `Author OK` })
// }




// NOTE: controller signUp
const signUp = async (req, res, next) => { moduleUser.signUp(req, res) }
const confirmSignUp = async (req, res, next) => { moduleUser.confirmSignUp(req, res) }

const signIn = async (req, res, next) => { moduleUser.signIn(req, res, next) }



const userInfo = async (req, res, next) => {
  moduleUser.userInfo(req, res, next)
}

const updateUserInfo = async (req, res, next) => {
  moduleUser.changePass(req, res, next)
}


const resetPassword = async (req, res, next) => {
  moduleUser.resetPassword(req, res, next);
}

const saveResetPassword = async (req, res, next) => {
  moduleUser.saveResetPassword(req, res, next);
}

const usersShare = async (req, res, next) => {
  moduleUser.usersShare(req, res, next);
}

const userSaveSharing = async (req, res, next) => {
  moduleUser.userSaveSharing(req, res, next);
}

const deleteSharing = async (req, res, next) => {
  moduleUser.deleteSharing(req, res, next);
}

module.exports = {
  index,
  authenticate,
  // del,
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  userInfo,
  updateUserInfo,
  resetPassword,
  saveResetPassword,
  usersShare,
  userSaveSharing,
  deleteSharing
}
