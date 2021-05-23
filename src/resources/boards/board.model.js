const { v4: uuid } = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'New board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => ({ id: uuid(), ...column }));
  }
}

module.exports = Board;
