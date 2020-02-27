"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("users", "UserController.store");
Route.post("sessions", "SessionController.store");

Route.post("passwords", "ForgotPasswordController.store");
Route.put("passwords", "ForgotPasswordController.update");

//Rota para acessar o arquivo
Route.get("/files/:id", "FileController.show");

//Rotas só são acessadas quando o usuário estiver logado
Route.group(() => {
  Route.post("/files", "FileController.store");
  Route.resource("projects", "ProjectController").apiOnly();
  Route.resource("projects.tasks", "TaskController").apiOnly();
}).middleware(["auth"]);
