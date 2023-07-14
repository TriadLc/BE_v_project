import express from "express";
import usercontroller from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  // Route User
  router.get("/api/get-all-list-user", usercontroller.getAllListUser);
  router.get("/api/get-detail-user-by-id", usercontroller.getDetailUserById);
  router.post("/api/add-new-user", usercontroller.postAddNewUser);
  router.put("/api/edit-user-by-id", usercontroller.editUserById);
  router.delete("/api/delete-user-by-id", usercontroller.deleteUserById);

  // Router o

  return app.use("/", router);
};

module.exports = initWebRoutes;
