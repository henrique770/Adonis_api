"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request }) {
    //pegar os dados que o usuário está enviando
    //reques.only pega somente os campos especificados
    const data = request.only(["username", "email", "password"]);
    //criar novo usuário
    const user = await User.create(data);

    return user;
  }
}

module.exports = UserController;
