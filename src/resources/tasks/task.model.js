const { v4: uuid } = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'New task',
    order,
    description = 'A new task',
    userId,
    boardId,
    columnId,
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
