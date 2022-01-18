function setCursorPosition(cursorPosition, currentArrLength, flag) {
  if (flag === "DEC") {
    if (cursorPosition <= 0) {
      return (cursorPosition = 0);
    }

    return (cursorPosition -= 1);
  }

  if (flag === "INC") {
    if (cursorPosition >= currentArrLength) {
      return (cursorPosition = cursorPosition);
    }

    return (cursorPosition += 1);
  }

  return cursorPosition;
}

function updateShowText({
  showText,
  keyName,
  subKey,
  modifierKeys,
  isModifierKey,
  prevPosition,
}) {
  const isCapsOn = modifierKeys["Caps"];
  const isShiftOn = modifierKeys["Shift"];
  const showTextArr = showText.split("");
  let newCursorPosition = prevPosition;

  if (isModifierKey) {
    return { updatedText: showText, newCursorPosition };
  }

  switch (keyName) {
    case "Enter":
      showTextArr.splice(newCursorPosition, 0, "\n");
      newCursorPosition = setCursorPosition(
        newCursorPosition,
        showTextArr.length,
        "INC"
      );
      break;
    case "Esc":
      showTextArr.splice(0, showTextArr.length);
      newCursorPosition = 0;
      break;
    case "Back":
      if (newCursorPosition > 0) {
        showTextArr.splice(newCursorPosition - 1, 1);
      }
      newCursorPosition = setCursorPosition(
        newCursorPosition,
        showTextArr.length,
        "DEC"
      );
      break;
    case "Tab":
      for (let i = newCursorPosition; i < prevPosition + 4; i++) {
        showTextArr.splice(newCursorPosition, 0, " ");
        newCursorPosition = setCursorPosition(
          newCursorPosition,
          showTextArr.length,
          "INC"
        );
      }
      break;
    case "Space":
      showTextArr.splice(newCursorPosition, 0, " ");
      newCursorPosition = setCursorPosition(
        newCursorPosition,
        showTextArr.length,
        "INC"
      );
      break;
    case "UP":
      newCursorPosition = 0;
      break;
    case "DOWN":
      newCursorPosition = showTextArr.length;
      break;
    case "LEFT":
      newCursorPosition = setCursorPosition(
        newCursorPosition,
        showTextArr.length,
        "DEC"
      );
      break;
    case "RIGHT":
      newCursorPosition = setCursorPosition(
        newCursorPosition,
        showTextArr.length,
        "INC"
      );
      break;
    default:
      let textValue;

      if (isCapsOn || isShiftOn) {
        if (subKey) {
          textValue = subKey;
        } else {
          textValue = keyName.toUpperCase();
        }
      } else {
        textValue = keyName.toLowerCase();
      }

      showTextArr.splice(newCursorPosition, 0, textValue);

      newCursorPosition = setCursorPosition(
        newCursorPosition,
        showTextArr.length,
        "INC"
      );
  }

  return {
    updatedText: showTextArr.join(""),
    newCursorPosition,
  };
}

function enableModifierKey({ keyName, isModifierKey, modifierKeys }) {
  if (isModifierKey) {
    return { ...modifierKeys, [keyName]: modifierKeys[keyName] ? false : true };
  }

  return modifierKeys;
}

export { updateShowText, enableModifierKey };
