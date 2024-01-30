const HID = require("node-hid");
let levelPlayer1 = 1;
let levelPlayer2 = 1;

let gameArrayPlayer1 = [];
let gameArrayPlayer2 = [];

// [K1, K2, K3]
const possibilityPlayer1 = [31, 47, 79];
// [L1, R1, L2]
const possibilityPlayer2 = [1, 2, 4];

let combinationPlayer1 = [31, 47, 79];
let combinationPlayer2 = [1, 2, 4];

// Fonction pour afficher les périphériques de manettes disponibles
function displayConnectedDevices() {
  const devices = HID.devices();

  console.log("Périphériques connectés :");
  const devicePaths = devices.filter((device) =>
    device.manufacturer.includes("DragonRise")
  );
  return devicePaths;
}
async function showCombination(combinationPlayer, levelPlayer) {
  console.log("Niveau actuel : ", levelPlayer);
  console.log("Combinaison à reproduire : ");
  combinationPlayer.forEach((element, index) => {
    setTimeout(() => {
      console.log(element);
    }, (index + 1) * 1000);
  });
}

function verificationGame(
  gameArrayPlayer,
  combinationPlayer,
  possibilityPlayer,
  levelPlayer
) {
  if (gameArrayPlayer.length <= combinationPlayer.length) {
    for (let i = 0; i < gameArrayPlayer.length; i++) {
      if (gameArrayPlayer[i] != combinationPlayer[i]) {
        gameArrayPlayer.length = 0;
        console.log("ERREUR !");
        showCombination(combinationPlayer, levelPlayer);
        return false;
      } else {
        if (i === combinationPlayer.length - 1) {
          const newPossibility =
            possibilityPlayer[
              Math.floor(Math.random() * possibilityPlayer.length)
            ];
          combinationPlayer.push(newPossibility);
          console.log("BIEN JOUÉ VOUS AVEZ RÉUSSI LA COMBINAISON !");
          showCombination(combinationPlayer, levelPlayer);
          gameArrayPlayer.length = 0;
          return true;
        }
      }
    }
  }
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
      (inputArray[6] != buttonState.button4 && buttonState.button4 != null) ||
      (inputArray[6] != buttonState.button5 && buttonState.button5 != null) ||
      (inputArray[6] != buttonState.button6 && buttonState.button6 != null)
    ) {
      // console.log(buttonState);
      // console.log("inputArray : ", inputArray);
      buttonState.button1 = inputArray[5];
      buttonState.button2 = inputArray[5];
      buttonState.button3 = inputArray[5];
      buttonState.button4 = inputArray[6];
      buttonState.button5 = inputArray[6];
      buttonState.button6 = inputArray[6];
      if (inputArray[5] === 31) {
        gameArrayPlayer1.push(inputArray[5]);
        // console.log("game array player 1 : ", gameArrayPlayer1);
        const game = verificationGame(
          gameArrayPlayer1,
          combinationPlayer1,
          possibilityPlayer1,
          levelPlayer1
        );
        if (game) {
          levelPlayer1 = levelPlayer1 + 1;
        }
        // console.log("CLICK BUTTON 1 joueur 1");
      } else if (inputArray[5] === 47) {
        gameArrayPlayer1.push(inputArray[5]);
        // console.log("game array player 1 : ", gameArrayPlayer1);
        const game = verificationGame(
          gameArrayPlayer1,
          combinationPlayer1,
          possibilityPlayer1,
          levelPlayer1
        );
        if (game) {
          levelPlayer1 = levelPlayer1 + 1;
        }

        // console.log("CLICK BUTTON 2 joueur 1");
      } else if (inputArray[5] === 79) {
        gameArrayPlayer1.push(inputArray[5]);
        // console.log("game array player 1 : ", gameArrayPlayer1);
        const game = verificationGame(
          gameArrayPlayer1,
          combinationPlayer1,
          possibilityPlayer1,
          levelPlayer1
        );
        if (game) {
          levelPlayer1 = levelPlayer1 + 1;
        }

        // console.log("CLICK BUTTON 3 joueur 1");
      } else if (inputArray[6] === 1) {
        gameArrayPlayer2.push(inputArray[6]);
        // console.log("game array player 1 : ", gameArrayPlayer2);
        const game = verificationGame(
          gameArrayPlayer2,
          combinationPlayer2,
          possibilityPlayer2,
          levelPlayer2
        );
        if (game) {
          levelPlayer2 = levelPlayer2 + 1;
        }

        // console.log("CLICK BUTTON 1 joueur 2");
      } else if (inputArray[6] === 2) {
        gameArrayPlayer2.push(inputArray[6]);
        const game = verificationGame(
          gameArrayPlayer2,
          combinationPlayer2,
          possibilityPlayer2,
          levelPlayer2
        );
        if (game) {
          levelPlayer2 = levelPlayer2 + 1;
        }

        // console.log("CLICK BUTTON 2 joueur 2");
      } else if (inputArray[6] === 4) {
        gameArrayPlayer2.push(inputArray[6]);
        const game = verificationGame(
          gameArrayPlayer2,
          combinationPlayer2,
          possibilityPlayer2,
          levelPlayer2
        );
        if (game) {
          levelPlayer2 = levelPlayer2 + 1;
        }

        // console.log("CLICK BUTTON 3 joueur 2");
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

const devicePaths = displayConnectedDevices();
console.log("devicePaths:", devicePaths);

const showAllCobination = async () => {
  console.log("Player 1 : ");
  await showCombination(combinationPlayer1, levelPlayer1);

  console.log("Player 2 : ");
  await showCombination(combinationPlayer2, levelPlayer2);
};

readControllerInput(devicePaths[0]);
readControllerInput(devicePaths[1]);

showAllCobination();
