
const main = document.querySelector(".main-content")
const inputContent = document.querySelector(".main-content.input")
const outputContent = document.querySelector(".main-content.output")
const form = document.querySelector("#form")
const submit = document.querySelector("#submit")
const phraseInput = document.querySelector("#phrase")
const tryAgain = document.querySelector(".try-again")
const BASE_URL = "https://sjcz8s68n4.execute-api.us-east-1.amazonaws.com/"
const jsonContainer = document.querySelector("#jsonContainer")
const audioInput = document.querySelector(".audio")

let url = ""


tryAgain.addEventListener('click', handleState)
submit.addEventListener('click', handleForm)

async function handleForm(e) {
  e.preventDefault()
  if (phraseInput.value !== "" && url !== "") {
    const response = await fetchData(url, phraseInput.value)
    const audio = createAudio(JSON.parse(response)['url_to_audio'])
    handleState(audio)
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

function handleState(audio) {

  if (getComputedStyle(outputContent).display == 'none') {
    outputContent.style.display = "block"
    inputContent.style.display = 'none'
    tryAgain.style.visibility = 'visible'
    audioInput.style.visibility = 'visible'
    audioInput.append(audio)
  } else {
    outputContent.value = ""
    outputContent.style.display = "none"
    inputContent.style.display = 'flex'
    url = ""
    phraseInput.value = ""
    tryAgain.style.visibility = 'hidden'
    audioInput.style.visibility = 'hidden'
    if(audioInput.children[0]) audioInput.children[0].remove()
    
  }
}

function createAudio(url_to_audio) {
  const audio = document.createElement('audio')
  audio.setAttribute('controls', 'controls')

  const sourceElement = document.createElement('source');
  sourceElement.setAttribute('src', url_to_audio);
  sourceElement.setAttribute('type', 'audio/mpeg');

  const unsupportedMessage = document.createElement('p');
  unsupportedMessage.textContent = 'Seu navegador não suporta a reprodução de áudio.';

  audio.appendChild(...[sourceElement,unsupportedMessage]);
  return audio
}