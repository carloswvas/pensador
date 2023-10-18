const Tought = require("../models/Tought");
const User = require("../models/User");

module.exports = class ToughtController {
  static async showToughts(request, response) {
    return response.render("toughts/home"); //Mostrando um view
  }

  static async dashboard(request, response) {
    const userId = request.session.userId;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Tought,
      plain: true,
    });

    if (!user) {
      response.redirect("/login");
    }

    const toughts = user.Toughts.map((result) => result.dataValues);
    // console.log(toughts);

    return response.render("toughts/dashboard", {toughts});
  }

  static createTought(request, response) {
    return response.render("toughts/create");
  }

  static async createToughtSave(request, response) {
    const tought = {
      title: request.body.title,
      UserId: request.session.userId,
    };

    try {
      await Tought.create(tought);
      request.flash("message", "Pensamento criado com sucesso!");

      request.session.save(() => {
        response.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(`Aconteceu um erro: ${error}`);
    }
  }
};
