const Users = require("../models/user-model");
var generator = require("generate-password");
const bcrypt = require("bcrypt");

const authController = {
  register: async (req, res) => {
    try {
      const body = req.body
      const user = await Users.findOne({
        email: body.email
      });
      if (user)
        return res.status(400).send({
          status: 400,
          message: "Adresse email existante",
        });
      const passwordHash = await bcrypt.hash(body.password, 10);
      const newUser = new Users({
        username: body.username,
        password: passwordHash,
        email: body.email,
        profil: body.profil,
        status: false
      });
      await newUser.save();
      return res.status(200).json({
        status: 200,
        message: "Votre compte a été crée",
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const {
        email,
        password
      } = req.body;
      const user = await Users.findOne({
        email: email
      });
      if (!user)
        return res.status(400).send({
          status: 400,
          message: "Cet utilisateur n'existe pas!",
        });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).send({
          status: 400,
          message: "Mot de passe incorrect!",
        });
      res.status(200).json({
        id: user.id,
        username: user.username,
        profil: user.profil,
        status: user.status
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  },

  forgetPassword: async (req, res) => {
    try {
      const {
        email
      } = req.body;
      const user = await Users.findOne({
        email: email
      });
      if (!user)
        return res.status(400).send({
          status: 400,
          message: "Cet utilisateur n'existe pas.",
        });
      const newpassword = generator.generate({
        length: 15,
        numbers: true
      });
      const passwordHash = await bcrypt.hash(newpassword, 10);
      const user2 = await Users.findByIdAndUpdate(
        user.id, {
        password: passwordHash
      }, {
        useFindAndModify: false
      }
      );
      if (!user2) {
        return res.status(400).send({
          status: 400,
          message: `Cannot update user with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        const receiver = email;
        const subject = "Vos nouveaux identifiants";
        const html =
          "Bonjour " +
          user.firstname +
          "<br><br>Vos identifiants de connexion sont désormais:<br> <p>Email: " +
          user.email +
          "</p> <p>Mot de passe: " +
          newpassword +
          "</p><br>Vous pouvez modifier ce mot de passe dans votre profil.";
        sendemail(receiver, subject, html);
        return res.status(200).send({
          status: 200,
          message: `Email envoyé`,
        });
      }
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: err.message,
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const {
        id,
        password,
        newpassword
      } = req.body;
      const user = await Users.findById(id);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).send({
          status: 400,
          message: "Mot de passe incorrect",
        });
      else {
        const isMatch = await bcrypt.compare(newpassword, user.password);
        if (isMatch)
          return res.status(400).send({
            status: 400,
            message: "Désolé, le nouveau mot de passe doit être différent de l'ancien",
          });
        else {
          const passwordHash = await bcrypt.hash(newpassword, 10);
          const user = await Users.findByIdAndUpdate(
            id, {
            password: passwordHash
          }, {
            useFindAndModify: false,
          }
          );
          if (!user) {
            return res.status(400).send({
              status: 400,
              message: `Cannot update user with id=${id}. Maybe Contact was not found!`,
            });
          } else
            return res.status(200).send({
              status: 200,
              message: `Mot de passe a été mis à jour`
            });
        }
      }
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: err.message,
      });
    }
  },
};

module.exports = authController;