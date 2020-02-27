"use strict";

const Mail = use("Mail");
const Helpers = use("Helpers");

class NewTaskMail {
  //determinar quantos jobs seram executados simultaneamente
  static get concurrency() {
    return 1;
  }

  // é gerado automaticamente, chave única para cada job
  static get key() {
    return "NewTaskMail-job";
  }

  // oque vai fazer a logica para enviar o email
  async handle({ email, username, title, file }) {
    console.log(`Job: ${NewTaskMail.key}`);

    await Mail.send(
      ["emails.new_task"],
      {
        username,
        title,
        hasAttachment: !!file
      },
      message => {
        message
          .to(email)
          .from("henrique.1360@gmail.com", "Henrique")
          .subject("Uma nova tarefa foi adicionada para você.");

        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name
          });
        }
      }
    );
  }
}

module.exports = NewTaskMail;
