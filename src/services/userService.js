import { reject } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let getDeitalUserByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: { exclude: ["password"] },
          include: [],
          raw: false,
          nest: true,
        });

        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllListUserService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listUser = await db.User.findAll({
        where: {
          role: "1",
        },
        //order: [["createAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        errCode: 0,
        data: listUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassWord = await bcrypt.hashSync(password, salt);
      resolve(hashPassWord);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserExistEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let addNewUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserExistEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: `This email is already exsit!`,
        });
      } else {
        let hashPassWordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPassWordFromBcrypt,
          name: data.name,
          role: data.role,
        });
        resolve({
          errCode: 0,
          errMessage: `Everything's OK now~`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let editUserByIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.role || !data.email) {
        resolve({
          errCode: 2,
          errMessage: `Missing required parameters~`,
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.email = data.email;
        user.name = data.name;
        user.role = data.role;
        user.phone = data.phone;

        // if (data.avatar) {
        //   user.image = data.avatar;
        // }

        await user.save();

        resolve({
          errCode: 0,
          errMessage: `Update the user succeeds~`,
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: `User's not found~`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserByIdService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.User.findOne({
        where: { id: userId },
      });
      if (!foundUser) {
        resolve({
          errCode: 2,
          errMessage: `This user isn't exsit!`,
        });
      } else {
        await db.User.destroy({
          where: { id: userId },
        });
      }
      resolve({
        errCode: 0,
        message: `The user is deleted~`,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getDeitalUserByIdService: getDeitalUserByIdService,
  getAllListUserService: getAllListUserService,
  addNewUserService: addNewUserService,
  editUserByIdService: editUserByIdService,
  deleteUserByIdService: deleteUserByIdService,
};
