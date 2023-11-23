let pin = Math.floor(Math.random() * 900) + 100
const verifyButton = document.getElementById('verifyButton')
const showPIN = document.getElementById('showPIN')
let threeDigitRegex = /^\d{3}$/

//Calling the verify function when button pressed
verifyButton.addEventListener('click', function () {
  validatePin()
})

showPIN.addEventListener('click', function () {
  let displayPin = document.getElementById('pin')
  if (displayPin.style.display == 'block') 
   displayPin.style.display = 'none'
  else
   displayPin.style.display = 'block'
  displayPin.textContent = pin
})

function createResultMessage(message, success) {
  let resultMessage = document.getElementById('result')
  resultMessage.textContent = message
  resultMessage.style.color = success ? 'green' : 'red'
}

function validatePin() {
  let guess = document.getElementById('guess').value
  if (guess == '' || isNaN(guess) || !threeDigitRegex.test(guess)) {
    createResultMessage('Por favor entre um PIN válido de três digitos númericos',false)
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
