const { formatActivy, generateRandomId} = require('../utils/helper');

class Activity {
  constructor(id, atividade, tipo, participantes, acessibilidade) {
    this.id = id;
    this.atividade = atividade;
    this.tipo = tipo;
    this.participantes = participantes;
    this.acessibilidade = acessibilidade;
  }

  // Factory method to create a Activity instance from JSON data
  static fromJSON(data) {
    const formattedData = this.formatData(data);
    return new Activity(
      formattedData.id,
      formattedData.atividade,
      formattedData.tipo,
      formattedData.participantes,
      formattedData.acessibilidade
    );
  }

  // Static method to format the JSON data according to the specifications
  static formatData(data) {
    return {
      id: generateRandomId(),
      atividade: data.activity,
      tipo: data.type,
      participantes: data.participants,
      acessibilidade: data.accessibility,
    };
  }
}

module.exports = Activity;
