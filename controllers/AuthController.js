module.exports = class AuthController{
  static login(request, response){
    return response.render('auth/login')
  }
  static register(request, response){
    return response.render('auth/register')
  }
}
