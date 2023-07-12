const MediaItem = require('./MediaItem');

class Comic extends MediaItem {
  constructor(id, url, title, description) {
    super(id, url, title);
    this.description = description;
  }
}

module.exports = Comic;
