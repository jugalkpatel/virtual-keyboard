function updateShowText({
  showText,
  keyName,
  subKey,
  modifierKeys,
  isModifierKey,
}) {
  const isCapsOn = modifierKeys["Caps"];
  const isShiftOn = modifierKeys["Shift"];

  if (isModifierKey) {
    return showText;
  }

  switch (keyName) {
    case "Esc":
      return "";
    case "Back":
      const showTextsArr = showText.split("").slice(0, showText.length - 1);
      const newValue = showTextsArr.join("");
      return newValue;
    case "Space":
      return showText + " ";
    case "Tab":
      return showText + "    ";
    default:
      if (isCapsOn || isShiftOn) {
        if (subKey) return showText + subKey;
        return showText + keyName.toUpperCase();
      }

      return showText + keyName.toLowerCase();
  }
}

function enableModifierKey({ keyName, isModifierKey, modifierKeys }) {
  if (isModifierKey) {
    return { ...modifierKeys, [keyName]: modifierKeys[keyName] ? false : true };
  }

  return modifierKeys;
}

export { updateShowText, enableModifierKey };
