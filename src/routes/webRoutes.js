import express from "express";
import userController from "../controllers/userController";
import categoryController from "../controllers/categoryController";
import productController from "../controllers/productController";
import brandController from "../controllers/brandController";
import bannerController from "../controllers/bannerController";
import newsController from "../controllers/newsController";

let router = express.Router();

let initWebRoutes = (app) => {
  // Route User
  router.get("/api/get-all-list-user", userController.getAllListUser);
  router.get("/api/get-detail-user-by-id", userController.getDetailUserById);
  router.post("/api/add-new-user", userController.postAddNewUser);
  router.put("/api/edit-user-by-id", userController.editUserById);
  router.delete("/api/delete-user-by-id", userController.deleteUserById);

  // Router Category
  router.get(
    "/api/get-all-list-category",
    categoryController.getAllListCategory
  );
  router.get(
    "/api/get-detail-category-by-id",
    categoryController.getDetailCategoryById
  );
  router.post("/api/add-new-category", categoryController.postAddNewCategory);
  router.put("/api/edit-category-by-id", categoryController.editCategoryById);
  router.delete(
    "/api/delete-category-by-id",
    categoryController.deleteCategoryById
  );

  // Router Brand
  router.get("/api/get-all-list-brand", brandController.getAllListBrand);
  router.get("/api/get-detail-brand-by-id", brandController.getDetailBrandById);
  router.post("/api/add-new-brand", brandController.postAddNewBrand);
  router.put("/api/edit-brand-by-id", brandController.editBrandById);
  router.delete("/api/delete-brand-by-id", brandController.deleteBrandById);

  //Router Product
  router.get("/api/get-all-list-product", productController.getAllListProduct);
  router.get(
    "/api/get-detail-product-by-id",
    productController.getDetailProductById
  );
  router.post("/api/add-new-product", productController.postAddNewProduct);
  router.put("/api/edit-product-by-id", productController.editProductById);
  router.delete(
    "/api/delete-product-by-id",
    productController.deleteProductById
  );

  //Router Banner
  router.get("/api/get-all-list-banner", bannerController.getAllListBanner);
  router.get(
    "/api/get-detail-banner-by-id",
    bannerController.getDetailBannerById
  );
  router.post("/api/add-new-banner", bannerController.postAddNewBanner);
  router.put("/api/edit-banner-by-id", bannerController.editBannerById);
  router.delete("/api/delete-banner-by-id", bannerController.deleteBannerById);

  //Router News
  router.get("/api/get-all-list-news", newsController.getAllListNews);
  router.get("/api/get-detail-news-by-id", newsController.getDetailNewsById);
  router.post("/api/add-new-news", newsController.postAddNewNews);
  router.put("/api/edit-news-by-id", newsController.editNewsById);
  router.delete("/api/delete-news-by-id", newsController.deleteNewsById);

  return app.use("/", router);
};

module.exports = initWebRoutes;
