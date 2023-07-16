import { reject } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let checkOneProduct = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataProduct = await db.Product.findOne({
        where: { id: inputId },
      });
      if (!dataProduct) {
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

let getDeitalProductByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let check = await checkOneProduct(inputId);
        if (check === true) {
          resolve({
            errCode: 3,
            errMessage: `This product is not exist in database!`,
          });
        } else {
          let data = await db.Product.findOne({
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

let getAllListProductService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listProduct = await db.Product.findAll({
        // where: {
        //   role: "R1", "R2", "R3",
        // },
        // order: [["createdAt", "DESC"]],
        // attributes: {
        //   exclude: ["password",],
        // },
      });

      let check = await checkEmptyDatabase(listProduct);
      if (check === false) {
        resolve({
          errCode: 4,
          errMessage: `Database is empty!`,
          data: listProduct,
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Everything is OK~",
          data: listProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let addNewProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.brand_id || !data.category_id || !data.price) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters!`,
        });
      } else {
        await db.Product.create({
          name: data.name,
          price: data.price,
          oldprice: data.oldprice,
          image: data.image,
          description: data.description,
          specification: data.specification,
          buyturn: data.buyturn,
          quantity: data.quantity,
          brand_id: data.brand_id,
          category_id: data.category_id,
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

let editProductByIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters!`,
        });
      } else {
        let check = await checkOneProduct(data.id);
        if (check === true) {
          resolve({
            errCode: 3,
            errMessage: `This product is not exist in database!`,
          });
        } else {
          let dataProduct = await db.Product.findOne({
            where: { id: data.id },
            raw: false,
          });
          dataProduct.name = data.name;
          dataProduct.price = data.price;
          dataProduct.oldprice = data.oldprice;
          dataProduct.description = data.description;
          dataProduct.specification = data.specification;
          dataProduct.buyturn = data.buyturn;
          dataProduct.quantity = data.quantity;
          dataProduct.brand_id = data.brand_id;
          dataProduct.category_id = data.category_id;
          dataProduct.status = data.status;

          await dataProduct.save();

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

let deleteProductByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkOneProduct(inputId);
      if (check === true) {
        resolve({
          errCode: 3,
          errMessage: `This product is not exist in database!`,
        });
      } else {
        await db.Product.destroy({
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
  getDeitalProductByIdService: getDeitalProductByIdService,
  getAllListProductService: getAllListProductService,
  addNewProductService: addNewProductService,
  editProductByIdService: editProductByIdService,
  deleteProductByIdService: deleteProductByIdService,
};
