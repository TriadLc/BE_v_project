import { reject } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let checkOneNews = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataNews = await db.News.findOne({
        where: { id: inputId },
      });
      if (!dataNews) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkEmptyDatabase = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (dataInput.length === 0) {
        resolve(false);
      } else {
        resolve(true);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDeitalNewsByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let check = await checkOneNews(inputId);
        if (check === true) {
          resolve({
            errCode: 3,
            errMessage: `This news is not exist in database!`,
          });
        } else {
          let data = await db.News.findOne({
            where: { id: inputId },
            include: [],
            raw: false,
            nest: true,
          });

          if (!data) data = {};
          resolve({
            errCode: 0,
            errMessage: "Everything is OK~",
            data: data,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllListNewsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listNews = await db.News.findAll({});
      let check = await checkEmptyDatabase(listNews);
      if (check === false) {
        resolve({
          errCode: 4,
          errMessage: `Database is empty!`,
          data: listNews,
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Everything is OK~",
          data: listNews,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let addNewNewsService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.title) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters!`,
        });
      } else {
        await db.News.create({
          title: data.title,
          image: data.image,
          status: data.status,
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

let editNewsByIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters!`,
        });
      } else {
        let check = await checkOneNews(data.id);
        if (check === true) {
          resolve({
            errCode: 3,
            errMessage: `This news is not exist in database!`,
          });
        } else {
          let newsData = await db.News.findOne({
            where: { id: data.id },
            raw: false,
          });
          newsData.title = data.title;
          newsData.image = data.image;
          newsData.status = data.status;

          await newsData.save();

          resolve({
            errCode: 0,
            errMessage: `Update data succeed~~`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteNewsByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkOneNews(inputId);
      if (check === true) {
        resolve({
          errCode: 3,
          errMessage: `This news is not exist in database!`,
        });
      } else {
        await db.News.destroy({
          where: { id: inputId },
        });
      }
      resolve({
        errCode: 0,
        errMessage: `Deleted data successfully~`,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getDeitalNewsByIdService: getDeitalNewsByIdService,
  getAllListNewsService: getAllListNewsService,
  addNewNewsService: addNewNewsService,
  editNewsByIdService: editNewsByIdService,
  deleteNewsByIdService: deleteNewsByIdService,
};
