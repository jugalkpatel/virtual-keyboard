import "./style.css";
import keys from "./scripts/keys";
import tracks from "./scripts/tracks";
import getRandomInt from "./scripts/utils/getRandomInt";
import Keyboard from "./scripts/KeyBoard";

const container = document.querySelector("#app-container");

const showText = document.createElement("input");
showText.className = "show-text";
showText.placeholder = "Show Text Here...";
showText.style.height = "1rem";
showText.style.padding = "1rem";
showText.style.paddingLeft = "0.5rem";
showText.style.border = 0;
showText.style.backgroundColor = "#424242";
showText.style.color = "#FFFFFF";
showText.style.borderBottom = "1px solid #FFFFFF";

container.append(showText);

const keyboard = new Keyboard(showText);

keys.forEach(({ id, key: keyName, subKey, isModifierKey }) => {
  const randomNumber = getRandomInt(tracks.length);
  const randomTrack = "/static/assets/" + tracks[randomNumber];
  keyboard.createKey({
    id,
    keyName,
    track: randomTrack,
    subKey,
    isModifierKey,
  });
});

container.append(keyboard.getKeyboard);
