import updateText from "./utils/updateText";
export default class Keyboard {
  constructor(showText) {
    this.keyboard = document.createElement("div");
    this.keyboard.id = "app";
    this.audioElement = document.createElement("audio");
    this.isCapsOn = false;
    this.isShiftOn = false;
    this.textElement = showText;
    this.keyboard.append(this.audioElement);
  }

  get getKeyboard() {
    return this.keyboard;
  }

  createKey({ keyName, track, subKey = "" }) {
    const button = document.createElement("button");
    button.textContent = keyName;
    button.className = keyName;
    const btnStyle = button.style;

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
      this.textElement.value = updateText(
        this.textElement.value,
        keyName,
        this.isCapsOn,
        this.isShiftOn
      );
      //   this.audioElement.currentTime = 0;
      //   this.audioElement.src = track;
      //   this.audioElement.play();
    });

    this.keyboard.append(button);
  }

  addToKeyBoard(element) {
    this.keyboard.append(element);
  }
}
