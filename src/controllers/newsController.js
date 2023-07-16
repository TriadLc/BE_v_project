import { reject } from "lodash";
import db from "../models/index";
import newsService from "../services/newsService";

let getDetailNewsById = async (req, res) => {
  try {
    let infor = await newsService.getDeitalNewsByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error newsController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From newsService: Error from the server!`,
    });
  }
};

let getAllListNews = async (req, res) => {
  try {
    let listnews = await newsService.getAllListNewsService();
    return res.status(200).json(listnews);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From newsService: Error from the server!`,
    });
  }
};

let postAddNewNews = async (req, res) => {
  try {
    let infor = await newsService.addNewNewsService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error newsController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From newsService: Error from the server!`,
    });
  }
};

let editNewsById = async (req, res) => {
  try {
    let infor = await newsService.editNewsByIdService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error newsController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From newsService: Error from the server!`,
    });
  }
};

let deleteNewsById = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: `Missing required parameters!`,
      });
    }
    let infor = await newsService.deleteNewsByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log("Error newsController: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: `From newsService: Error from the server!`,
    });
  }
};

module.exports = {
  getDetailNewsById: getDetailNewsById,
  getAllListNews: getAllListNews,
  postAddNewNews: postAddNewNews,
  editNewsById: editNewsById,
  deleteNewsById: deleteNewsById,
};
