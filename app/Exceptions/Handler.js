"use strict";
//variaveis ambiente
const Env = use("Env");
// formatador de erro
const youch = require("youch");
const BaseExceptionHandler = use("BaseExceptionHandler");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    //se for um erro de validação eu vou retornar apenas as mensagens de error em formato JSON
    if (error.name === "ValidationException") {
      return response.status(error.status).send(error.messages);
    }

    if (Env.get("NODE_ENV") === "development") {
      const youchJSON = new youch(error, request.request);
      const errorJSON = await youchJSON.toJSON();

      return response.status(error.status).send(errorJSON);
    }

    return response.status(error.status);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {
    console.log(error);
  }
}

module.exports = ExceptionHandler;
