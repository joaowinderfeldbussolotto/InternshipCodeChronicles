// js code
const inputContent = document.querySelector(".main-content.input")
const outputContent = document.querySelector(".main-content.output")
const form = document.querySelector("#form")
const submit = document.querySelector("#submit")
const phraseInput = document.querySelector("#phrase")
const tryAgain = document.querySelector(".try-again")
const BASE_URL = "https://wkiybux0uj.execute-api.us-east-1.amazonaws.com/"
const jsonContainer = document.querySelector("#jsonContainer")
let url = ""


tryAgain.addEventListener('click', handleState)
submit.addEventListener('click', handleForm)

async function handleForm(e) {
  e.preventDefault()
  if (phraseInput.value !== "" && url !== "") {
    const response = await fetchData(url, phraseInput.value)
    handleState()
    jsonContainer.textContent = response
  } else if (phraseInput.value == "") {
    alert("Por favor digite sua frase:")
  } else {
    alert("Por favor escolha sua rota desejada")
  }
}

function handleURL(param) {
  url = `${BASE_URL}${param}/tts`
}

async function fetchData(url, phrase) {
  const OPTIONS = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "phrase": phrase }),
  }
  try {
    const response = await fetch(url, OPTIONS)
    const json = await response.json()
    return JSON.stringify(json, null, 2)
  } catch (error) {
    return JSON.stringify({ "error": error.message }, null, 2)
  }
}

function handleState() {

  if (getComputedStyle(outputContent).display == 'none') {
    outputContent.style.display = "block"
    inputContent.style.display = 'none'
    tryAgain.style.visibility = 'visible'
  } else {
    outputContent.value = ""
    outputContent.style.display = "none"
    inputContent.style.display = 'flex'
    url = ""
    phraseInput.value = ""
    tryAgain.style.visibility = 'hidden'
  }
}