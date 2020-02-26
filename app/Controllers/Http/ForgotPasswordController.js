"use strict";
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
}

module.exports = ForgotPasswordController;
