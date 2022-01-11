import { enableModifierKey, updateShowText } from "./utils/KeyFunctions";

export default class Keyboard {
  constructor(showText) {
    this.keyboard = document.createElement("div");
    this.keyboard.id = "app";
    this.audioElement = document.createElement("audio");
    this.modifierKeys = {};
    this.textElement = showText;
    this.keyboard.append(this.audioElement);
  }

  get getKeyboard() {
    return this.keyboard;
  }

  createKey({ id, keyName, track, subKey = "", isModifierKey }) {
    const button = document.createElement("button");
    button.textContent = keyName;
    button.className = `${keyName}__${id}`;
    const btnStyle = button.style;

    if (isModifierKey) {
      this.modifierKeys[keyName] = false;
    }

    const label = document.createElement("label");
    label.textContent = subKey;
    label.className = `${keyName}__${subKey}`;
    const labelStyle = label.style;

    button.append(label);
    btnStyle.position = "relative";
    btnStyle.textAlign = "center";

    labelStyle.position = "absolute";
    labelStyle.top = 0;
    labelStyle.left = 0;
    labelStyle.margin = "0.5rem";

    button.addEventListener("click", () => {
      this.modifierKeys = enableModifierKey({
        keyName,
        isModifierKey,
        modifierKeys: this.modifierKeys,
      });

      this.textElement.value = updateShowText({
        showText: this.textElement.value,
        keyName,
        subKey,
        modifierKeys: this.modifierKeys,
        isModifierKey,
      });

      this.audioElement.currentTime = 0;
      this.audioElement.src = track;
      this.audioElement.play();
    });

    this.keyboard.append(button);
  }

  addToKeyBoard(element) {
    this.keyboard.append(element);
  }
}
