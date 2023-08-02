const { v4: uuidv4 } = require('uuid');


function generateRandomId() {
  return uuidv4();
}

// Function to format the joke as per the specifications
function formatJoke(value) {
    return value.replace(/Chuck Norris/gi, 'CHUCK NORRIS');
  }
  

// Function to format a date in the format DD/MM/AAAA
function formatDate(dateString) {
  const formattedDate = dateString.split(' ')[0];
  return formattedDate.split('-').reverse().join('/');
}

module.exports = {
  generateRandomId,
  formatDate,
  formatJoke
};
