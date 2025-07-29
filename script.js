import { charactersFAQ } from "./Data/Data.js";
import { animeList } from "./Data/ShowData.js";
const messageInput = document.querySelector(".message-input");
const submitButton = document.querySelector(".send-button");
const chat = document.querySelector(".chat-body");

const generateUserMessageFunc = (messageElement, ...classes) => {
  const div = document.createElement('div');
  div.classList.add("message", ...classes);
  div.innerHTML = messageElement;
  return div;
}

let userMessage = {
  message: ""
}

const handleInput = (e) => {
  e.preventDefault();
  const usermessage = messageInput.value.trim();
  const filterInput = usermessage.split(":");
  userMessage.message = filterInput[1];
  const Tags = filterInput[0];
  messageInput.value = "";
  const userMessageContent = `<div class="message-text"></div>`

  const generateUserMessage = generateUserMessageFunc(userMessageContent, "user-message");
  generateUserMessage.querySelector(".message-text").textContent = userMessage.message;
  chat.appendChild(generateUserMessage);

  setTimeout(() => {
    const waitingAnimation = `
        <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
          <path
            d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
          </path>
        </svg>
        <div class="message-text">
          <div class="thinking-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>`

    const generateWaitAnimation = generateUserMessageFunc(waitingAnimation, "bot-message", "thinking");
    chat.appendChild(generateWaitAnimation);

    setTimeout(() => {
      generateBotresponse(userMessage.message, generateWaitAnimation, Tags);
    }, 4000);
  }, 600)
}

const generateBotresponse = (message, waitMessage, tag) => {

  if(tag === "/Character"){
    const characters = charactersFAQ;
  
    let characterAnswer = ""
  
    const filterData = characters.filter((val) => val.question.toLowerCase().includes(message.toLowerCase()));
  
    characterAnswer = filterData[0].answer;
  
    const botResponse = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
            <path
              d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
            </path>
          </svg>
          <div class="message-text">
          ${characterAnswer}
          </div>`
  
    try {
      waitMessage.remove();
      const generateBotResponseMessage = generateUserMessageFunc(botResponse, "bot-message");
      chat.append(generateBotResponseMessage);
    } catch (error) {
      console.log(error)
    }
  } else if (tag === "/Anime"){
    const characters = animeList;
    
    const filterData = characters.filter((val) => val.name.toLowerCase().includes(message.toLowerCase()));
  
    let animeName = filterData[0].name;
    let animeDescription = filterData[0].description;
    let animeCharacter = filterData[0].character;
    let animeRatings = filterData[0].ratings;
  
    const botResponse = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
            <path
              d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
            </path>
          </svg>
          <div class="message-text">
          <span style="font-weight: bold;">Anime Name: </span>${animeName} <br>
          <span style="font-weight: bold;">Character: </span>${animeCharacter} <br>
          <span style="font-weight: bold;">Description: </span>${animeDescription} <br>
          <span style="font-weight: bold;">Ratings: </span>${animeRatings} <br>
          </div>`
  
    try {
      waitMessage.remove();
      const generateBotResponseMessage = generateUserMessageFunc(botResponse, "bot-message");
      chat.append(generateBotResponseMessage);
    } catch (error) {
      console.log(error)
    }
  }
}

messageInput.addEventListener('keydown', (e) => {
  const usermessage = e.target.value.trim();
  if(e.key === "Enter" && usermessage){
    handleInput(e);
  }
})

submitButton.addEventListener("click", (e) => handleInput(e))