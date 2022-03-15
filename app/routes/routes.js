module.exports = (app) => {

  const auth = require("../controllers/auth-controller");
  const user = require("../controllers/user-controller");
  const category = require("../controllers/category-controller");
  const post = require("../controllers/post-controller");

  var router = require("express").Router();

  router.post("/auth/login", auth.login);
  router.post("/auth/register", auth.register);
  router.post("/auth/forget-password", auth.forgetPassword);
  router.post("/auth/reset-password", auth.resetPassword);

  router.get("/user", user.findAll);
  router.post("/user", user.findbyProfil);
  router.post("/user/search", user.search);
  router.post("/user/id", user.searchByUid);
  router.get("/user/:id", user.findOne);
  router.put("/user/:id", user.update);

  router.post("/category", category.create);
  router.get("/category", category.findAll);
  router.get("/category/:id", category.findOne);
  router.put("/category/:id", category.update);
  router.delete("/category/:id", category.delete);
  router.get("/category/search/:key", category.findby);


  router.post("/post", post.create);
  router.get("/post", post.findAll);
  router.get("/post/:id", post.findOne);
  router.put("/post/:id", post.update);
  router.delete("/post/:id", post.delete);
  router.get("/post/search/:key", post.findby);


  app.use("/api/", router);
};