import { enableModifierKey, updateShowText } from "./utils/KeyFunctions";

export default class Keyboard {
  constructor(showText) {
    this.keyboard = document.createElement("div");
    this.keyboard.id = "keyboard";
    this.keyboard.backgroundColor = "#171717";
    this.audioElement = document.createElement("audio");
    this.modifierKeys = {};
    this.textElement = showText;
    this.currentPosition = 0;
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
    btnStyle.backgroundColor = "#444444";
    btnStyle.color = "#EDEDED";
    btnStyle.border = 0;
    btnStyle.borderRadius = "0.3rem";
    btnStyle.cursor = "pointer";
    btnStyle.fontWeight = "bold";

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

      const { updatedText, newCursorPosition } = updateShowText({
        showText: this.textElement.value,
        keyName,
        subKey,
        modifierKeys: this.modifierKeys,
        isModifierKey,
        prevPosition: this.currentPosition,
      });

      this.currentPosition = newCursorPosition;
      this.textElement.value = updatedText;

      this.audioElement.currentTime = 0;
      this.audioElement.src = track;
      this.audioElement.play();

      if (isModifierKey && this.modifierKeys[keyName]) {
        btnStyle.backgroundColor = "#137bee";
      } else {
        btnStyle.backgroundColor = "#444444";
      }

      this.textElement.focus();
      this.textElement.setSelectionRange(
        this.currentPosition,
        this.currentPosition
      );
    });

    this.keyboard.append(button);
  }

  addToKeyBoard(element) {
    this.keyboard.append(element);
  }
}
