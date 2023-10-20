const User = require("../models/User");

//criptografar a senha
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static async login(request, response) {
    return response.render("auth/login");
  }

  static async loginPost(request, response) {
    const { email, password} = request.body;
    // const password = request.body.password

    const user = await User.findOne({ where: { email: email } });

    //Validar Email
    if (!user) {
      request.flash("message", "Usuário não encontrado");
      response.redirect("/login");
    }

    console.log(user.password)

    // validar a senha
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) {
      request.flash("message", "Senha inválida");
      response.render("auth/login");
      return
    }

    request.session.userId = user.id;

    request.flash("message", "Autenticação realizada com sucesso!");

    request.session.save(() => {
      response.redirect("/");
    });

  }

  static async register(request, response) {
    return response.render("auth/register");
  }

  static async registerPost(request, response) {
    const { name, email, password, confirmpassword } = request.body;

    if (password != confirmpassword) {
      request.flash("message", "As senhas não conferem, tente novamente");
      return response.render("auth/register");
    }

    //validação de email - Verificar se email já está cadastrado
    const checkIfUserExist = await User.findOne({ where: { email: email } });
    if (checkIfUserExist) {
      request.flash("message", "O e-mail já está em uso!");
      response.render("auth/register");
      return;
    }

    //Criptografar a senha do usuário
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    //criar o objeto usuário para cadastro no banco
    const user = {
      name,
      email,
      password: hashedPassword,
    };

    //TRY - Inserir usuário no banco e Trabalhar com sessão
    try {
      const createdUser = await User.create(user);

      request.session.userId = createdUser.id;

      request.flash("message", "Cadastro realizado com sucesso!");

      request.session.save(() => {
        response.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async logout(request, response) {
    request.session.destroy();
    response.redirect("/login");
  }
};
