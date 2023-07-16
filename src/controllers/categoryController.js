import { reject } from "lodash";
import db from "../models/index";
import categoryService from "./../services/categoryService";

let getDetailCategoryById = async (req, res) => {
  try {
    let infor = await categoryService.getDeitalCategoryByIdService(
      req.query.id
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error categoryController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From categoryService: Error from the server!`,
    });
  }
};

let getAllListCategory = async (req, res) => {
  try {
    let listUser = await categoryService.getAllListCategoryService();
    return res.status(200).json(listUser);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From categoryService: Error from the server!`,
    });
  }
};

let postAddNewCategory = async (req, res) => {
  try {
    let infor = await categoryService.addNewCategoryService(req.body);

    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error categoryController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From categoryService: Error from the server!`,
    });
  }
};

let editCategoryById = async (req, res) => {
  try {
    let infor = await categoryService.editCategoryByIdService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error categoryController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From categoryService: Error from the server!`,
    });
  }
};

let deleteCategoryById = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: `Missing required parameters!`,
      });
    }
    let infor = await categoryService.deleteCategoryByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error categoryController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From categoryService: Error from the server!`,
    });
  }
};

module.exports = {
  getDetailCategoryById: getDetailCategoryById,
  getAllListCategory: getAllListCategory,
  postAddNewCategory: postAddNewCategory,
  editCategoryById: editCategoryById,
  deleteCategoryById: deleteCategoryById,
};
