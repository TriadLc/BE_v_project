import { reject } from "lodash";
import db from "../models/index";
import productService from "./../services/productService";

let getDetailProductById = async (req, res) => {
  try {
    let infor = await productService.getDeitalProductByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error Productcontroller: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From ProductSevice: Error from the server!`,
    });
  }
};

let getAllListProduct = async (req, res) => {
  try {
    let listProduct = await productService.getAllListProductService();
    return res.status(200).json(listProduct);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From ProductSevice: Error from the server!`,
    });
  }
};

let postAddNewProduct = async (req, res) => {
  try {
    let infor = await productService.addNewProductService(req.body);

    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error Productcontroller: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From ProductSevice: Error from the server!`,
    });
  }
};

let editProductById = async (req, res) => {
  try {
    let infor = await productService.editProductByIdService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error Productcontroller: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From ProductSevice: Error from the server!`,
    });
  }
};

let deleteProductById = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: `Missing required parameters!`,
      });
    }
    let infor = await productService.deleteProductByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error Productcontroller: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From ProductSevice: Error from the server!`,
    });
  }
};

module.exports = {
  getDetailProductById: getDetailProductById,
  getAllListProduct: getAllListProduct,
  postAddNewProduct: postAddNewProduct,
  editProductById: editProductById,
  deleteProductById: deleteProductById,
};
