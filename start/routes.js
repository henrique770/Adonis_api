"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("users", "UserController.store").validator("User");
Route.post("sessions", "SessionController.store").validator("Session");

Route.post("passwords", "ForgotPasswordController.store").validator(
  "ForgotPassword"
);
Route.put("passwords", "ForgotPasswordController.update").validator(
  "ResetPassword"
);

//Rota para acessar o arquivo
Route.get("/files/:id", "FileController.show");

//Rotas só são acessadas quando o usuário estiver logado
Route.group(() => {
  Route.post("/files", "FileController.store");
  Route.resource("projects", "ProjectController")
    .apiOnly()
    .validator(new Map([[["projects.store"], ["Project"]]]));

  Route.resource("projects.tasks", "TaskController")
    .apiOnly()
    .validator(new Map([[["projects.tasks.store"], ["Task"]]]));
}).middleware(["auth"]);
