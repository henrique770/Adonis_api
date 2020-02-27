"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Project extends Model {
  //belongsto que o projeto pertence a algum usuário
  user() {
    return this.belongsTo("App/Models/User");
  }
  //hasMany um projeto pode ter várias tarefas associadas a ele
  tasks() {
    return this.hasMany("App/Models/Task");
  }
}

module.exports = Project;
