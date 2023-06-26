let pin = Math.floor(Math.random() * 9000) + 1000
console.log(pin)
const verifyButton = document.getElementById('verifyButton')

//Calling the verify function when button pressed
verifyButton.addEventListener('click', function () {
  validatePin()
})

function createResultMessage(message, success) {
  let resultMessage = document.getElementById('result')
  resultMessage.textContent = message
  resultMessage.style.color = success ? 'green' : 'red'
}

function validatePin() {
  let guess = document.getElementById('guess').value
  if (guess == '' || isNaN(guess) || guess < 0) {
    createResultMessage('Por favor entre um número válido', false)
    return
  }
  guess = Number(guess)

  if (guess > pin + 100) {
    createResultMessage('Errou! Informe um valor bem menor', false)
    return
  }
  if (guess < pin - 100) {
    createResultMessage('Errou! Informe um valor bem maior', false)
    return
  }

  if (guess > pin) {
    createResultMessage('Errou! Passou por pouco!', false)
    return
  }
  if (guess < pin) {
    createResultMessage('Errou! Faltou pouco!', false)
    return
  }

  createResultMessage('Acertou!!', true)
}
