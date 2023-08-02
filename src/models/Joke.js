const { formatDate, formatJoke, generateRandomId} = require('../utils/helper');

class Joke {
  constructor(data_atualizacao, data_criacao, icone, id, piada, referencia) {
    this.data_atualizacao = data_atualizacao;
    this.data_criacao = data_criacao;
    this.icone = icone;
    this.id = id;
    this.piada = piada;
    this.referencia = referencia;
  }

  // Factory method to create a Joke instance from JSON data
  static fromJSON(data) {
    const formattedData = this.formatData(data);
    return new Joke(
      formattedData.data_atualizacao,
      formattedData.data_criacao,
      formattedData.icone,
      formattedData.id,
      formattedData.piada,
      formattedData.referencia
    );
  }

  // Static method to format the JSON data according to the specifications
  static formatData(data) {
    return {
      data_atualizacao: formatDate(data.updated_at),
      data_criacao: formatDate(data.created_at),
      icone: data.icon_url,
      id: generateRandomId(),
      piada: formatJoke(data.value),
      referencia: data.url,
    };
  }
}

module.exports = Joke;
