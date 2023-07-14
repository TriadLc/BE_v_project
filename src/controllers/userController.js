import { reject } from "lodash";
import db from "../models/index";
import userService from "./../services/userService";

let getDetailUserById = async (req, res) => {
  try {
    let infor = await userService.getDeitalUserByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error usercontroller: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From userSevice: Error from the server!`,
    });
  }
};

let getAllListUser = async (req, res) => {
  try {
    let listUser = await userService.getAllListUserService();
    return res.status(200).json(listUser);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From userSevice: Error from the server!`,
    });
  }
};

let postAddNewUser = async (req, res) => {
  try {
    let infor = await userService.addNewUserService(req.body);

    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error usercontroller: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From userSevice: Error from the server!`,
    });
  }
};

let editUserById = async (req, res) => {
  try {
    let infor = await userService.editUserByIdService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error usercontroller: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From userSevice: Error from the server!`,
    });
  }
};

let deleteUserById = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: `Missing required parameters!`,
      });
    }
    let infor = await userService.deleteUserByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error usercontroller: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From userSevice: Error from the server!`,
    });
  }
};

module.exports = {
  getDetailUserById: getDetailUserById,
  getAllListUser: getAllListUser,
  postAddNewUser: postAddNewUser,
  editUserById: editUserById,
  deleteUserById: deleteUserById,
};
