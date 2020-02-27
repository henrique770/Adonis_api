"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Task extends Model {
  /**
   * Envia um email para o usuário vinculado a uma task
   */
  static boot() {
    super.boot();
    this.addHook("afterCreate", "TaskHook.sendNewTaskMail");
    this.addHook("beforeUpdate", "TaskHook.sendNewTaskMail");
  }

  //a tarefa pertence a algum projeto
  project() {
    return this.belongsTo("App/Models/Project");
  }

  // tarefa também pertence a algum usuário
  user() {
    return this.belongsTo("App/Models/User");
  }

  // pode ter um arquivo
  file() {
    return this.belongsTo("App/Models/File");
  }
}

module.exports = Task;
