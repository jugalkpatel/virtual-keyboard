export default function updateText(value, keyName, isCapsOn, isShiftOn) {
  console.log({ isCapsOn, isShiftOn });
  switch (keyName) {
    case "Esc":
      return "";
    case "Back":
      const valuesArr = value.split("").slice(0, value.length - 1);
      console.log({ valuesArr });
      const newValue = valuesArr.join("");
      return newValue;
    case "Space":
      return value + " ";
    case "Tab":
      return value + "    ";
    case "Caps":
      return value;
    default:
      break;
  }

  return value + keyName;
}
