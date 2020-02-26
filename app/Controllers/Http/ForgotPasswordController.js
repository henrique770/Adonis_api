"use strict";

const moment = require("moment");
const crypto = require("crypto");
const User = use("App/Models/User");
const Mail = use("Mail");

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

      await Mail.send(
        ["emails.forgot_password"],
        {
          email,
          token: user.token,
          link: `${request.input("redirect_url")}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from("henrique.1360@gmail.com", "Henrique | Ugrowth")
            .subject("Recuperação de senha");
        }
      );
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Algo não deu certo, esse email existe?" } });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      //procurar o usuário
      const user = await User.findByOrFail("token", token);

      //verifica se o token foi criado a mais de 2 dias
      const tokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: "O token de recuperação está expirado" } });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Algo deu errado ao resetar sua senha" } });
    }
  }
}

module.exports = ForgotPasswordController;
