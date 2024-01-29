const HID = require("node-hid");

// Fonction pour afficher les périphériques de manettes disponibles
function displayConnectedDevices() {
  const devices = HID.devices();

  console.log("Périphériques connectés :");
  devices.forEach((device) => {
    if (device.manufacturer.includes("Apple")) return;

    console.log("-----------------------------------------");
    console.log("Fabricant:", device.manufacturer);
    console.log("Produit:", device.product);
    console.log("Chemin:", device.path);
    console.log("-----------------------------------------");
  });
}

// Fonction pour lire l'input d'un bouton sur la manette
function readControllerInput(devicePath) {
  const device = new HID.HID(devicePath);

  const buttonState = { button1: null };

  console.log("En attente d'input...");

  device.on("data", (data) => {
    // console.log(data);
    const inputArray = Array.from(data);
    // console.log("-----");
    if (inputArray[5] != buttonState.button1 && buttonState.button1 != null) {
      buttonState.button1 = inputArray[5];
      if (inputArray[5] === 31) {
        console.log("CLICK");
      } else {
        console.log("PAS CLICK");
      }
    } else if (buttonState.button1 === null) {
      buttonState.button1 = inputArray[5];
    }

    // data.forEach((buttonState, index) => {
    //   console.log(buttonStates[index]);
    //   console.log(buttonStates);
    //   console.log("-----");
    // if (buttonStates[index] !== buttonState) {
    //   buttonStates[index] = buttonState;
    //   if (buttonState === 5) {
    //     console.log(`Bouton ${index + 1} pressé.`);
    //   }
    // }
    // });
  });

  device.on("error", (error) => {
    console.error("Erreur:", error);
  });
}

// Afficher les périphériques connectés
displayConnectedDevices();

// Sélectionnez le périphérique de manette en fonction de son chemin (path)
// Remplacez '/path/to/your/controller' par le chemin du périphérique de votre manette
const selectedDevicePath = "DevSrvsID:4295131371";
readControllerInput(selectedDevicePath);
