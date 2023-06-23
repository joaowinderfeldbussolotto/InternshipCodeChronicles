let pin = Math.floor(Math.random() * 1000)
console.log(pin)
document.getElementById('pin').value = pin
let verifyButton = document.getElementById('verifyButton')

verifyButton.addEventListener('click', function () {
  verifyPin()
})

function verifyPin() {
  let guess = document.getElementById('guess').value

  if (guess > pin + 100) {
    alert('Errou! Informe um valor bem menor')
    return
  }
  if (guess < pin - 100) {
    alert('Errou! Informe um valor bem maior')
    return
  }

  if (guess > pin) {
    alert('Errou! Passou por pouco!')
    return
  }
  if (guess < pin) {
    alert('Errou! Faltou pouco!')
    return
  }

  alert('Acertou!!')
}
