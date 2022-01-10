import "./style.css";
import keys from "./scripts/keys";
import tracks from "./scripts/tracks";
import getRandomInt from "./scripts/utils/getRandomInt";
import Keyboard from "./scripts/KeyBoard";

const container = document.querySelector("#app-container");

const showText = document.createElement("input");
showText.placeholder = "show text here...";
showText.style.height = "1rem";
showText.style.padding = "1rem";
showText.style.paddingLeft = "0.5rem";
showText.style.border = 0;
showText.style.borderBottom = "1px solid black";

container.append(showText);

const keyboard = new Keyboard(showText);

keys.forEach(({ key: keyName, subKey }) => {
  const randomNumber = getRandomInt(tracks.length);
  const randomTrack = "assets/" + tracks[randomNumber];
  keyboard.createKey({ keyName, track: randomTrack, subKey });
});
container.append(keyboard.getKeyboard);
