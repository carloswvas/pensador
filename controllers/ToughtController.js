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

  static async removeTought(request, response){
    const id =  request.body.id
    const userId = request.session.userId

    try {
      await Tought.destroy({where:{id:id, UserId:userId }})

      request.flash('message', 'Pensamento removido com sucesso')

      request.session.save(()=>{
        response.redirect('/toughts/dashboard')
      })

    } catch (error) {
      console.log(`Aconteceu um erro: ${erro}`)
    }
  }

  static async updateTought(request, response){
    const id = request.params.id

    const tought = await Tought.findOne({where:{id:id}, raw:true})

    response.render('toughts/edit', {tought})
  }

  static async updateToughtPost(request, response){
    const id = request.params.id

    const { title } = request.body;

    try{
      const tought = await Tought.findByPk(id)
      if(!tought){
        return response.status(404).json({"message":"Pensamento não encontrado!"})
      }
      // Atualiza pensamento
      tought.title = title

      // Salva pensamento
      await tought.save()

      request.flash('message', 'Pensamento atualizado com sucesso')
      request.session.save(()=>{
        response.redirect('/toughts/dashboard')
      })
    }catch(error){
      return response.status(500).json(({"message":"Erro interno no servidor!"}))
    }
  }
};
