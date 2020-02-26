"use strict";

class SessionController {
  //metodo para criar uma nova sessão (autenticar)
  //request.all pega todos os campos
  async store({ request, response, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = SessionController;
