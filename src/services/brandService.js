import { reject } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let checkOneBrand = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataBrand = await db.Brand.findOne({
        where: { id: inputId },
      });
      if (!dataBrand) {
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

let getDeitalBrandByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let check = await checkOneBrand(inputId);
        if (check === true) {
          resolve({
            errCode: 3,
            errMessage: `This brand is not exist in database!`,
          });
        } else {
          let data = await db.Brand.findOne({
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

let getAllListBrandService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listBrand = await db.Brand.findAll({});
      let check = await checkEmptyDatabase(listBrand);
      if (check === false) {
        resolve({
          errCode: 4,
          errMessage: `Database is empty!`,
          data: listBrand,
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Everything is OK~",
          data: listBrand,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let addNewBrandService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.description) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters!`,
        });
      } else {
        await db.Brand.create({
          name: data.name,
          description: data.description,
          image: data.image,
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

let editBrandByIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters!`,
        });
      } else {
        let check = await checkOneBrand(data.id);
        if (check === true) {
          resolve({
            errCode: 3,
            errMessage: `This brand is not exist in database!`,
          });
        } else {
          let brandData = await db.Brand.findOne({
            where: { id: data.id },
            raw: false,
          });
          brandData.name = data.name;
          brandData.description = data.description;
          brandData.image = data.image;

          await brandData.save();

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

let deleteBrandByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkOneBrand(inputId);
      if (check === true) {
        resolve({
          errCode: 3,
          errMessage: `This brand is not exist in database!`,
        });
      } else {
        await db.Brand.destroy({
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
  getDeitalBrandByIdService: getDeitalBrandByIdService,
  getAllListBrandService: getAllListBrandService,
  addNewBrandService: addNewBrandService,
  editBrandByIdService: editBrandByIdService,
  deleteBrandByIdService: deleteBrandByIdService,
};
