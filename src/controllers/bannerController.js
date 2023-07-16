import { reject } from "lodash";
import db from "../models/index";
import bannerService from "../services/bannerService";

let getDetailBannerById = async (req, res) => {
  try {
    let infor = await bannerService.getDeitalBannerByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error BannerController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From BannerService: Error from the server!`,
    });
  }
};

let getAllListBanner = async (req, res) => {
  try {
    let listBanner = await bannerService.getAllListBannerService();
    return res.status(200).json(listBanner);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From BannerService: Error from the server!`,
    });
  }
};

let postAddNewBanner = async (req, res) => {
  try {
    let infor = await bannerService.addNewBannerService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error BannerController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From BannerService: Error from the server!`,
    });
  }
};

let editBannerById = async (req, res) => {
  try {
    let infor = await bannerService.editBannerByIdService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error BannerController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From BannerService: Error from the server!`,
    });
  }
};

let deleteBannerById = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: `Missing required parameters!`,
      });
    }
    let infor = await bannerService.deleteBannerByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error BannerController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From BannerService: Error from the server!`,
    });
  }
};

module.exports = {
  getDetailBannerById: getDetailBannerById,
  getAllListBanner: getAllListBanner,
  postAddNewBanner: postAddNewBanner,
  editBannerById: editBannerById,
  deleteBannerById: deleteBannerById,
};
