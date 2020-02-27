"use strict";

class Task {
  get rules() {
    return {
      // validation rules
      title: "required",
      due_date: "date"
    };
  }
}

module.exports = Task;
