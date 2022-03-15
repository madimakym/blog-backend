const Post = require("../models/post-model");

const postCtrl = {
  create: async (req, res) => {
    if (!req.body.libelle) {
      return res.status(400).json({ message: "Libelle requis" });
    }
    // console.log("body:", req.body);
    try {
      const post = new Post({
        libelle: req.body.libelle,
        description: req.body.description,
        categoryId: req.body.categoryId,
        visual: req.body.visual ? req.body.visual : "default-img.png",
        status: req.body.status ? req.body.status : true
      });
      await post.save();
      return res.status(200).json({
        status: 200,
        message: "Post created",
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  },

  findAll: async (_req, res) => {
    try {
      const response = await Post.find().populate([
        {
          path: "categoryId",
          populate: {
            path: "categoryId",
            model: "Categories",
          },
        }
      ]);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },

  findOne: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await Post.findById(id).populate([
        {
          path: "categoryId",
          populate: {
            path: "categoryId",
            model: "Categories",
          },
        }
      ]);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;
    try {
      await Post.findByIdAndRemove(id);
      return res.status(200).json({
        status: 200,
        message: "Post deleted",
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
    try {
      const data = {
        libelle: req.body.libelle,
        description: req.body.description,
        categorieId: req.body.categorieId,
        visual: req.body.visual,
        status: req.body.status,
      };

      await Post.findByIdAndUpdate(id, data, {
        useFindAndModify: false,
      });
      return res.status(200).json({
        status: 200,
        message: "Post updated",
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  findby: async (req, res) => {
    const key = req.params.post;
    try {
      const post = await Post.find({
        $or: [{ libelle: { $regex: new RegExp(key, "i") } }],
      }).sort({ createdAt: "desc" });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
};
module.exports = postCtrl;
