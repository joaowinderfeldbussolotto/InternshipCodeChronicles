
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

/**
* Handles the form submit. This is the function that gets called when the user clicks on the submit button
* 
* @param e - The event that was
*/
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

/**
* Sets the url to the TTS page. This is called by the constructor and should not be called directly
* 
* @param param - The parameter passed to the
*/
function handleURL(param) {
  url = `${BASE_URL}${param}/tts`
}

/**
* Fetch data from a URL. This is a wrapper around fetch (... OPTIONS ) to allow us to pass phrase as a parameter
* 
* @param url - The URL to fetch from
* @param phrase - The phrase to send to the API. This should be a string
* 
* @return { Promise } The data as a JSON string or an error if something goes wrong. It will be formatted as JSON
*/
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

/**
* Updates the display state of the input and output. This is called by handleStateChange and should not be called directly.
* 
* @param audio - The audio that is being played or null if none
*/
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

/**
* Creates and returns an audio element. This element is used to play audio. The source of the audio is specified by the url_to_audio parameter.
* 
* @param url_to_audio - The url of the audio.
* 
* @return { Element } The audio element that can be added to the document. Note that the audio element has a type attribute
*/
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