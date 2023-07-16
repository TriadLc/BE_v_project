import { reject } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let checkOneBanner = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataBanner = await db.Banner.findOne({
        where: { id: inputId },
      });
      if (!dataBanner) {
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

let getDeitalBannerByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let check = await checkOneBanner(inputId);
        if (check === true) {
          resolve({
            errCode: 3,
            errMessage: `This banner is not exist in database!`,
          });
        } else {
          let data = await db.Banner.findOne({
            where: { id: inputId },
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
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllListBannerService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listBanner = await db.Banner.findAll({});
      let check = await checkEmptyDatabase(listBanner);
      if (check === false) {
        resolve({
          errCode: 4,
          errMessage: `Database is empty!`,
          data: listBanner,
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Everything is OK~",
          data: listBanner,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let addNewBannerService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters!`,
        });
      } else {
        await db.Banner.create({
          name: data.name,
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

let editBannerByIdService = (data) => {
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
            errMessage: `This banner is not exist in database!`,
          });
        } else {
          let bannerData = await db.Banner.findOne({
            where: { id: data.id },
            raw: false,
          });
          bannerData.name = data.name;
          bannerData.image = data.image;
          bannerData.status = data.status;

          await bannerData.save();

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

let deleteBannerByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkOneNews(inputId);
      if (check === true) {
        resolve({
          errCode: 3,
          errMessage: `This banner is not exist in database!`,
        });
      } else {
        await db.Banner.destroy({
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
  getDeitalBannerByIdService: getDeitalBannerByIdService,
  getAllListBannerService: getAllListBannerService,
  addNewBannerService: addNewBannerService,
  editBannerByIdService: editBannerByIdService,
  deleteBannerByIdService: deleteBannerByIdService,
};
