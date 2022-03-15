const Category = require("../models/caterory-model");

const categoryCtrl = {
  create: async (req, res) => {
    if (!req.body.libelle) {
      return res.status(400).json({ message: "Libelle requis" });
    }
    try {
      const category = new Category({
        libelle: req.body.libelle,
        description: req.body.description,
        visual: req.body.visual ? req.body.visual : "default-img.png",
        status: req.body.status ? req.body.status : true
      });
      await category.save();
      return res.status(200).json({
        status: 200,
        message: "Category created",
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
      const response = await Category.find().sort({ createdAt: "desc" });
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
      const response = await Category.findById(id);
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
      await Category.findByIdAndRemove(id);
      return res.status(200).json({
        status: 200,
        message: "Category deleted",
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
        visual: req.body.visual,
        status: req.body.status,
      };

      await Category.findByIdAndUpdate(id, data, {
        useFindAndModify: false,
      });
      return res.status(200).json({
        status: 200,
        message: "Category updated",
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  findby: async (req, res) => {
    const key = req.params.category;
    try {
      const category = await Category.find({
        $or: [{ libelle: { $regex: new RegExp(key, "i") } }],
      }).sort({ createdAt: "desc" });
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
};
module.exports = categoryCtrl;
