const { v4: uuidv4 } = require('uuid');

class Joke {
    constructor(data) {
      this.data_atualizacao = data.updated_at;
      this.data_criacao = data.created_at;
      this.icone = data.icon_url;
      this.id = uuidv4();
      this.piada = data.value;
      this.referencia = data.url;
    }
  }
  
  module.exports = Joke;
  