import { reject } from "lodash";
import db from "../models/index";
import brandService from "../services/brandService";

let getDetailBrandById = async (req, res) => {
  try {
    let infor = await brandService.getDeitalBrandByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error brandController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From brandService: Error from the server!`,
    });
  }
};

let getAllListBrand = async (req, res) => {
  try {
    let listBrand = await brandService.getAllListBrandService();
    return res.status(200).json(listBrand);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From brandService: Error from the server!`,
    });
  }
};

let postAddNewBrand = async (req, res) => {
  try {
    let infor = await brandService.addNewBrandService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error brandController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From brandService: Error from the server!`,
    });
  }
};

let editBrandById = async (req, res) => {
  try {
    let infor = await brandService.editBrandByIdService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error brandController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From brandService: Error from the server!`,
    });
  }
};

let deleteBrandById = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: `Missing required parameters!`,
      });
    }
    let infor = await brandService.deleteBrandByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error brandController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From brandService: Error from the server!`,
    });
  }
};

module.exports = {
  getDetailBrandById: getDetailBrandById,
  getAllListBrand: getAllListBrand,
  postAddNewBrand: postAddNewBrand,
  editBrandById: editBrandById,
  deleteBrandById: deleteBrandById,
};
