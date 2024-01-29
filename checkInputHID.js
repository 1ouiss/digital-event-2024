const HID = require("node-hid");

// Fonction pour afficher les périphériques de manettes disponibles
function displayConnectedDevices() {
  const devices = HID.devices();

  console.log("Périphériques connectés :");
  const devicePaths = devices.filter((device) =>
    device.manufacturer.includes("DragonRise")
  );
  return devicePaths;
}

// Fonction pour lire l'input d'un bouton sur la manette
function readControllerInput(device) {
  console.log("-----------------------------------------------");
  const newDevice = new HID.HID(device.path);

  const buttonState = {
    button1: null,
    button2: null,
    button3: null,
    button4: null,
    button5: null,
    button6: null,
  };

  console.log("En attente d'input...");

  newDevice.on("data", (data) => {
    // console.log(data);
    const inputArray = Array.from(data);
    // console.log("-----");
    // console.log("inputArray : ", inputArray);
    if (
      (inputArray[5] != buttonState.button1 && buttonState.button1 != null) ||
      (inputArray[5] != buttonState.button2 && buttonState.button2 != null) ||
      (inputArray[5] != buttonState.button3 && buttonState.button3 != null) ||
      (inputArray[5] != buttonState.button4 && buttonState.button4 != null) ||
      (inputArray[6] != buttonState.button5 && buttonState.button5 != null) ||
      (inputArray[6] != buttonState.button6 && buttonState.button6 != null)
    ) {
      // console.log(buttonState);
      // console.log("inputArray : ", inputArray);
      buttonState.button1 = inputArray[5];
      buttonState.button2 = inputArray[5];
      buttonState.button3 = inputArray[5];
      buttonState.button4 = inputArray[5];
      buttonState.button5 = inputArray[6];
      buttonState.button6 = inputArray[6];
      if (inputArray[5] === 31) {
        console.log("CLICK BUTTON 1 joueur 1");
      } else if (inputArray[5] === 47) {
        console.log("CLICK BUTTON 2 joueur 1");
      } else if (inputArray[5] === 79) {
        console.log("CLICK BUTTON 3 joueur 1");
      } else if (inputArray[5] === 143) {
        console.log("CLICK BUTTON 1 joueur 2");
      } else if (inputArray[6] === 1) {
        console.log("CLICK BUTTON 2 joueur 2");
      } else if (inputArray[6] === 2) {
        console.log("CLICK BUTTON 3 joueur 2");
      }
    } else if (
      buttonState.button1 === null ||
      buttonState.button2 === null ||
      buttonState.button3 === null ||
      buttonState.button4 === null ||
      buttonState.button5 === null ||
      buttonState.button6 === null
    ) {
      buttonState.button1 = inputArray[5];
      buttonState.button2 = inputArray[5];
      buttonState.button3 = inputArray[5];
      buttonState.button4 = inputArray[5];
      buttonState.button5 = inputArray[6];
      buttonState.button6 = inputArray[6];
    }
  });

  newDevice.on("error", (error) => {
    console.error("Erreur:", error);
  });
}

// displayConnectedDevices();

// Afficher les périphériques connectés

// Sélectionnez le périphérique de manette en fonction de son chemin (path)
// Remplacez '/path/to/your/controller' par le chemin du périphérique de votre manette
// const selectedDevicePath = "DevSrvsID:4295646678";
// readControllerInput(displayConnectedDevices());

const devicePaths = displayConnectedDevices();
console.log("devicePaths:", devicePaths);

readControllerInput(devicePaths[0]);
readControllerInput(devicePaths[1]);

// devicePaths.forEach((devicePath) => {
//   if (devicePath.path) {
//     readControllerInput(devicePath.path);
//   }
// });
