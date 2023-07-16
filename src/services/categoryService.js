import { reject } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let checkOneCategory = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataCategory = await db.Category.findOne({
        where: { id: inputId },
      });
      if (!dataCategory) {
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

let getDeitalCategoryByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Category.findOne({
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
    } catch (e) {
      reject(e);
    }
  });
};

let getAllListCategoryService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listCategory = await db.Category.findAll({});
      let check = await checkEmptyDatabase(listCategory);
      if (check === false) {
        resolve({
          errCode: 4,
          errMessage: `Database is empty!`,
          data: listCategory,
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Everything is OK~",
          data: listCategory,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let addNewCategoryService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters!`,
        });
      } else {
        await db.Category.create({
          name: data.name,
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

let editCategoryByIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters!`,
        });
      } else {
        let check = await checkOneCategory(data.id);
        if (check === true) {
          resolve({
            errCode: 3,
            errMessage: `This category is not exist in database!`,
          });
        } else {
          let cateData = await db.Category.findOne({
            where: { id: data.id },
            raw: false,
          });
          cateData.name = data.name;

          await cateData.save();

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

let deleteCategoryByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkOneCategory(inputId);
      if (check === true) {
        resolve({
          errCode: 3,
          errMessage: `This news is not exist in database!`,
        });
      } else {
        await db.Category.destroy({
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
  getDeitalCategoryByIdService: getDeitalCategoryByIdService,
  getAllListCategoryService: getAllListCategoryService,
  addNewCategoryService: addNewCategoryService,
  editCategoryByIdService: editCategoryByIdService,
  deleteCategoryByIdService: deleteCategoryByIdService,
};
