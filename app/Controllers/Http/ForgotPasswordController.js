"use strict";
const crypto = require("crypto");
const User = use("App/Models/User");

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      //request.input busca somente um campo da requisição
      const email = request.input("email");

      //findBy pega um único registro
      const user = await User.findByOrFail("email", email);

      //se encontrar email, será criado um token para esse usuário
      //esse token vai ser um token aleatório
      user.token = crypto.randomBytes(10).toString("hex");

      //anotar o token com a data atual
      user.token_created_at = new Date();

      // salvar usuário
      await user.save();
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Algo não deu certo, esse email existe?" } });
    }
  }
}

module.exports = ForgotPasswordController;
